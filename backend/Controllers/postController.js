const Post = require("../Model/Post");
const User = require("../Model/User");

// 🔹 Check post limit based on friends
const canPost = async (userId) => {
  const user = await User.findById(userId).populate("friends");
  if (!user) return false;

  let limit = 1;
  const friendCount = user.friends?.length || 0;
  if (friendCount === 2) limit = 2;
  if (friendCount > 10) limit = Infinity;

  const todayPosts = await Post.find({
    userId,
    createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
  });

  return todayPosts.length < limit;
};

// ✅ Create Post
exports.createPost = async (req, res) => {
  try {
    const { firebaseId, caption, mediaUrl } = req.body;

    if (!firebaseId || !caption) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ firebaseId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const allowed = await canPost(user._id);
    if (!allowed) {
      return res.status(400).json({ message: "Post limit reached for today" });
    }

    const post = await Post.create({
      userId: user._id,
      caption,
      mediaUrl,
      likes: [],
      comments: [],
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    console.error("❌ createPost error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .populate("comments.userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error("❌ getPosts error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Like / Unlike Post
exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const index = post.likes.indexOf(userId);
    if (index === -1) post.likes.push(userId); // Like
    else post.likes.splice(index, 1); // Unlike

    await post.save();
    res.status(200).json({ message: "Post updated", likes: post.likes });
  } catch (err) {
    console.error("❌ likePost error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Comment on Post
exports.commentPost = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;
    if (!text) return res.status(400).json({ message: "Comment cannot be empty" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ userId, text, createdAt: new Date() });
    await post.save();

    const updatedPost = await Post.findById(postId)
      .populate("userId", "name")
      .populate("comments.userId", "name");

    res.status(200).json({ message: "Comment added", post: updatedPost });
  } catch (err) {
    console.error("❌ commentPost error:", err);
    res.status(500).json({ message: err.message });
  }
};

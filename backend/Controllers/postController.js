const Post = require("../Model/Post");
const User = require("../Model/User");

// 🔍 Check post limit based on friends
const canPost = async (userId) => {
  const user = await User.findById(userId).populate("friends");
  if (!user) return false; // ✅ Prevent crash if user doesn't exist

  let limit = 1;
  if (user.friends.length === 2) limit = 2;
  if (user.friends.length > 10) limit = Infinity;

  const todayPosts = await Post.find({
    userId,
    createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
  });

  return todayPosts.length < limit;
};

// ✅ Create Post
exports.createPost = async (req, res) => {
  try {
    const { userId, caption, mediaUrl } = req.body;

    if (!userId || !caption) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allowed = await canPost(userId);
    if (!allowed) {
      return res.status(400).json({ message: "Post limit reached for today" });
    }

    const post = await Post.create({ userId, caption, mediaUrl });
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error("❌ Error in createPost:", err.message);
    res.status(500).json({ error: err.message });
  }
};
// ✅ Get all posts (feed)
exports.getPosts = async (req, res) => {
  console.log("🔥 getPosts controller hit");
  try {
    const posts = await Post.find()
      .populate("userId")
      .populate("comments.userId");
    res.json(posts);
  } catch (err) {
    console.error("❌ Error in getPosts:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Like Post
exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    if (!postId || !userId) {
      return res.status(400).json({ message: "Missing postId or userId" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json(post);
  } catch (err) {
    console.error("❌ Error in likePost:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Add Comment
exports.commentPost = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;
    if (!postId || !userId || !text) {
      return res.status(400).json({ message: "Missing comment data" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ userId, text, createdAt: new Date() });
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error("❌ Error in commentPost:", err.message);
    res.status(500).json({ error: err.message });
  }
};

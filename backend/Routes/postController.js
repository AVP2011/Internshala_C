const Post = require("../Model/Post");
const User = require("../Model/User");

// Check post limit based on friends
const canPost = async (userId) => {
  const user = await User.findById(userId).populate("friends");
  let limit = 1;
  if (user.friends.length === 2) limit = 2;
  if (user.friends.length > 10) limit = Infinity;
  const todayPosts = await Post.find({
    userId,
    createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) },
  });
  return todayPosts.length < limit;
};

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { userId, caption, mediaUrl } = req.body;
    if (!(await canPost(userId)))
      return res.status(400).json({ message: "Post limit reached for today" });

    const post = await Post.create({ userId, caption, mediaUrl });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts (feed)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId").populate("comments.userId");
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Like Post
exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) post.likes.push(userId);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Comment
exports.commentPost = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;
    const post = await Post.findById(postId);
    post.comments.push({ userId, text });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

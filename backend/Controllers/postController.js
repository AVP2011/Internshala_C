const Post = require("../Model/Post");
const User = require("../Model/User");

// 🔍 Check post limit based on friends
const canPost = async (userId) => {
  const user = await User.findById(userId).populate("friends");
  if (!user) {
    console.log("⚠️ canPost: user not found");
    return false;
  }

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
    const { userId, caption, mediaUrl } = req.body;
    console.log("📦 Incoming post data:", req.body);

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
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    console.error("❌ Error in createPost:", err.message);
    res.status(500).json({ error: err.message });
  }
};

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
    const { userId: firebaseId, caption, mediaUrl } = req.body;
    console.log("📦 Incoming post data:", req.body);

    if (!firebaseId || !caption) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔹 Find MongoDB user by Firebase UID
    let user = await User.findOne({ firebaseId });

    // 🔹 If user doesn't exist in MongoDB, create it
    if (!user) {
      user = await User.create({
        firebaseId,
        name: "Anonymous", // optional: fetch from Firebase auth if available
      });
    }

    const allowed = await canPost(user._id); // Use MongoDB _id here
    if (!allowed) {
      return res.status(400).json({ message: "Post limit reached for today" });
    }

    const post = await Post.create({
      userId: user._id,
      caption,
      mediaUrl,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    console.error("❌ Error in createPost:", err);
    res.status(500).json({ error: err.message });
  }
};

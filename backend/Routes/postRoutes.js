const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postController");

// ✅ Create a new post
router.post("/create", postController.createPost);

// ✅ Get all posts (feed)
router.get("/", postController.getPosts);

// ✅ Like a post
router.post("/like", postController.likePost);

// ✅ Add a comment
router.post("/comment", postController.commentPost);

router.post("/debug", (req, res) => {
  console.log("🔥 Incoming body:", req.body);
  res.send("Debug route hit");
});


// ✅ Test route for debugging
router.get("/test", (_req, res) => {
  res.send("✅ Test route working");
});

module.exports = router;

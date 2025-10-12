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

// ✅ Test route for debugging
router.get("/test", (req, res) => {
  res.send("✅ Test route working");
});

module.exports = router;

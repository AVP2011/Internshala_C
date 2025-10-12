const express = require("express");
const router = express.Router();
const postController = require("./postController");

// ✅ Create a new post
router.post("/create", postController.createPost);

// ✅ Get all posts (feed)
router.get("/", postController.getPosts); // ✅ simplified and correct

// ✅ Like a post
router.post("/like", postController.likePost);

// ✅ Add a comment
router.post("/comment", postController.commentPost);

module.exports = router;


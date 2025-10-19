const mongoose = require("mongoose");
// const Post = require("../Model/Post");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caption: String,
  mediaUrl: String, // image/video URL (Firebase storage)
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);


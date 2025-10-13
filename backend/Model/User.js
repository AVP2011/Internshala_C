const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseId: { type: String, unique: true }, // store Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String }, // optional: user photo from Firebase
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  language: { type: String, default: "en" },
});

module.exports = mongoose.model("User", userSchema);

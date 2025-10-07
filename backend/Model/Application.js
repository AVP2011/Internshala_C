const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  id: Number, // optional, MongoDB _id exists already
  name: String,
  email: String,
  profilePic: String,
  resume: String,
  jobTitle: String,
  company: String,
  appliedOn: String,
  availability: String,
  reason: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Status: {
    type: String,
    enum: ["Pending", "Rejected", "Confirmed"],
    default: "Pending",
  },
  Application: Object,
});

module.exports = mongoose.model("Application", ApplicationSchema);

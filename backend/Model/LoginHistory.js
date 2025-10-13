const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  browser: String,
  os: String,
  deviceType: String,
  ipAddress: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LoginHistory", loginHistorySchema);

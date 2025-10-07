// Routes/admin.js
const express = require("express");
const router = express.Router();

// Hardcoded admin credentials for now
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin69";

router.post("/adminlogin", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;

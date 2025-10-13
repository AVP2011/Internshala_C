const express = require("express");
const { trackLogin } = require("../Controllers/loginController");
const router = express.Router();

router.post("/track", trackLogin);

module.exports = router;

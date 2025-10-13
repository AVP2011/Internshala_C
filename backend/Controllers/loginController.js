const LoginHistory = require("../Model/LoginHistory");
const useragent = require("user-agent");
const requestIp = require("request-ip");

exports.trackLogin = async (req, res) => {
  try {
    const ua = useragent.parse(req.headers["user-agent"]);
    const ip = requestIp.getClientIp(req);

    const loginRecord = new LoginHistory({
      userId: req.body.userId,
      browser: ua.browser.name,
      os: ua.os.name,
      deviceType: ua.device.type || "desktop",
      ipAddress: ip,
    });

    await loginRecord.save();
    res.status(201).json({ message: "Login tracked", loginRecord });
  } catch (err) {
    console.error("❌ Error tracking login:", err.message);
    res.status(500).json({ error: err.message });
  }
};

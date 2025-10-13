const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const router = require("./Routes/index");
const postRoutes = require("./Routes/postRoutes");

const app = express();
const port = process.env.PORT || 5000;

// ✅ Flexible CORS setup for Vercel + localhost
const allowedOrigins = [
  "http://localhost:3000",
  "https://internshala-c.vercel.app",
  /^https:\/\/internshala-c-[a-z0-9\-]+\.vercel\.app$/,
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌐 Incoming origin:", origin);
    if (
      !origin ||
      allowedOrigins.some((allowed) =>
        typeof allowed === "string" ? allowed === origin : allowed.test(origin)
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
};

// ✅ Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight support

// ✅ Optional fallback for edge cases (use only if needed)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// ✅ Middleware
app.use(express.json({ limit: "50mb" }));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Hello this is InternArea backend 🚀");
});

// ✅ API routes
app.use("/api/posts", postRoutes);
app.use("/api", router);

// ✅ Fallback route for debugging
app.use("*", (req, res) => {
  res.status(404).send("Route not found");
});

// ✅ Connect to database
connect();

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

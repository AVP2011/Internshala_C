const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const router = require("./Routes/index");

const app = express();
const port = 5000;

// ✅ Unified CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://internshala-c-b9st.vercel.app",
  "https://internshala-c-pihq.vercel.app", // your live Vercel domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "50mb" }));

// Default route
app.get("/", (req, res) => {
  res.send("Hello this is InternArea backend 🚀");
});

// API routes
app.use("/api", router);

// Connect to database
connect();

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

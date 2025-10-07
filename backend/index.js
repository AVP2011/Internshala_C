const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const router = require("./Routes/index");

const app = express();
const port = 5000;

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // allow frontend
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

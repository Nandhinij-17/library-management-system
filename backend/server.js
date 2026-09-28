require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/library_management";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Library Management System API",
    status: "running"
  });
});

app.use("/api/books", bookRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
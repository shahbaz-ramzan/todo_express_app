const express = require("express");
const app = express();
const logger = require("./middleware/logger");
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasksRoutes");
const categoryRoutes = require("./routes/category");
// const verifyToken = require("./middleware/authMiddleware");

const cors = require("cors");

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", tasksRoutes);
app.use("/api/v1/category", categoryRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

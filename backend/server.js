const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

// Connect to Database
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ Database Connection Error:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  });

// Load Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes); // Ensure the correct path

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

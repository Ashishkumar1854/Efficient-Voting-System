const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;

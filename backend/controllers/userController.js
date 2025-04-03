// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // User Registration
// exports.registerUser = async (req, res) => {
//   const { name, age, role, email, password } = req.body;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ success: false, message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ name, age, role, email, password: hashedPassword });

//   try {
//     await user.save();
//     res.json({ success: true, message: "✅ User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // User Login
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res
//       .status(400)
//       .json({ success: false, message: "❌ Invalid credentials" });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.json({ success: true, token, user });
// };

// addd voting and result

const User = require("../models/User");
const Vote = require("../models/Vote"); // Ensure this model exists
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.registerUser = async (req, res) => {
  const { name, age, role, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, age, role, email, password: hashedPassword });

  try {
    await user.save();
    res.json({ success: true, message: "✅ User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(400)
      .json({ success: false, message: "❌ Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ success: true, token, user });
};

// Vote Submission (New)
exports.vote = async (req, res) => {
  try {
    const { candidate } = req.body;
    if (!candidate) {
      return res
        .status(400)
        .json({ success: false, message: "Candidate is required" });
    }

    // Check if the user has already voted
    const existingVote = await Vote.findOne({ user: req.user.id });
    if (existingVote) {
      return res
        .status(400)
        .json({ success: false, message: "You have already voted" });
    }

    const newVote = new Vote({ user: req.user.id, candidate });
    await newVote.save();

    res.json({ success: true, message: "✅ Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Voting Results (New)
// Get Voting Results
exports.getResults = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      { $group: { _id: "$candidate", count: { $sum: 1 } } },
      { $sort: { count: -1 } }, // Sorting by highest votes first
    ]);

    const totalVotes = results.reduce(
      (sum, candidate) => sum + candidate.count,
      0
    );

    res.json({
      success: true,
      totalVotes, // Total votes added
      results,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

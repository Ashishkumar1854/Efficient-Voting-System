// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/userController");
// const authMiddleware = require("../middleware/authMiddleware");

// // POST route for user registration
// router.post("/signup", registerUser);

// // POST route for user login
// router.post("/login", loginUser);

// // Protected route: User Profile
// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({
//     success: true,
//     message: "This is your profile",
//     user: req.user, // The authenticated user data should be here
//   });
// });

// module.exports = router;

// add voting,result

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  vote,
  getResults,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// POST route for user registration
router.post("/signup", registerUser);

// POST route for user login
router.post("/login", loginUser);

// Protected route: User Profile
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "This is your profile",
    user: req.user,
  });
});

// Protected route: Voting (New)
router.post("/vote", authMiddleware, vote);

// Protected route: Get Results (New)
router.get("/results", authMiddleware, getResults);

module.exports = router;

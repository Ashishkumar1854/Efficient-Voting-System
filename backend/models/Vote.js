const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    candidate: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
); // Enable timestamps

module.exports = mongoose.model("Vote", voteSchema);

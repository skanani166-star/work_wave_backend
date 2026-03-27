const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobile: String,
  role: {
    type: String,
    enum: ["customer", "worker"],
  },
  skills: [String],
  documents: [String],
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

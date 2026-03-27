
const admin = require("../config/firebase");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    const mobile = decoded.phone_number;
    const { role } = req.body;

    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({
        mobile,
        role,
        isApproved: role === "customer",
      });
    }

    if (user.role === "worker" && !user.isApproved) {
      if (!user.skills || user.skills.length === 0) {
        return res.status(403).json({ message: "Details Missing", user });
      }
      return res.status(403).json({ message: "Approval Pending" });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token: jwtToken, user });
  } catch (err) {
    res.status(401).json({ message: "Invalid Login" });
  }
};

exports.updateWorkerDetails = async (req, res) => {
  try {
    const { skills, documents } = req.body;
    const userId = req.user.id; // From middleware

    const user = await User.findByIdAndUpdate(
      userId,
      { skills, documents },
      { new: true }
    );

    res.json({ message: "Details updated", user });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

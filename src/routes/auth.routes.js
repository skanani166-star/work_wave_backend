const express = require("express");
const router = express.Router();
const { login, updateWorkerDetails } = require("../controllers/auth.controller");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/update-details", protect, updateWorkerDetails);

module.exports = router;

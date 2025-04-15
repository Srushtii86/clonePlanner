const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Save initial survey data
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { studyHours, goals } = req.body;
    console.log("User ID:", req.user.id);
    console.log("Body:", req.body);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Save additional fields if needed
    user.studyHours = studyHours;
    user.goals = Array.isArray(goals)
      ? goals
      : goals.split(",").map((goal) => goal.trim());
    user.firstLogin = false;

    await user.save();

    res.json({
      message: "Survey data saved successfully",
      isSurveyCompleted: true,
      user,
    });

  } catch (error) {
    console.error("Error saving survey data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

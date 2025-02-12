// routes/UserRoute.js
const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { category, userId, name, email, phoneNumber, gender, password, securityQuestion, securityAnswer } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      category,
      userId,
      name,
      email,
      phoneNumber,
      gender,
      password,
      securityQuestion,
      securityAnswer,
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

module.exports = router;
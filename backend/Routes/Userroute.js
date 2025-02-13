// routes/UserRoute.js
import express from "express";
import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { category, resId, labId, name, email, phoneNumber, gender, password, securityQuestion, securityAnswer } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      category,
      userId: category === "Researcher" ? resId : labId, // Map resId/labId to userId
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

// Login user
router.post("/login", async (req, res) => {
  try {
    const { category, resId, labId, password } = req.body;

    // Determine the userId based on the category
    const userId = category === "Researcher" ? resId : labId;

    // Find the user by userId and category
    const user = await User.findOne({ userId, category });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If everything is valid, return a success message
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

export default router;
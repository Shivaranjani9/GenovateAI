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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      category,
      userId: category === "Researcher" ? resId : labId,
      name,
      email,
      phoneNumber,
      gender,
      password: hashedPassword, // Use the hashed password
      securityQuestion,
      securityAnswer,
    });

    console.log("Hashed password during registration:", hashedPassword); //Debuggig

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
    const userId = category === "Researcher" ? resId : labId;

    console.log("Login attempt:", { userId, category }); // Debugging

    const user = await User.findOne({ userId, category });
    if (!user) {
      console.log("User not found"); // Debugging
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Stored hashed password:", user.password); // Debugging
    console.log("Input password:", password); // Debugging

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password"); // Debugging
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Reset password
router.put("/reset-password", async (req, res) => {
  try {
    const { category, userId, secquestion, answer, password } = req.body;

    // Find the user by category and userId
    const user = await User.findOne({ category, userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate security question
    if (user.securityQuestion !== secquestion) {
      return res.status(400).json({ message: "Invalid security question" });
    }

    // Validate security answer by comparing hashes
    const isAnswerValid = await bcrypt.compare(answer, user.securityAnswer);
    if (!isAnswerValid) {
      return res.status(400).json({ message: "Invalid security answer" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Password reset failed", error: error.message });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, { _id: 0, password: 0 }).sort({ userId: 1 }).lean();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
});

export default router;
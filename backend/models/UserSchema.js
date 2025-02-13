import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Researcher or Lab Technician
  userId: { type: String, required: true, unique: true }, // RES123456 or LAB123456
  name: { type: String, required: true }, // Full name of the user
  email: { type: String, required: true, unique: true }, // Unique email address
  phoneNumber: { type: String, required: true }, // User's phone number
  gender: { type: String, required: true }, // Gender (Male, Female, Other)
  password: { type: String, required: true }, // Hashed password
  securityQuestion: { type: String, required: true }, // Security question for password recovery
  securityAnswer: { type: String, required: true }, // Answer to the security question
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it has been modified
  const salt = await bcrypt.genSalt(10); // Generate a salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

export default mongoose.model("User", userSchema);
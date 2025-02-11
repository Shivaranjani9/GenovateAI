import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Basic Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// MongoDB connection
app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`Server started at http://localhost:${process.env.PORT || 5000}`);
});

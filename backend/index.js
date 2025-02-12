const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("../Routes/UserRoute.js");
import { connectDB } from './config/db.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api",userRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// MongoDB connection
app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`Server started at http://localhost:${process.env.PORT || 5000}`);
});

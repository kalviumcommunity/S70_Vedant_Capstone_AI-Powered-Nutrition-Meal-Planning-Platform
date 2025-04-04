// const express = require("express");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// Register User
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     // Create new user
//     user = new User({ name, email, password });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// Login User
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     // Compare password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Generate JWT Token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// module.exports = router;

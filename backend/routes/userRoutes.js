const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const router = express.Router();
var Mongoose = require('mongoose');
require("dotenv").config();

// Registration route
router.post("/register", async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
        });
        
        const user = await newUser.save();
        console.log(firstName)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({token: token });
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
        console.error("Error:", error);
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Create and return JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log(user)
        console.log(token)
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Failed to login" });
        console.error("Error:", error);
    }
});

router.post("/test", async (req, res)=>
{
    try{
        const{token} = req.body;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

        userID =decoded.id;
        
        const user = await User.findById(userID);
        
        res.json({user})

    } catch (error) {
        res.status(500).json({ error: "Failed to test" });
        console.error("Error:", error);
    }
});
// var decoded = jwt.verify(token, 'shhhhh');

module.exports = router;
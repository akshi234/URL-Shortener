const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleSignup(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || password !== confirmPassword) {
      console.log("Condition failed:", {
        name,
        email,
        password,
        confirmPassword,
      });
      return res.status(404).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: "Email is already registered" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });
    const user = await User.findOne({ email });
    const jwtPayload = { userId: user._id };
    const jwttoken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({
      status: "SUCCESS",
      data: "you have signed up successfully",
      jwttoken,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      const passwordMatched = await bcrypt.compare(password, user.password);

      if (passwordMatched) {
        const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        return res.json({
          status: "SUCCESS",
          message: "You have logged in successfully",
          jwttoken,
        });
      } else {
        return res.json({
          status: "FAILED",
          message: "Incorrect email and password. Please try again",
        });
      }
    } else {
      return res.json({
        status: "FAILED",
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    return res.json({
      status: "FAILED",
      message: "An error occurred. Please try again later",
    });
  }
}

module.exports = {
  handleSignup,
  handleLogin,
};

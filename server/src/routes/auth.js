const express = require("express");
const authRouter = express.Router();

const { validateSignUpData, validateLoginData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { isProduction } = require("../config/env");


authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { password, firstName, lastName, email, age } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ firstName, lastName, email, password: passwordHash, age });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req);
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(req.body.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "lax",
      secure: isProduction,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),//it will delete the token from the cookie 
  });
  res.send("Logout Successful!!");
});

module.exports = authRouter;

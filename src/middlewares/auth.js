const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { jwtSecret } = require("../config/env");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { userId } = jwt.verify(token, jwtSecret);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    req.user = user;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Authentication required" });
  }
};

module.exports = {
    userAuth
};

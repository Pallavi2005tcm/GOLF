const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
const User = require("../models/User");
require('dotenv').config();
const volunteerMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not present");
console.log(token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload)
    const { _id } = payload;
    if (!_id) throw new Error("Invalid token");

    const result = await User.findById(_id);
    if (!result) throw new Error("User doesn't exist");
   console.log(result)
    // const isBlocked = await redisClient.exists(`token:${token}`);
    // if (isBlocked) throw new Error("Invalid token");
    console.log(payload.role);
    if (result.role !== "volunteer") throw new Error("Access denied: Not a volunteer");

    // attach user info to request
    req.result = result;
    console.log("Completed")
    next();
  } catch (err) {
    console.error("Volunteer middleware error:", err.message);
    return res.status(403).send("Token invalid, expired, or access denied");
  }
};

module.exports = volunteerMiddleware;

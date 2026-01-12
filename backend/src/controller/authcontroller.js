const redisClient = require("../config/redis");
const User = require("../models/User");
const validate = require('../utils/validators');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: __dirname + '/../../.env' });
const jwt = require('jsonwebtoken');

// ✅ Register function
const register = async (req, res) => {
  try {
    validate(req.body);
    const { name, password, email, address, phone } = req.body;
    let { role } = req.body;
    if (!role) role = "user"; // default role is user

    // Hash password
    req.body.password = await bcrypt.hash(password, 10);

    // Create user in DB
    const u1 = await User.create({ ...req.body, role });

    // Create token
    const token = jwt.sign(
      { _id: u1._id, email: email, role: role },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    const reply = {
      name: u1.name,
      email: u1.email,
      phone: u1.phone,
      address: u1.address,
      _id: u1._id,
      role: role
    };

    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({
      user: reply,
      message: "Registered Successfully"
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// ✅ Get user data

const getuserdata=async(req,res)=>{
  try {
    const user = req.result;
    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await User.findById(user._id);
    if (!result) return res.status(404).json({ message: "User not found" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 }

// ✅ Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Invalid Credentials");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid Credentials");

    const reply = {
      name: user.name,
      email: user.email,
      _id: user._id,
      role: user.role
    };

    const token = jwt.sign(
      { _id: user._id, email: email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({
      user: reply,
      message: "Logged in Successfully"
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// ✅ Logout
const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.decode(token);
    await redisClient.set(`token:${token}`, "Block");
    await redisClient.expireAt(`token:${token}`, payload.exp);
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logged Out Successfully");
  } catch {
    res.status(401).send("Invalid");
  }
};

// ✅ Volunteer Request
const joinVolunteer = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "volunteer") {
      return res.status(400).json({ message: "You are already a volunteer." });
    }

    user.volunteerRequest = true;
    await user.save();

    res.status(200).json({ message: "Volunteer request submitted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin: View Volunteer Requests
const getVolunteerRequests = async (req, res) => {
  try {
     // Fetch all users with pending requests
     const requests = await User.find({ volunteerRequest: true, role: "user" });
     res.json(requests);
   } catch (err) {
     console.error("Fetch volunteer requests error:", err);
     res.status(500).json({ error: "Internal server error" });
   }
};

// ✅ Admin: Approve Volunteer
const approveVolunteer = async (req, res) => {
  try {
    console.log("Called")
    
    console.log(req)
  const { id } = req.params;
      const user = await User.findById(id);
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.role = "volunteer";
      user.volunteerRequest = false;
      await user.save();
  
      res.json({ message: "User approved as volunteer", user });
    } catch (err) {
      console.error("Approve volunteer error:", err);
      res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { 
  register, 
  login, 
  logout, 
  getuserdata,
  joinVolunteer,
  getVolunteerRequests,
  approveVolunteer
};

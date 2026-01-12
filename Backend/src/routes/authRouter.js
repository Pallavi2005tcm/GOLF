const express = require('express');
const authRouter = express.Router();

const userMiddleware = require('../middleware/authMiddleware');
const volunteerMiddleware = require('../middleware/volunteerMiddleware');
const { 
  register, 
  login, 
  logout, 
  getuserdata, 
  joinVolunteer,     // ✅ NEW
  getVolunteerRequests,
  approveVolunteer // ✅ NEW
    // ✅ NEW
} = require('../controller/authcontroller');

// Routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.get('/getuserdata', userMiddleware, getuserdata);

// Volunteer-related
authRouter.post('/join-volunteer', userMiddleware, joinVolunteer); // user requests
authRouter.get('/volunteer-requests', userMiddleware, getVolunteerRequests); // admin only
authRouter.get('/approve-volunteer/:id',approveVolunteer); // admin approves


module.exports = authRouter;

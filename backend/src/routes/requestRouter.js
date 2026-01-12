// const express = require('express');
// const requestRouter = express.Router();
// const volunteerMiddleware = require('../middleware/volunteermiddleware');
// const authMiddleware = require('../middleware/authMiddleware');
// const { createRequest, getAllRequests } = require('../controller/requestcontrol');

// requestRouter.post('/create_request', authMiddleware, createRequest);
// requestRouter.get('/get_request', volunteerMiddleware, getAllRequests);

// module.exports = requestRouter;



const express = require('express');
const requestRouter = express.Router();
const volunteerMiddleware = require('../middleware/volunteerMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// const { createRequest, getAllRequests ,getVolunteers} = require('../controller/requestcontrol');

// requestRouter.post('/create_request', authMiddleware, createRequest);
// requestRouter.get('/get_request', volunteerMiddleware, getAllRequests);




const { completeRequest,createRequest, getAllRequests,acceptRequest,getVolunteers } = require('../controller/requestcontrol');

requestRouter.post('/create_request', authMiddleware, createRequest);
requestRouter.get('/get_request', volunteerMiddleware, getAllRequests);
requestRouter.put("/accept/:id", volunteerMiddleware,acceptRequest);
requestRouter.put("/complete/:id", volunteerMiddleware,completeRequest);
requestRouter.get('/get_volunteer_detail', getVolunteers);
module.exports = requestRouter;


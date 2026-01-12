const Request = require('../models/Request');

const User=require('../models/User');


// ✅ Create a new request

const createRequest = async (req, res) => {
  try {
    const { category, details } = req.body;
    const user = req.result;
    const userId = user._id;

    const newRequest = new Request({ userId, category, details });
    await newRequest.save();

    // Emit nayi request volunteers ko
    const io = req.app.get("io");
    io.emit("new_request", {
      _id: newRequest._id,
      category,
      details,
      userId: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      },
      status: newRequest.status
    });

    res.status(201).json({
      message: "Request created successfully",
      request: newRequest
    });
  } catch (err) {
    console.error("Error creating request:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all requests
const getAllRequests = async (req, res) => {
  try {
    console.log("Get_ALL_Request Hit");
    const requests = await Request.find()
      .populate("userId", "name email phone address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All requests fetched successfully",
      requests
    });
  } catch (err) {
    console.error("Error fetching requests:", err.message);
    res.status(500).json({ error: err.message });
  }
};


const getVolunteers = async (req, res) => {
  try {
    console.log("volunteer called")
    const volunteers = await User.find({ role: "volunteer" });
    console.log("volunteer called 2")
    res.status(200).json(volunteers);

  } catch (err) {
    res.status(500).json({ message: "Error fetching volunteers", error: err });
  }
};

// ✅ Accept a request by volunteer
const acceptRequest = async (req, res) => {
  try {
     // volunteer id frontend se bhejenge
     const user = req.result;
    const volunteerId = user._id;
    const requestId = req.params.id;
console.log(volunteerId)
    const request = await Request.findById(requestId);
    console.log(request);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.status !== "Pending") {
      return res.status(400).json({ message: `Request already ${request.status} `});
    }

    request.status = "Accepted";
    request.volunteerId = volunteerId;
    request.updatedAt = Date.now();

    const updatedRequest = await request.save();

    // Emit updated request to frontend (optional)
    const io = req.app.get("io");
    io.emit("request_updated", updatedRequest);

    res.status(200).json(updatedRequest);
  } catch (err) {
    console.error("Error accepting request:", err.message);
    res.status(500).json({ error: err.message });
  }
};
const completeRequest = async (req, res) => {
  try {
     // volunteer id frontend se bhejenge
     const user = req.result;
    const volunteerId = user._id;
    const requestId = req.params.id;
console.log(volunteerId)
    const request = await Request.findById(requestId);
    console.log(request);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.status !== "Accepted") {
      return res.status(400).json({ message: `Request already ${request.status} `});
    }
console.log("Completed called")
    request.status = "Completed";
    request.volunteerId = volunteerId;
    request.updatedAt = Date.now();

    const updatedRequest = await request.save();

    // Emit updated request to frontend (optional)
    const io = req.app.get("io");
    io.emit("request_updated", updatedRequest);

    res.status(200).json(updatedRequest);
  } catch (err) {
    console.error("Error accepting request:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {createRequest,getAllRequests,getVolunteers,acceptRequest,
  completeRequest};



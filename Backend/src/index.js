// const express = require('express');
// require('dotenv').config({ path: __dirname + '/../.env' });
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const connectDB = require('./config/db');
// const authRouter = require('./routes/authRouter');
// const requestRouter = require('./routes/requestRouter');
// const { getFloodNews } = require("./controller/newsController");
// // const volunteerRouter = require('./routes/volunteer');

// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);

// // ✅ Socket.io with CORS
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     credentials: true
//   }
// });

// // Make io accessible in routes/controllers
// app.set("io", io);

// // ✅ Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("Backend is Working");
// });

// // ✅ API Routes
// app.use('/api/auth', authRouter);
// app.use('/api/request', requestRouter);
// app.get("/api/flood-news", getFloodNews);
// // app.use('/api/volunteer', volunteerRouter); // Volunteer routes

// // ✅ UPDATED: In-memory storage for SOS requests
// let sosRequests = [];

// // ✅ POST route to receive SOS requests
// app.post("/api/sos", (req, res) => {
//   const { userId, location } = req.body;

//   if (!userId || !location) {
//     return res.status(400).json({ success: false, message: "Missing userId or location" });
//   }

//   const sosData = {
//     id: sosRequests.length + 1,
//     userId,
//     location,
//     time: new Date().toISOString()
//   };

//   sosRequests.push(sosData);

//   console.log("🚨 New SOS received:", sosData);

//   // ✅ Emit SOS via Socket.IO to connected clients (optional)
//   io.emit("newSOS", sosData);

//   res.json({ success: true, message: "SOS received", sosData });
// });

// // ✅ GET route to view all SOS requests
// app.get("/sos-panel", (req, res) => {
//   res.json({ success: true, sosRequests });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));


const express = require('express');
require('dotenv').config({ path: __dirname + '/../.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const requestRouter = require('./routes/requestRouter');
const sosRouter = require('./routes/sosRouter');
const { getFloodNews } = require("./controller/newsController");
// const volunteerRouter = require('./routes/volunteer');

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// ✅ Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
});

// Make io accessible in routes/controllers
app.set("io", io);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Connect to MongoDB
connectDB();

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is Working");
});

// ✅ API Routes
app.use('/api/auth', authRouter);
app.use('/api/request', requestRouter);
app.use('/api/sos', sosRouter);
app.get("/api/flood-news", getFloodNews);
// app.use('/api/volunteer', volunteerRouter); // Volunteer routes

// ✅ Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));


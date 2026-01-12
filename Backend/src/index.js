const express = require('express');
require('dotenv').config({ path: __dirname + '/../.env' }); // kept as you had
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
const path = require('path');

const app = express();
const server = http.createServer(app);



// ==========================
// ✅ SOCKET.IO (UNCHANGED LOGIC)
// ==========================
const allowedOrigins = [
  'http://localhost:5173',
  process.env.RENDER_EXTERNAL_URL
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

// Make io accessible in routes/controllers
app.set("io", io);



// ==========================
// ✅ MIDDLEWARE (UNCHANGED)
// ==========================
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));



// ==========================
// ✅ DATABASE (UNCHANGED)
// ==========================
connectDB();



// ==========================
// ✅ SERVE FRONTEND (ADDED)
// ==========================
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));



// ==========================
// ✅ TEST ROUTE (UNCHANGED)
// ==========================
app.get("/", (req, res) => {
  res.send("Backend is Working");
});



// ==========================
// ✅ API ROUTES (UNCHANGED)
// ==========================
app.use('/api/auth', authRouter);
app.use('/api/request', requestRouter);
app.use('/api/sos', sosRouter);
app.get("/api/flood-news", getFloodNews);
// app.use('/api/volunteer', volunteerRouter);



// ==========================
// ✅ REACT ROUTER FALLBACK (ADDED)
// ==========================
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});



// ==========================
// ✅ START SERVER (UNCHANGED)
// ==========================
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

// src/utils/socket.js
import { io } from "socket.io-client";

// ✅ Connect to backend Socket.IO server
const socket = io("https://golf-casj.onrender.com/", {
  withCredentials: true,
});

export default socket;

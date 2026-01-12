// src/utils/socket.js
import { io } from "socket.io-client";

// ✅ Connect to backend Socket.IO server
const socket = io("http://localhost:4000", {
  withCredentials: true,
});

export default socket;

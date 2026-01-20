import { io } from "socket.io-client";

const socket = io("https://golf-casj.onrender.com", {
  withCredentials: true,
});

export default socket;

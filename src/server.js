import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let variableValue = 0;

// Simulate variable change
setInterval(() => {
  variableValue = Math.floor(Math.random() * 10); // 0-9
  if (variableValue > 5) {
    broadcastAlert(variableValue);
  }
}, 3000);

function broadcastAlert(value) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ message: `⚠️ Alert! Variable crossed 5: ${value}` }));
    }
  });
}

wss.on("connection", ws => {
  console.log("User connected");
  ws.send(JSON.stringify({ message: "Connected to alert system" }));
});

server.listen(4000, () => console.log("Server running on port 4000"));

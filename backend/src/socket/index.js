import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketMiddleware } from "../middlewares/socket.middleware.js";
import { getUserConversationForSocketIO } from "../controller/conversation.controller.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});
io.use(socketMiddleware);
const onlineUsers = new Map(); // userId -> socketId

io.on("connection", async (socket) => {
  const user = socket.user;
  console.log(`${user.displayName} online with socket id: ${socket.id}`);
  onlineUsers.set(user._id, socket.id);

  io.emit("onlineUsers", Array.from(onlineUsers.keys()));

  const conversationIds = await getUserConversationForSocketIO(user._id);
  conversationIds.forEach((conversationId) => {
    socket.join(conversationId);
  });
  socket.on("disconnect", () => {
    onlineUsers.delete(user._id);
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    console.log(`${user.displayName} offline with socket id: ${socket.id}`);
  });
});

export { io, app, server };

import {Server} from "socket.io";
import http from "http";
import express from "express";
import { socketMiddleware } from "../middlewares/socket.middleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
});
io.use(socketMiddleware);
io.on("connection", async (socket) => {
    const user = socket.user;
    console.log(`${user.displayName} online with socket id: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`${user.displayName} offline with socket id: ${socket.id}`);
    });
});


export {io, app, server};



import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error"));
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return next(new Error("Authentication error"));
        }

        const user = await User.findById(decoded.userId).select("-hashedPassword");
        if (!user) {
            return next(new Error("Authentication error"));
        }
        socket.user = user;
        next();
    } catch (error) {
        return next(new Error("Authentication error"));
    }
}
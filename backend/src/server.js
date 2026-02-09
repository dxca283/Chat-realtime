import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRouter from "./routes/auth.routes.js";
import { app, server } from "./socket/index.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import { authorize } from "./middlewares/auth.middleware.js";
import cors from "cors";
import express from "express";
import friendRouter from "./routes/friend.routes.js";
import messageRouter from "./routes/message.routes.js";
import conversationRouter from "./routes/conversation.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

//Public routes
app.use("/api/auth", authRouter);

//Private routes
app.use(authorize);
app.use("/api/users", userRouter);
app.use("/api/friends", friendRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversations", conversationRouter);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});

import { Router } from "express";
import { authMe, searchByUsername } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get("/me", authMe);
userRouter.get("/search", searchByUsername);

export default userRouter;

import { Router } from "express";
import { authMe } from "../controller/user.controller.js";

const userRouter = Router();


userRouter.get('/me', authMe);

export default userRouter;
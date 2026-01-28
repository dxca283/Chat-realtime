import { Router } from "express";
import { authMe, test } from "../controller/user.controller.js";

const userRouter = Router();


userRouter.get('/me', authMe);
userRouter.get('/test', test);

export default userRouter;
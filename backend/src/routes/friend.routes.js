import { Router } from "express";
import {
  acceptFriendRequest,
  declineFriendRequest,
  getAllFriends,
  getFriendsRequest,
  sendFriendRequest,
} from "../controller/friend.controller.js";
const friendRouter = Router();

friendRouter.post("/requests", sendFriendRequest);
friendRouter.post("/requests/:requestId/accept", acceptFriendRequest);
friendRouter.post("/requests/:requestId/decline", declineFriendRequest);


friendRouter.get('/', getAllFriends);
friendRouter.get('/requests', getFriendsRequest);

export default friendRouter;
import { Router } from "express";
import { checkFriendShip } from "../middlewares/friend.middleware.js";
import {
  createConversation,
  getConversations,
  getMessages,
  markAsSeen,
} from "../controller/conversation.controller.js";

const conversationRouter = Router();

conversationRouter.post("/", checkFriendShip, createConversation);
conversationRouter.get("/", getConversations);
conversationRouter.get("/:conversationId/messages", getMessages);
conversationRouter.patch("/:conversationId/seen", markAsSeen);

export default conversationRouter;

import {Router} from 'express';
import { sendDirectMessage, sendGroupMessage } from '../controller/message.controller.js';
import {checkFriendShip, checkGroupMembership} from '../middlewares/friend.middleware.js';

const messageRouter = Router();

messageRouter.post('/direct', checkFriendShip , sendDirectMessage);
messageRouter.post('/group', checkGroupMembership, sendGroupMessage);

export default messageRouter;
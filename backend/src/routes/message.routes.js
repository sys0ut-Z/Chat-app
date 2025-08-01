import express from 'express'
import { authUserMiddleware } from '../middlewares/authuser.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controller/message.controller.js';
import { uploadToMulterAndCloudinary } from '../util/MulterUtil.js';

const messageRouter = express.Router();

messageRouter.get("/users", authUserMiddleware, getUsersForSidebar);
messageRouter.get("/:id", authUserMiddleware, getMessages); // it will fetch all the message on right side
messageRouter.post("/send/:id", authUserMiddleware, uploadToMulterAndCloudinary, sendMessage); // this route is to send the message

export default messageRouter;
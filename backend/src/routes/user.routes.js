import express from 'express'
import { registerUser, loginUser, logoutUser, updateProfile, checkUser } from '../controller/user.controller.js';
import { authUserMiddleware } from '../middlewares/authuser.middleware.js';
import { uploadToMulterAndCloudinary } from '../util/MulterUtil.js';

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

// we are updating the profile, so put method
userRouter.post("/update-profile", authUserMiddleware, uploadToMulterAndCloudinary, updateProfile);
userRouter.get("/check", authUserMiddleware, checkUser);

export default userRouter;
import express from 'express';
import * as UserController from '../controllers/user';
import * as authController from "../controllers/auth";

const userRouter = express.Router();

userRouter.post("/auth", authController.authUser);
userRouter.get("/users", authController.checkAuth, UserController.listOfBUsers);



export default userRouter;
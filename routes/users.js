import {Router} from 'express';
import * as UserController from '../controllers/user';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .get('/users', authController.checkAuth, UserController.getUsers)
    .post("/auth", authController.authUser);

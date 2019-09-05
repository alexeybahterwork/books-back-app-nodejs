import {Router} from 'express';
import * as userController from '../controllers/user';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .post('/users/new', userController.createUser)
    .get('/users', authController.checkAuth, userController.getUsers)
    .get('/users/:userId', authController.checkAuth, userController.getUser)
    .put('/users/:userId', authController.checkAuth, userController.updateUser)


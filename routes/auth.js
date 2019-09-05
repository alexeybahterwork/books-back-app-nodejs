import {Router} from 'express';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .post('/auth', authController.authUser)
    .post('/token', authController.getNewAccessToken)
    .post('/logout', authController.logOut);
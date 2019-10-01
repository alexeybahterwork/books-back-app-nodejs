import {Router} from 'express';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .post('/auth', authController.authUser)
    .get('/auth/check', authController.checkAuthWithUserInfo)
    .post('/auth/token', authController.getNewTokens)
    .get('/logout', authController.logOut);
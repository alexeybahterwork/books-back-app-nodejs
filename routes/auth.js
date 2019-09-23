import {Router} from 'express';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .post('/auth', authController.authUser)
    .get('/check-auth', authController.checkAuthWithUserInfo)
    .post('/token', authController.getNewTokens)
    .post('/logout', authController.logOut);
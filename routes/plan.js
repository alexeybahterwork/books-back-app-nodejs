import {Router} from 'express';
import * as planController from '../controllers/plan';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .post('/plans/new', authController.checkAuth, planController.createPlan)
    .get('/plans', authController.checkAuth, planController.getPlans)
    .get('/plans/:planId', authController.checkAuth, planController.getPlan)
    .put('/plans/:planId', authController.checkAuth, planController.updatePlan)
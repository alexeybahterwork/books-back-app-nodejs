import {Router} from 'express';
import * as technologyController from '../controllers/technology';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .post('/technologies/new', technologyController.createTechnology)
    .get('/technologies', technologyController.getTechnologies)
    .get('/technologies/:techId', authController.checkAuth, technologyController.getTechnology)
    .put('/technologies/:techId', authController.checkAuth, technologyController.updateTechnology)
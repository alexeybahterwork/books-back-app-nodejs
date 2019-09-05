import {Router} from 'express';
import * as projectController from '../controllers/project';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .post('/projects/new', authController.checkAuth, projectController.createProject)
    .get('/projects', authController.checkAuth, projectController.getProjects)
    .get('/projects/:projectId', authController.checkAuth, projectController.getProject)
    .put('/projects/:projectId', authController.checkAuth, projectController.updateProject)
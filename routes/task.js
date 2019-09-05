import {Router} from 'express';
import * as taskController from '../controllers/task';
import * as authController from "../controllers/auth";

module.exports = Router({mergeParams: true})
    .post('/tasks/new', authController.checkAuth, taskController.createTask)
    .get('/tasks', authController.checkAuth, taskController.getTasks)
    .get('/tasks/:taskId', authController.checkAuth, taskController.getTask)
    .put('/tasks/:taskId', authController.checkAuth, taskController.updateTask)
import * as Task from "../middlewares/task";
import * as Plan from "../middlewares/plan";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAllTasks();
        return res.status(200).json(tasks);
    } catch(error) {
        return res.status(400).json(error.message);
    }
};

export const getTask = async (req, res) => {
    const {taskId} = req.params;

    try {
        if (!taskId) {
            throw new Error({status: 400, message: 'bookId is empty'})
        }

        const oneTask = await Task.findOneTask(taskId);

        return res.status(200).json(oneTask)
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const createTask = async (req, res) => {
    const params = req.body;
    const {planId, status, spent_time} = req.body;
    // const user_ids = JSON.parse(params.user_ids);

    try {
        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const createdTask = await Task.createTask(params);
        const taskId = createdTask.get().id

        const planAndTaskId = {
            plan_id: planId,
            task_id: taskId
        }

        await Plan.updateOrderPlan(planAndTaskId);

        createdTask.addPlan(planId, { through: {status, spent_time}});

        return res.status(201).json(createdTask)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updateTask = async (req, res) => {
    const {title, description} = req.body;
    const {taskId} = req.params;

    try {
        const params = {
            title,
            description,
        };

        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const updatedTask = await Task.updateTask(taskId, params);
        return res.status(200).json(updatedTask)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const deleteTask = async (req, res) => {
    const {taskId, planId} = req.params;

    try {
        if (!taskId) {
            throw new Error({status: 400, message: 'taskId is empty'})
        }

        const ids = {
            planId,
            taskId
        }

        const deletedTask = await Task.deleteTask(ids.taskId);
        const deletedOrderTasks = await Plan.deleteOrderPlan(ids)

        return res.status(200).json(deletedTask)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

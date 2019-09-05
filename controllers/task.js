import * as Task from "../middlewares/task";

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

        oneTask.getTasks().then(tasks => {
            console.log("tasks", JSON.parse(JSON.stringify(tasks)))
        })


        return res.status(200).json(oneTask)
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const createTask = async (req, res) => {
    const params = req.body;
    const {status, priority, spent_time} = req.body;
    const user_ids = JSON.parse(params.user_ids);

    try {
        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const createdTask = await Task.createTask(params);

        createdTask.addDevelopers(user_ids, { through: {status, priority, spent_time}});
        // createdTask.addTask(task_id, { through: { status: 'in progress' }});

        return res.status(200).json(createdTask)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updateTask = async (req, res) => {
    const {title, images, groups} = req.body;
    const {taskId} = req.params;

    try {
        const params = {
            title,
            images,
            groups,
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

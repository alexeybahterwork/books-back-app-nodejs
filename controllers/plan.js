import * as Plan from "../middlewares/plan";
import * as PlanTasks from "../middlewares/planTasks";
import * as Task from "../middlewares/task";
import moment from "moment";

export const getPlans = async (req, res) => {
    try {
        const tasks = await Plan.findAllPlans();
        return res.status(200).json(tasks);
    } catch(error) {
        return res.status(400).json(error.message);
    }
};

export const getPlan = async (req, res) => {
    const {planId} = req.params;

    try {
        if (!planId) {
            throw new Error({status: 400, message: 'bookId is empty'})
        }

        const onePlan = await Plan.findOnePlan(planId);

        return res.status(200).json(onePlan)
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const createPlan = async (req, res) => {
    const {userId, title, description, taskIds} = req.body;

    const params = {
        user_id: userId,
        title,
        description
    };

    try {
        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const createdPlan = await Plan.createPlan(params);

        return res.status(200).json(createdPlan)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updatePlan = async (req, res) => {
    const params = req.body;
    const {planId} = req.params;

    try {

        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const updatedPlan = await Plan.updatePlan(planId, params);

        return res.status(200).json(updatedPlan)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const changeTaskOfPlan = async (req, res) => {
    const {status, start_time, spent_time} = req.body;
    const {planId, taskId} = req.params;

    try {
        const params = {
            planId,
            taskId,
            status,
            start_time,
            spent_time,
        };

        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const updatedTask = await Plan.updateTaskOfPlan(params);
        return res.status(200).json(updatedTask)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const changeTimeTaskOfPlan = async (req, res) => {
    const {taskId, planId} = req.params;
    const {time} = req.body;

    try {
        if (!taskId && !planId) {
            throw new Error({status: 400, message: 'taskId and planId is empty'})
        }

        let params = {
            planId,
            taskId,
        };

        const oneTask = await Task.findOneTask(taskId);

        const taskInfo = oneTask.get().plan[0].taskInfo;

        switch (taskInfo.status) {
            case 'pending':
                params.status = 'in progress';
                params.start_time = time;
                break;
            case 'in progress':
                params.status = 'done';
                params.spent_time = calculateSpentTime(taskInfo.start_time, time);
                break;
        }

        const updatedPlanTasks = await PlanTasks.updateTaskOfPlan(params);

        return res.status(200).json(updatedPlanTasks)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const calculateSpentTime = (startTime, stopTime) => {
    const stop = new moment(stopTime, 'YYYY-MM-DD');
    const start = new moment(startTime, 'YYYY-MM-DD');
    const duration = moment.duration(stop.diff(start));

    if (duration.asDays() === 0) return 1;

    return duration.asDays();
};

export const deletePlan = async (req, res) => {
    const {planId} = req.params;

    try {
        if (!planId) {
            throw new Error({status: 400, message: 'planId is empty'})
        }

        const deletedPlan = await Plan.deletePlan(planId);

        return res.status(200).json(deletedPlan)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};


import * as Plan from "../middlewares/plan";

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
        // onePlan.getTasks()

        return res.status(200).json(onePlan)
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const createPlan = async (req, res) => {
    const params = req.body;
    const task_ids = JSON.parse(params.task_ids)

    try {
        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const createdPlan = await Plan.createPlan(params);

        createdPlan.addTasks(task_ids, { through: { status: 'started' }});

        return res.status(200).json(createdPlan)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updatePlan = async (req, res) => {
    const {title} = req.body;
    const {planId} = req.params;

    try {
        const params = {
            title
        };

        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const updatedPlan = await Plan.updatePlan(planId, params);

        return res.status(200).json(updatedPlan)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

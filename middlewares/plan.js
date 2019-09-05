import User from "../models/user";
import Plan from "../models/plan";
import Task from "../models/task";

export const findAllPlans = () => {
    return Plan.findAll({
        include: [
            {
                model: User,
                as: 'developers',
                attributes: {
                    exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Task,
                as: 'tasks',
                // as: 'Technologies',
                through: {
                    attributes: []
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
        order: [['id', 'DESC']],
        attributes: ['id', 'title', 'description'],
    })
};

export const findOnePlan = (id) => {
    return Plan.findOne({
        // where: {id},
        include: [
            {
                model: User,
                as: 'developers',
                where: {id},
                attributes: {
                    exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Task,
                where: {status: 'pending'},
                as: 'tasks',
                through: {
                    attributes: []
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
        attributes: ["id", "title", "description"]
    });
};

export const createPlan = (plan) => {
    return Plan.create(
        plan,
        {
            include: [{
                model: User,
                as: 'developers'
            },
                {
                    model: Task,
                    as: 'tasks'
                }],
            returning: true
        }
    );
};


export const updatePlan = async (id, plan) => {
    return Plan.update(
        {
            ...plan
        },
        {
            where: {id},
            include: [{model: Task}],
            returning: true,
        })
};
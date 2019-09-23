import User from "../models/user";
import Task from "../models/task";
import Plan from "../models/plan";

export const findAllTasks = () => {

    return Task.findAll({
        include: [{
            model: User,
            as: 'developers',
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            },
            through: {
                attributes: ['status', 'priority', 'spent_time']
            },
        }],
        order: [['id', 'DESC']],
        attributes: ['id', 'title', 'description'],
    })
};

export const findOneTask = (id) => {
    return Task.findOne({
        where: {id},
        include: [{
            model: User,
            // where: {id},
            as: 'developers',
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            },
            required: false,
            through: {
                attributes: []
            },
        }, {
            model: Plan,
            as: 'plan',
            through: {
                as: 'taskInfo',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'plan_id', 'task_id']
                }
            },
            attributes: ['id', 'title']
        }],
        attributes: ["id", "title", "description"]
    });
};

export const createTask = (task) => {
    return Task.create(
        task,
        {
            include: [{
                model: Plan,
                as: 'plan'
            }],
            returning: true
        }
    );
};


export const updateTask = async (id, task) => {
    return Task.update(
        {
            ...task
        },
        {
            where: {id},
            include: [{model: User}, {model: Plan, as: 'plan'}],
            returning: true,
        }
    )
};

export const deleteTask = async (id) => {
    return Task.destroy(
        {
            where: {id},
            include: [{model: User}],
        }
    )
};
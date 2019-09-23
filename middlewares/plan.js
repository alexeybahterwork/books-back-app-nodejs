// import * as sequelize from 'sequelize'
const sequelize = require('sequelize');

import User from "../models/user";
import Plan from "../models/plan";
import Task from "../models/task";

export const findAllPlans = () => {
    return Plan.findAll({
        include: [{
            model: User,
            as: 'developer',
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            }
        }, {
            model: Task,
            as: 'tasks',
            // as: 'Technologies',
            through: {
                as: 'taskInfo',
                attributes: {
                    exclude: ['plan_id', 'task_id', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
        ],
        order: [['id', 'DESC']],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
};

export const findOnePlan = (id) => {
    return Plan.findOne({
        where: {id},
        include: [{
            model: User,
            as: 'developers',
            // where: {id},
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            }
        }, {
            model: Task,
            as: 'tasks',
            through: {
                as: 'taskInfo',
                attributes: {
                    exclude: ['plan_id', 'task_id', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },

        }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
};

export const createPlan = (plan) => {
    return Plan.create(
        plan,
        {
            include: [{
                model: User,
                as: 'developer'
            }, {
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

export const updateOrderPlan = async (params) => {
    return Plan.update(
        {
            order: sequelize.fn('array_append', sequelize.col('order'), params.task_id)
        },
        {
            where: {id: params.plan_id},
            include: [{model: Task}],
            returning: true,
        })
};

export const deleteOrderPlan = async (ids) => {
    return Plan.update(
        {
            order: sequelize.fn('array_remove', sequelize.col('order'), ids.taskId)
        },
        {
            where: {id: ids.planId},
            include: [{model: Task}],
            returning: true,
        })
};

export const deletePlan = async (id) => {
    return Plan.destroy(
        {
            where: {id},
            include: [
                {model: Task},
                {model: User}
            ],
        }
    )
};
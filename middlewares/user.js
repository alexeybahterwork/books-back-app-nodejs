import * as bcrypt from "bcryptjs";
import User from "../models/user";
import Project from "../models/project";
import Task from "../models/task";

export const findAllUsers = () => {
    return User.findAll({
        include: [
            {
                model: Project,
                as: 'projects',
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: []
                },
            },
            {
                model: Task,
                as: 'tasks',
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: ['status', 'priority', 'spent_time'],
                    as: 'tasks_of_user'
                },
            },
        ],
        attributes: {
            exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
        }
    });
};

export const findOneUser = (id) => {
    return User.findOne({
        where: {id},
        include: [
            {
                model: Project,
                as: 'projects',
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: []
                },
            },
            {
                model: Task,
                as: 'tasks',
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: []
                },
            }
        ],
        attributes: {
            exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
        }
    });
};

export const createUser = async (user) => {
    return User.create(
        {
            ...user,
            encryptedPassword: await hashPassword(user.password),
        },
        {
            include: [{
                model: Project,
                as: 'projects'
            }],
        })
};


export const updateUser = async (id, user) => {
    return User.update(
        {
            ...user
        },
        {
            where: {id},
            returning: true,
        })
};

export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
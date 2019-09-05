import Project from "../models/project";
import User from "../models/user";
import Technology from "../models/technology";

export const findAllProjects = () => {
    return Project.findAll({
        include: [{
            model: User,
            as: 'Developers',
            through: {
                attributes: []
            },
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            }
        },
            {
                model: Technology,
                as: 'Technologies',
                through: {
                    attributes: []
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
        order: [['id', 'DESC']],
        attributes: ["id", "title", "description", "status"]
    });
};

export const findOneProject = (id) => {
    return Project.findOne({
        where: {id},
        include: [{
            model: User,
            as: 'Developers',
            through: {
                attributes: []
            },
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            }
        }],
        attributes: ["id", "title", "description", "status"]
    });
};

export const createProject = async (project) => {
    return Project.create(
        {
            ...project,
        },
        {
            include: [{
                model: User,
                as: 'Developers'
            }],
            returning: true
        })
};

export const updateProject = async (id, project) => {
    return Project.update(
        {
            ...project
        },
        {
            where: {id},
            include: [{model: User}],
            returning: true,
        })
};
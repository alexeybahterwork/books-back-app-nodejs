import Technology from "../models/technology";
import Project from "../models/project";

export const findAllTechnologies = () => {
    return Technology.findAll({
        include: [{
            model: Project,
            through: {
                attributes: []
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }],
        order: [['id', 'DESC']],
        attributes: ["id", "title", "images", "groups"]
    });
};

export const findOneTechnology = (id) => {
    return Technology.findOne({
        where: {id},
        attributes: ["id", "title", "images", "groups"]
    });
};

export const createTechnology = async (technology) => {
    return Technology.create(
        {
            ...technology,
        },
        {
            include: [{
                model: Project,
            }],
            returning: true
        })
};


export const updateTechnology = async (id, technology) => {
    return Technology.update(
        {
            ...technology
        },
        {
            where: {id},
            returning: true,
        })
};
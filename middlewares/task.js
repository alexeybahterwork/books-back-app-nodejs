import User from "../models/user";
import Task from "../models/task";

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
    const model = Task;
    for (let assoc of Object.keys(model.associations)) {
        for (let accessor of Object.keys(model.associations[assoc].accessors)) {
            console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
        }
    }
    return Task.findOne({
        include: [{
            where: {id},
            model: User,
            as: 'developers',
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            },
            through: {
                // where: {id},
                attributes: ['status', 'priority', 'spent_time']
            },
        }],
        attributes: ["id", "title", "description"]
    });
};

export const createTask = (task) => {
    return Task.create(
        task,
        {
            include: [{
                model: User,
                as: 'developers'
            }],
            returning: true
        }
    );
};
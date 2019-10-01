import * as User from '../db/services/user'

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAllUsers();
        return res.status(200).json(users);
    } catch(error) {
        return res.status(400).json(error.message);
    }
};

export const getUser = async (req, res) => {
    const {userId} = req.params;

    try {
        if (!userId) {
            throw new Error({status: 400, message: 'bookId is empty'})
        }

        const oneUser = await User.findOneUser(userId);
        return res.status(200).json(oneUser)
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

export const createUser = async (req, res) => {
    const params = req.body;

    try {
        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const createdUser = await User.createUser(params);
        return res.status(200).json(createdUser)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updateUser = async (req, res) => {
    const {first_name, last_name, day_of_birthday, role, status} = req.body;
    const {userId} = req.params;

    try {
        const params = {
            first_name,
            last_name,
            day_of_birthday,
            role,
            status
        };

        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const updatedUser = await User.updateUser(userId, params);
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

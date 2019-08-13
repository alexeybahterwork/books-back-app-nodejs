import * as User from '../middlewares/user'

export const listOfBUsers = async (req, res) => {
    try {
        const users = await User.findAllUsers();
        return res.status(200).json(users);
    } catch(error) {
        return res.status(400).json(error.message);
    }
};

import * as User from '../middlewares/user'

export const listOfBUsers = (req, res) => {
    return User.findAllUsers()
        .then((rez) => res.status(200).send(rez))
        .catch((error) => res.status(400).send(error.message));
};

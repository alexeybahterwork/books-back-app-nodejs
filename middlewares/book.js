import User from "../models/user";
import Book from "../models/book";

export const findAllBooks = ({page = 1, per_page = 3, sortItem = 'id', sortMethod = 'ASC'}) => {

    return Book.findAndCountAll({
        offset: (page * per_page) - per_page,
        limit: per_page,
        order: [[sortItem, sortMethod]],
        include: [{
            model: User,
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            }
        }],
        attributes: ['id', 'title', 'description', 'price'],
    })
};

export const findOneBook = (id) => {
    return Book.findOne({
        where: {id},
        include: [{
            model: User,
            attributes: {
                exclude: ['encryptedPassword', 'createdAt', 'updatedAt']
            }
        }],
        attributes: ["id", "title", "description", "price"]
    });
};

export const createBook = (book) => {
    return Book.create(
        book,
        {
            include: [{model: User}]
        }
    );
};
import {Model, Sequelize} from "sequelize";
import {postgresUrl} from "../db/config";
import User from './user'

const sequelize = new Sequelize(postgresUrl);

class Book extends Model {
}

Book.init({
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.STRING,
}, {sequelize});

export const findAllBooks = ({page = 1, per_page = 3, sortItem = 'id', sortMethod = 'ASC'}) => {
    return Book.findAndCountAll({
        offset: (page * per_page) - per_page,
        limit: per_page,
        order: [[sortItem, sortMethod]],
        include: [{
            model: User,
            as: 'author',
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
            as: 'author',
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
            include: [{model: User, as: 'author'}]
        }
    );
};

export default Book;
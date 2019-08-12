import {Model, Sequelize} from "sequelize";
import {postgresUrl} from "../db/config";

const sequelize = new Sequelize(postgresUrl);

class Book extends Model {}

Book.init({
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.STRING,
}, {sequelize});

export default Book;
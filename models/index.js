import { Sequelize } from "sequelize";
import { postgresUrl } from "../db/config";
import Book from './book'
import User from './user'
const sequelize = new Sequelize(postgresUrl, {
    dialect: "postgres",
    logging: false,
    define: { underscored: true }
});

export const db = sequelize;

User.hasMany(Book, {as: 'author', foreignKey : 'user_id'});
Book.belongsTo(User, {as: 'author', foreignKey : 'user_id'});
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

User.hasMany(Book, {onDelete: "CASCADE", as: 'author', foreignKey : 'user_id'});
Book.belongsTo(User, {onDelete: "CASCADE", as: 'author', foreignKey : 'user_id'});
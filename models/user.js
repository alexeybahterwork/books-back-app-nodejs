import {DataTypes, Model, Sequelize} from "sequelize";
import * as bcrypt from "bcryptjs";
import { postgresUrl } from "../db/config";
import Book from "./book";

const sequelize = new Sequelize(postgresUrl);

class User extends Model {}

User.init({
    email: { type: new DataTypes.STRING(), allowNull: false },
    encryptedPassword: { type: new DataTypes.STRING(), allowNull: true },
}, {sequelize});
// User.hasMany(Book, {as: 'Author', foreignKey : 'user_id'});
// User.hasMany(Book, {as: 'Author', foreignKey : 'user_id'});

export const findAllUsers = () => {
    return User.findAll({
        attributes: ["email"]
    });
};

export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

export default User;
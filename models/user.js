import {DataTypes, Model, Sequelize} from "sequelize";
import { postgresUrl } from "../db/config";

const sequelize = new Sequelize(postgresUrl);

class User extends Model {}

User.init({
    email: { type: new DataTypes.STRING(), allowNull: false },
    encryptedPassword: { type: new DataTypes.STRING(), allowNull: true },
}, {sequelize});

export default User;
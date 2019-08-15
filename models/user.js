import {DataTypes, Model} from "sequelize";
import Book from './book';

export default class User extends Model {
    static init(sequelize) {
        return super.init({
            email: {type: new DataTypes.STRING(), allowNull: false},
            encryptedPassword: {type: new DataTypes.STRING(), allowNull: true},
        }, {sequelize});
    }

    static associate(models) {
        this.hasMany(Book, {
            onDelete: "CASCADE",
            // as: 'author',
            foreignKey: 'user_id'
        });
    }
};


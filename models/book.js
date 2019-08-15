import {DataTypes, Model} from "sequelize";
import User from './user';

export default class Book extends Model {
    static init(sequelize) {
        return super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.STRING
        }, {
            sequelize,
            hooks: {
                beforeCreate: this.beforeCreate,
                afterCreate: this.afterCreate,
                beforeUpdate: this.beforeUpdate
            }
        });
    }

    static beforeCreate() {
    }

    static afterCreate() {
    }

    static beforeUpdate() {
    }

    static associate() {
        this.belongsTo(User, {
            onDelete: "CASCADE",
            // as: 'author',
            foreignKey: 'user_id'
        });
    }
};

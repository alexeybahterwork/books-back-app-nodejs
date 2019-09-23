import {DataTypes, Model} from "sequelize";
import Book from './book';
import Project from "./project";
import Task from "./task";
import Plan from "./plan";

export default class User extends Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: new DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                },
                unique: {
                    args: true,
                    msg: 'Email address already in use!'
                }
            },
            encryptedPassword: {type: new DataTypes.STRING(), allowNull: false},
            first_name: {type: new DataTypes.STRING(), allowNull: true},
            last_name: {type: new DataTypes.STRING(), allowNull: true},
            day_of_birthday: {type: new DataTypes.DATE(), allowNull: true},
            role: {type: new DataTypes.STRING(), allowNull: false},
            status: {type: new DataTypes.STRING(), allowNull: false},
        }, {
            sequelize
        });
    }

    static associate() {
        this.hasMany(Book, {
            onDelete: "CASCADE",
            as: 'author',
            foreignKey: 'user_id'
        });

        this.hasOne(Plan, {
            onDelete: "CASCADE",
            as: 'plan',
            foreignKey: 'user_id'
        });

        this.belongsToMany(Project, {
            through: 'UserProjects',
            foreignKey: 'user_id',
            as: 'projects'
        });

        this.belongsToMany(Task, {
            through: 'UserTasks',
            foreignKey: 'user_id',
            as: 'tasks'
        });
    }
};


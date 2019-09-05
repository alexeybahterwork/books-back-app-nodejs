import {DataTypes, Model} from "sequelize";
import User from './user';
import Plan from "./plan";

export default class Task extends Model {
    static init(sequelize) {
        return super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
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
        this.belongsToMany(User, {
            through: 'UserTasks',
            onDelete: "CASCADE",
            foreignKey: 'task_id',
            as: 'developers',
            constraints: false
        });

        this.belongsToMany(Plan, {
            through: 'PlanTasks',
            onDelete: "CASCADE",
            foreignKey: 'task_id',
            as: 'tasks',
            constraints: false
        });
    }
};

import {DataTypes, Model} from "sequelize";
import User from './user';
import Task from "./task";

export default class Plan extends Model {
    static init(sequelize) {
        return super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            order: DataTypes.ARRAY(DataTypes.INTEGER)
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
            foreignKey: 'user_id',
            as: 'developer',
        });

        this.belongsToMany(Task, {
            through: 'PlanTasks',
            onDelete: "CASCADE",
            foreignKey: 'plan_id',
            as: 'tasks',
            constraints: false
        });
    }
};

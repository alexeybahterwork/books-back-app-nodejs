import {DataTypes, Model} from "sequelize";
import User from './user';
import Technology from "./technology";

export default class Project extends Model {
    static init(sequelize) {
        return super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            status: DataTypes.STRING,
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
            through: 'UserProjects',
            onDelete: "CASCADE",
            foreignKey: 'project_id',
            as: 'Developers',
            constraints: false
        });

        this.belongsToMany(Technology, {
            through: 'TechnologyProjects',
            onDelete: "CASCADE",
            foreignKey: 'project_id',
        });
    }
};

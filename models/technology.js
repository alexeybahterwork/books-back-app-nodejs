import {DataTypes, Model} from "sequelize";
import Project from "./project";

export default class Technology extends Model {
    static init(sequelize) {
        return super.init({
            title: DataTypes.STRING,
            images: DataTypes.ARRAY(DataTypes.TEXT),
            groups: DataTypes.ARRAY(DataTypes.TEXT)
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
        this.belongsToMany(Project, {
            through: 'TechnologyProjects',
            foreignKey: 'technology_id',
            // as: 'Projects'
        });
    }
};

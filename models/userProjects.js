import {DataTypes, Model} from "sequelize";

export default class UserProjects extends Model {
    static init(sequelize) {
        return super.init({},
            {
            sequelize,
        });
    }
};


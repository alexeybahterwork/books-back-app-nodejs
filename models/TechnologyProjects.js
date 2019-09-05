import {DataTypes, Model} from "sequelize";

export default class TechnologyProjects extends Model {
    static init(sequelize) {
        return super.init({},
            {
            sequelize,
        });
    }
};


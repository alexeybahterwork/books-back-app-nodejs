import {DataTypes, Model} from "sequelize";

export default class PlanTasks extends Model {
    static init(sequelize) {
        return super.init({}, {
            sequelize,
        });
    }
};


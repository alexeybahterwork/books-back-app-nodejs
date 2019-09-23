import {DataTypes, Model} from "sequelize";

export default class PlanTasks extends Model {
    static init(sequelize) {
        return super.init({
            priority: DataTypes.INTEGER,
            status: {
                type: DataTypes.STRING,
                defaultValue: 'pending'
            },
            start_time: DataTypes.STRING,
            spent_time: DataTypes.STRING,
        }, {
            sequelize,
        });
    }
};


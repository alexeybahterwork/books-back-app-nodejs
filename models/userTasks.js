import {DataTypes, Model} from "sequelize";

export default class UserTasks extends Model {
    static init(sequelize) {
        return super.init({
                priority: DataTypes.INTEGER,
                status: DataTypes.STRING,
                spent_time: DataTypes.STRING,
            }, {
                sequelize,
            });
    }
};


import {DataTypes, Model} from "sequelize";

export default class UserTasks extends Model {
    static init(sequelize) {
        return super.init({
            }, {
                sequelize,
            });
    }
};


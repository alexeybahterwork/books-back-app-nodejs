const tableName = "plan_tasks";

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable(tableName, {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            plan_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'plans',
                    key: 'id'
                }
            },
            task_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'tasks',
                    key: 'id'
                }
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.dropTable(tableName);

    }
};
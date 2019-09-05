const tableName = "user_tasks";

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable(tableName, {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
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
            priority: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: DataTypes.STRING,
            },
            spent_time: {
                type: DataTypes.STRING,
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
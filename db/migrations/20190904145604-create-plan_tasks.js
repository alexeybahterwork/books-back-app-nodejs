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
                onDelete: 'CASCADE',
                references: {
                    model: 'plans',
                    key: 'id'
                }
            },
            task_id: {
                type: DataTypes.INTEGER,
                onDelete: 'CASCADE',
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
                defaultValue: 'pending'
            },
            start_time: {
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
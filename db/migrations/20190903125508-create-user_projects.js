const tableName = "user_projects";

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable(tableName, {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            project_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'projects',
                    key: 'id'
                }
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
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
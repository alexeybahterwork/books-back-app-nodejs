const tableName = "technology_projects";

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
            technology_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'technologies',
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
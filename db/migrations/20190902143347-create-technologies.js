const tableName = "technologies";

module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable(tableName, {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.TEXT)
            },
            groups: {
                type: DataTypes.ARRAY(DataTypes.TEXT)
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
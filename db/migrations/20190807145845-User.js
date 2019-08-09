const tableName = "Users";

module.exports = {
    up: (queryInterface, dataTypes) => {
        return queryInterface.createTable(tableName, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: new dataTypes.INTEGER,
            },
            email: {
                type: new dataTypes.STRING,
                allowNull: false,
            },
            encryptedPassword: {
                type: new dataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: new dataTypes.DATE,
            },
            updatedAt: {
                type: new dataTypes.DATE,
            }
        })
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableName);
    }
}
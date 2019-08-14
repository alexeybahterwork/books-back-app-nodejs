const tableName = "users";

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
            encrypted_password: {
                type: new dataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: new dataTypes.DATE,
            },
            updated_at: {
                type: new dataTypes.DATE,
            }
        })
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableName);
    }
}
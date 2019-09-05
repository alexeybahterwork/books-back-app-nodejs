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
                validate: {
                    isEmail:true
                },
                unique: {
                    args: true,
                    msg: 'Email address already in use!'
                }
            },
            first_name: {
                type: new dataTypes.STRING,
                allowNull: true,
            },
            last_name: {
                type: new dataTypes.STRING,
                allowNull: true,
            },
            day_of_birthday: {
                type: new dataTypes.DATE,
                allowNull: true,
            },
            role: {
                type: new dataTypes.STRING,
                allowNull: false,
            },
            status: {
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
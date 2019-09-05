import path from 'path';
import fs from 'fs';
import { Sequelize } from "sequelize";
import { postgresUrl } from "../db/config";

export const sequelize = new Sequelize(postgresUrl, {
    dialect: "postgres",
    logging: false,
    define: { underscored: true }
});

const basename = path.basename(__filename);

const models = Object.assign({}, ...fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    )
    .map(file => {
        const model = require(path.join(__dirname, file));
        const test = {
            [model.default.name]: model.default.init(sequelize),
        }
        return {
            [model.default.name]: model.default.init(sequelize),
        };
    })
);

Object.keys(models).forEach((modelName) => {
    if (typeof models[modelName].associate === 'function') {
        models[modelName].associate(models)
    }
});

export default models;
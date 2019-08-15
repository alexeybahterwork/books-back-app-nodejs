import dotenv from 'dotenv'
import { resolve } from 'path';

let envPath = "/home/fusion/Downloads/books-app-nodejs/.env";

try {
    switch (process.env.NODE_ENV) {
        case "production":
            envPath = resolve('./config/.env.production');
            break;
        case 'test':
            envPath = resolve('./config/.env.test');
            break;
        default:
            break;
    }
} catch (error) {
    console.log(`${error.message} in config/index.js`)
}

export default dotenv.config({path: envPath});

module.exports = {
    [process.env.NODE_ENV || 'development']: {
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRES_PASSWORD,
        "database": process.env.POSTGRES_DB,
        "host": process.env.POSTGRES_HOST,
        "dialect": "postgres"
    }
};

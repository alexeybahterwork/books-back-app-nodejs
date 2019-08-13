import dotenv from 'dotenv'
import { resolve } from 'path';

let envPath = "/home/fusion/Downloads/books-app-nodejs/.env";

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

export default dotenv.config({path: envPath});
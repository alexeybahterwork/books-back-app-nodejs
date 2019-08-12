import '../config'

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const db = process.env.POSTGRES_DB;
const host = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;

export const postgresUrl = `postgres://${user}:${password}@${host}:${dbPort}/${db}`;
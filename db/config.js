import * as config from '../config'

export const postgresUrl = `postgres://${config.username}:${config.password}@${config.host}:${config.port || 5432}/${config.database}`;
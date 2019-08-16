import * as config from '../config'

export const postgresUrl = `postgres://${config.username}:${config.password}@${config.host}:${config.postgres_port}/${config.database}`;
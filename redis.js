import * as redis from 'redis'
const {promisify} = require('util');

const redisClient  = redis.createClient();

redisClient.getAsync = promisify(redisClient.get).bind(redisClient);

redisClient.setHashAsync = promisify(redisClient.hmset).bind(redisClient);
redisClient.getHashAsync = promisify(redisClient.hgetall).bind(redisClient);

export default redisClient;
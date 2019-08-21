import * as redis from 'redis'
const {promisify} = require('util');

const redisClient  = redis.createClient();

redisClient.getAsync = promisify(redisClient.get).bind(redisClient);

redisClient.setHashAsync = promisify(redisClient.hmset).bind(redisClient);
redisClient.getHashAsync = promisify(redisClient.hgetall).bind(redisClient);

// redisClient.hgetall("key", function (err, obj) {

// redisClient.getHashAsync = promisify(redisClient.hget).bind(redisClient);
// hset("hash key", "hashtest 1", "some value", redis.print)
export default redisClient;

// client.on('connect', () => {
//     console.log('Redis client connected');
// });
//
// client.on('error', err => {
//     console.log('Something went wrong ' + err);
// });
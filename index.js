import dotenv from 'dotenv'
import * as config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import helmet from 'helmet'
import "./middlewares/passport";

import routes from './routes'
import redisClient from "./redis";
import * as redis from 'redis'
import * as jwt from "jsonwebtoken";

const app = express();
dotenv.config();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize({}));
app.use(passport.session({}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    next();
});

app.use(routes);
// redisClient.hset("hash key", "hashtest 1", "some value", redis.print);
redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', err => {
    console.log('Something went wrong ' + err);
});
// redisClient.get(`user-${12}`, (error, result) => {
//     if (error) throw error;
//     console.log('GET result -> ' + result);
// });
// redisClient.set('my test key', JSON.stringify({value: 123}), redis.print);
// redisClient.get('my test key', function (error, result) {
//     if (error) throw error;
//     console.log('GET result ->' + result);
// });
// redisClient.hmset("key", ["test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {
//     console.log("err", err);
//     console.log("res", res);
// });
// redisClient.hgetall("key", function (err, obj) {
//     console.log(obj);
// });
// redisClient.hget("hash key", "hashtest 1");
// redisClient.getHashAsync(`refreshTokenUser34`)
//     .then((rez) => {
//         console.log("--- index.js rez ---", rez)
//     });

// const id = 34;
// const refreshToken = jwt.sign({id: id}, config.common.jwt_secret, {expiresIn: "60d"});
// redisClient.hmset(`refreshTokenUser${id}`, `refreshTokenTimestamp${id+1}`, refreshToken, function (err, res) {
//     console.log("err", err);
//     console.log("res", res);
// });
app.listen(config.common.port, () => {
  console.log(`server running on port ${config.common.port}`);
});

import dotenv from 'dotenv'
import * as config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import helmet from 'helmet'
import "./middlewares/passport";

import routes from './routes'
import redisClient from "./redis";

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

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', err => {
    console.log('Something went wrong ' + err);
});

app.listen(config.common.port, () => {
  console.log(`server running on port ${config.common.port}`);
});

import * as config from "../config/index";
import * as jwt from "jsonwebtoken";
import * as _ from 'lodash';
import uuidv4 from 'uuid/v4';
import moment from "moment";

import passport from "passport";
import "../middlewares/passport";
import redisClient from "../redis";

export const authUser = (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({message: 'Something is not right'})
            }

            req.login(user, async error => {
                if (error) return res.status(400).json({message: error});

                const maxLoggedUsers = 5;
                const oneDay = moment().add(config.common.accessTokenExpiresIn,'days').unix();
                const thirtyDays = moment().add(config.common.refreshTokenExpiresIn,'days').unix();
                const refreshTokens = await redisClient.getHashAsync(`refreshTokenUser${user.id}`);
                const countLoggedUsers = refreshTokens ? Object.keys(refreshTokens).length + 1 : 0;

                if (countLoggedUsers > maxLoggedUsers) {
                    redisClient.del(`refreshTokenUser${user.id}`);
                }

                const accessToken = jwt.sign({exp: oneDay, id: user.id}, config.common.jwt_secret);
                const refreshToken = jwt.sign({exp: thirtyDays, id: user.id}, config.common.jwt_refresh_secret);
                const uuid = uuidv4();

                await redisClient.hmset(`refreshTokenUser${user.id}`, `refreshTokenTimestamp-${uuid}`, refreshToken);

                const response = {
                    "status": "Logged in",
                    accessToken,
                    refreshToken,
                    expiresIn: oneDay,
                };

                return res.status(200).json(response);
            });
        })(req, res);
    } catch (error) {
        return res.status(400).json({message: error});
    }
};

export const checkAuth = (req, res, next) => {
    try {
        passport.authenticate("jwt", {session: false}, async (err, user, info) => {
            if (err) throw new Error(err);

            const refreshTokens = await redisClient.getHashAsync(`refreshTokenUser${user.id}`);

            if (!refreshTokens || !user) {
                return res.status(400).json({status: 'Not logged in', message: 'User not authorized'});
            }

            if (info) {
                throw new Error('Error! You have same errors.');
            } else {
                next();
            }
        })(req, res, next);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const logOut = async (req, res, next) => {
    try {
        const {token: tokenReq} = req.body;
        if (!tokenReq) throw new Error('refreshToken is empty or invalid field');

        const jwtPayload = jwt.verify(tokenReq, config.common.jwt_secret);

        redisClient.del(`refreshTokenUser${jwtPayload.id}`);
        const refreshTokens = await redisClient.getHashAsync(`refreshTokenUser${jwtPayload.id}`);

        if (!refreshTokens) {
            const response = {messages: 'The user has logged off.'};

            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const getNewAccessToken = async (req, res, next) => {
    const {refreshToken: refreshTokenReq} = req.body;

    try {
        if (!refreshTokenReq) throw new Error('refreshToken is empty or invalid field');

        const jwtPayload = jwt.verify(refreshTokenReq, config.common.jwt_refresh_secret);
        const refreshTokens = await redisClient.getHashAsync(`refreshTokenUser${jwtPayload.id}`);

        if (!refreshTokens) throw new Error('User not authorized.');

        const oneDay = moment().add(config.common.accessTokenExpiresIn,'days').unix();
        const thirtyDays = moment().add(config.common.refreshTokenExpiresIn,'days').unix();
        let response = {};

        for (let tokenTimeStampName in refreshTokens) {
            if (refreshTokenReq === refreshTokens[tokenTimeStampName]) {
                const accessToken = jwt.sign({exp: oneDay, id: jwtPayload.id}, config.common.jwt_secret);
                const refreshToken = jwt.sign({exp: thirtyDays, id: jwtPayload.id}, config.common.jwt_refresh_secret);

                redisClient.hmset(`refreshTokenUser${jwtPayload.id}`, tokenTimeStampName, refreshToken);

                response = {
                    accessToken,
                    refreshToken,
                    expiresIn: oneDay,
                };

                return res.status(200).json(response);
            }
        }

        if (_.isEmpty(response)) {
            return res.status(401).json({messageNewToken: "This token is old or invalid."});
        }
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};
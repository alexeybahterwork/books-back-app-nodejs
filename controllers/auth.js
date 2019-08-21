import * as config from "../config/index";
import * as jwt from "jsonwebtoken";
import * as _ from 'lodash';
import uuidv4 from 'uuid/v4';

import passport from "passport";
import "../middlewares/passport";
import redisClient from "../redis";

export const authUser = (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({message: 'Something is not right'})
            }

            console.log("authUser user ", user);
            req.login(user, async error => {
                if (error) return res.status(400).json({message: error})

                const refreshTokens = await redisClient.getHashAsync(`refreshTokenUser${user.id}`);
                const accessToken = jwt.sign({id: user.id}, config.common.jwt_secret, {expiresIn: "1d"});
                const maxLoggedUsers = 5;
                const countLoggedUsers = refreshTokens ? Object.keys(refreshTokens).length : 5;

                if (countLoggedUsers < maxLoggedUsers) {
                    const refreshToken = jwt.sign({id: user.id}, config.common.jwt_refresh_secret, {expiresIn: config.common.refreshTokenExpiresIn});
                    const uuid = uuidv4();

                    await redisClient.hmset(`refreshTokenUser${user.id}`, `refreshTokenTimestamp-${uuid}`, refreshToken);

                    const refreshTokens = await redisClient.getHashAsync(`refreshTokenUser${user.id}`);
                    const response = {
                        "status": "Logged in",
                        "token": accessToken,
                        refreshTokens,
                    };

                    console.log("if response", response);

                    return res.status(200).json(response);
                } else {

                    redisClient.del(`refreshTokenUser${user.id}`);

                    const uuid = uuidv4();
                    const refreshToken = jwt.sign({id: user.id}, config.common.jwt_refresh_secret, {expiresIn: config.common.refreshTokenExpiresIn});

                    redisClient.hmset(`refreshTokenUser${user.id}`, `refreshTokenTimestamp-${uuid}`, refreshToken);

                    const refreshTokens = await redisClient.getHashAsync(`refreshTokenUser${user.id}`);
                    const response = {
                        "status": "Logged in",
                        "token": accessToken,
                        refreshTokens,
                    };
                    console.log("else response", response)
                    return res.status(200).json(response);
                }
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
            if (!user) {
                throw new Error('User is missing');
            }
            const refreshTokens = await redisClient.getHashAsync(`refreshTokenUser${user.id}`);

            if (!refreshTokens) {
                return res.status(400).json({status: 'Not logged in', message: 'User not authorized'});
            }

            if (info) {
                throw new Error('Error! You have same info.');
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

        if (!refreshTokens) throw new Error('User not authorized.')

        let response = {};

        console.log("userParsed", jwtPayload);
        console.log("---refreshToken Keys---", Object.keys(refreshTokens));
        console.log("---refreshTokenReq", refreshTokenReq);

        for (let tokenTimeStampName in refreshTokens) {
            console.log("---refreshTokens[timestampName]", tokenTimeStampName, refreshTokens[tokenTimeStampName]);

            if (refreshTokenReq === refreshTokens[tokenTimeStampName]) {
                const accessToken = jwt.sign({id: jwtPayload.id}, config.common.jwt_secret, {expiresIn: config.common.accessTokenExpiresIn});
                const refreshToken = jwt.sign({id: jwtPayload.id}, config.common.jwt_refresh_secret, {expiresIn: config.common.refreshTokenExpiresIn});
                const timeStamp = {"timeStamp": tokenTimeStampName};

                redisClient.hmset(`refreshTokenUser${jwtPayload.id}`, tokenTimeStampName, refreshToken);

                response = {
                    timeStamp,
                    accessToken,
                    refreshToken,
                    expiresIn: jwtPayload.exp,
                };

                console.log("---response---", response)
                return res.status(200).json(response);
            }
        }

        if (_.isEmpty(response)) {
            return res.status(401).json({messageNewToken: "This token is old or invalid."});
        }
    } catch (error) {
        console.log("error", error)
        return res.status(400).json({message: error.message});
    }
};
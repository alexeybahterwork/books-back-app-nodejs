import * as config from "../config/index";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../middlewares/passport";

export const authUser = (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({message: 'Something is not right'})
            }

            req.login(user, (error) => {
                if (error) {
                    return res.status(400).json({message: error})
                }
                const token = jwt.sign({id: user.id}, config.jwt_secret, {expiresIn: "1d"});
                return res.status(200).json({user, token});
            });
        })(req, res);
    } catch (error) {
        return res.status(400).json({message: error});
    }
};

export const checkAuth = (req, res, next) => {
    try {
        passport.authenticate("jwt", {session: false}, (err, user, info) => {
            if (err) {
                console.error(err);
            }
            if (info) {
                res.status(400).json({message: info.message});
            } else {
                next();
            }
        })(req, res, next);
    } catch(error) {
        return res.status(400).json({message: error.message});
    }
};
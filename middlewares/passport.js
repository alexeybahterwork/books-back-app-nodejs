import * as config from '../config'
import * as bcrypt from "bcryptjs";
import passport from "passport";
import models from "../models";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as JWTStrategy, ExtractJwt} from "passport-jwt";

passport.use("local", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    }, async (email, password, done) => {
        const user = await models.User.findOne({
            where: {email},
            attributes: ["id", "encryptedPassword"],
            raw: true,
        });
        if (!user) {
            return done(null, false, {message: "User doesnt exist"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.encryptedPassword);
        if (!isPasswordCorrect) {
            return done(null, false, {message: "Password is incorrect"});
        }
        return done(null, user);
    }
));

passport.use("jwt", new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.common.jwt_secret
}, (jwtPayload, done) => {
    try {
        console.log("jwtPayload", jwtPayload)
        models.User.findOne({
            where: {
                id: jwtPayload.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "encryptedPassword"]
            },

        }).then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    } catch (err) {
        console.error(`${err} in passport.js`);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = models.User.findOne({
        where: {id},
        raw: true,
    });
    user ? done(null, user) : done(null);
    models.User.findOne({where: {id}})
        .then(desUser => {
            done(null, desUser);
        })
        .catch(done);
});

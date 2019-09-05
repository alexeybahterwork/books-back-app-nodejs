import models from "../../models";
import { hashPassword } from "../../middlewares/user";
import * as jwt from "jsonwebtoken";
import * as config from "../../config";
import redisClient from '../../redis'


Promise.resolve()
    .then(async () => {
        const user = {
            email: "test_example_02@example.com",
            first_name: "Alexey",
            last_name: "Bakhter",
            day_of_birthday: new Date(),
            role: "developer",
            status: "active",
            password: "123456"
        };
        const existingUser = await models.User.findOne({ where: { email: user.email }});

        if (existingUser) {
            console.info("user already exist", existingUser.toJSON());
        } else {
             const newUser = await models.User.create({
                ...user,
                encryptedPassword: await hashPassword(user.password),
            });

            const userParse = JSON.parse(JSON.stringify(newUser));

            const refreshToken = jwt.sign({id: userParse.id}, config.common.jwt_secret, {expiresIn: "60d"});

            console.log("user-${userParse.id}", `user-${userParse.id}`);

            redisClient.hmset(`refreshTokenUser${userParse.id}`, `refreshTokenTimestamp-${userParse.id}`, refreshToken, function (err, res) {
                console.log("err", err);
                console.log("res", res);
            });
            console.info("user has been created", user);
        }
    })
    .then(() => {
        process.exit();
    })
    .catch((err) => {
        console.error("ERROR", err);
        // process.exit(1);
    });

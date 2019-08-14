import models from "../../models";
import { hashPassword } from "../../middlewares/user";
// import * as seeds from "./seeds/user";

Promise.resolve()
    .then(async () => {
        const user = {email: "example2@example.com", password: "123456"};
        const existingUser = await models.User.findOne({ where: { email: user.email }});

        if (existingUser) {
            console.info("user already exist", existingUser.toJSON());
        } else {
            await models.User.create({
                ...user,
                encryptedPassword: await hashPassword(user.password),
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

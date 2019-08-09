import User from "../../models/user";
import { hashPassword } from "../../models/user";
// import * as seeds from "./seeds/user";

Promise.resolve()
    .then(async () => {
        const user = {email: "example@example.com", password: "123456"};
        const existingUser = await User.findOne({ where: { email: user.email }});
        if (existingUser) {
            console.info("user already exist", existingUser.toJSON());
        } else {
            await User.create({
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
        console.error("errerrerrerrerrerrerr", err);
        process.exit(1);
    });

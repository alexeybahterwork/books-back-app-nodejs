import * as bcrypt from "bcryptjs";
import User from "../models/user";

export const findAllUsers = () => {
    return User.findAll({
        attributes: ["email"]
    });
};

export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
import { Request, Response } from "express";
import User, { UserProps } from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import { comparePasswords, encryptPassword } from "../services/encryption.service";
import config from "../config";

export const signup = async (req: Request, res: Response) => {
    // code to sign up an user

    // 1. Validate input variables
    // 2. Save the data
    // 3. Login the user and return a token

    const { name, email, password, roles } = req.body;
    if (!name && !email && !password) {
        res.status(403).send('Sign up request parameters missing');
        return;
    }

    try {
        const users = await User.find({ email });
        if (users.length === 0) {
            // save the data
            const newUser: UserProps = new User({
                name: {
                    first: name.first,
                    last: name.last
                },

                email,
                password: await encryptPassword(password)
            });

            if (roles) {
                const rolesResult = await Role.find({ name: { $in: roles } });
                newUser.roles = rolesResult.map(role => role._id);
            } else {
                const role = await Role.findOne({ name: 'user' });
                newUser.roles = [role?._id];
            }

            const saveResult = await newUser.save();
            const token = jwt.sign({ id: saveResult._id }, config.WORD, {
                expiresIn: 24 * 60 * 60
            });

            res.send({ message: 'OK', token, ...saveResult });
        } else {
            res.status(400).send({ message: `The user with email ${email} already exists.` });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const loginById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { password } = req.body;
    try {
        const userResult = await User.findById(userId);
        if (!userResult) return res.status(404).send({ authenticated: false, message: "The user doesn't exists." });

        const isPasswordValid = comparePasswords(password, userResult.password);
        if (!isPasswordValid) return res.status(401).send({ message: "Invalid password" });

        const token = jwt.sign({ id: userResult._id }, config.WORD, { expiresIn: 24 * 60 * 60 });
        res.send({ token, message: "OK", id: userResult._id });

    } catch (error) {
        return res.status(500).send(error);
    }
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const userResult = await User.findOne({ email });
        if (!userResult) return res.status(404).send({ message: `The user with email:${email} doesn't exists.` });

        const isPasswordValid = comparePasswords(password, userResult.password);
        if (!isPasswordValid) res.send({ message: 'Invalid password' });

        const token = jwt.sign({ id: userResult._id }, config.WORD, { expiresIn: 24 * 60 * 60 });
        res.send({ token, message: 'OK', id: userResult._id });

    } catch (error) {
        res.status(500).send(error);
    }
}
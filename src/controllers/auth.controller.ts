import { Request, Response } from "express";
import User from '../models/User';
import Role, { RoleProps } from '../models/Role';
import jwt from 'jsonwebtoken';
import { comparePasswords, encryptPassword } from "../services/encryption.service";

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
            const newUser = new User({
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
            const token = jwt.sign({ id: saveResult._id }, 'theSecretWord', {
                expiresIn: 24 * 60 * 60
            });

            res.send({ authenticated: true, message: 'OK', token });
        } else {
            res.send({ authenticated: false, message: `The user with email:${email} already exists.` });
        }
    } catch (error) {
        res.sendStatus(500);
    }
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const userResult = await User.findOne({ email });
        if (!userResult) {
            res.send({ authenticated: false, message: `The user with email:${email} doesn't exists.` });
        } else {
            const isPasswordValid = comparePasswords(password, userResult.password);
            if (isPasswordValid) {
                const token = jwt.sign({ id: userResult._id }, 'theSecretWord', {
                    expiresIn: 24 * 60 * 60
                });
                res.send({ authenticated: true, token, message: 'OK', });
            } else {
                res.send({ authenticated: false, message: 'Invalid password' });
            }
        }
    } catch (error) {
        res.sendStatus(500);
    }
}
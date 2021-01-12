/**
 * AUTHENTICATION ROUTE
 * POST auth/signup
 * POST auth/login
 * 
 * Response format when all it's OK: 
 * {
 *      _id: ObjectId;
 *      name: {
 *          first: string;
 *          last: string;
 *      };
 *      email: string;
 *      token: string;
 * } 
 * 
 * in other case:
 * {
 *      message: (Description about the problem)
 * }
 * 
 */

import { Request, Response } from "express";
import User, { UserProps } from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import { comparePasswords, encryptPassword } from "../services/encryption.service";
import config from "../config";

interface AuthResponse {
    account: {
        id: string;
        email: string;
        name: {
            first: string;
            last: string;
        },
        token: string;
    } | null,

    message: any;
}

export const signup = async (req: Request, res: Response) => {
    const response: AuthResponse = { message: "", account: null };

    // code to sign up an user

    // 1. Validate input variables
    // 2. Save the data
    // 3. Login the user and return a token

    console.log(req.body);
    const { name, email, password, roles } = req.body;
    // 1. Validating data
    if (!name && !email && !password) {
        response["message"] = 'Sign up request parameters missing';
        return res.status(403).send(response);
    }

    try {
        const users = await User.find({ email });
        if (users.length !== 0) {
            response["message"] = `The user with email ${email} already exists.`;
            return res.status(400).send(response);
        }

        // 2. Save the data
        const newUser: UserProps = new User({
            name: {
                first: name.first,
                last: name.last
            },

            email,
            password: await encryptPassword(password)
        });

        // assign the given roles or by default assign the user role
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

        response["account"] = { token, name, email, id: saveResult._id };
        response["message"] = "OK";

        return res.send(response);
    } catch (error) {
        response["message"] = error;
        return res.status(500).send(response);
    }
}

export const login = async (req: Request, res: Response) => {
    const response: AuthResponse = { message: "", account: null };
    const { email, password } = req.body;
    try {
        const userResult = await User.findOne({ email });
        if (!userResult) {
            response["message"] = "User doesn't exists. Try to create an account.";
            console.log(`[SERVER -> ${req.headers.host}]: ${response.message}`);
            return res.status(404).send(response);
        }

        const isPasswordValid = await comparePasswords(password, userResult.password);
        if (!isPasswordValid) {
            response["message"] = 'User data is invalid';
            console.log(`[SERVER -> ${req.headers.host}]: ${response.message}`);
            return res.status(422).send(response);
        }

        const token = jwt.sign({ id: userResult._id }, config.WORD, { expiresIn: 24 * 60 * 60 });
        response["message"] = "OK";
        response["account"] = { token, name: userResult.name, email, id: userResult._id }
        console.log(`[SERVER -> ${req.headers.host}]: ${response.message}`);
        return res.send(response);
    } catch (error) {
        response["message"] = error;
        return res.status(500).send(response);
    }
};
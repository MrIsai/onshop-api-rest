import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';
import config from "../config";

interface PayLoad {
    id: string;
    iat: number;
    exp: number;
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ message: 'Token missing' });
    try {
        const decoded = jwt.verify(token.toString(), config.WORD) as PayLoad;
        const userResult = await User.findById(decoded.id);
        if (!userResult) return res.status(403).send({ message: "The user doesn't exist" });

        req.userId = decoded.id;

    } catch (error) {
        return res.sendStatus(401);
    }

    next();
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ message: 'Token missing' });
    const decoded = jwt.verify(token.toString(), config.WORD);
    if (req.params.userId === (<any>decoded).id) return next();

    const user = await User.findById((<any>decoded).id);
    if (user) {
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') return next();
        }

        return res.status(403).send({ message: "You don't have permissions to access here and get a response." });
    }

    return res.status(401).send({ message: "The user doesn't exist." });
}
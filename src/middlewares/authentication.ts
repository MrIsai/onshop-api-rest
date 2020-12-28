import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ message: 'Token missing' });
    try {
        const decoded = jwt.verify(token.toString(), 'theSecretWord');
        const userResult = await User.findById((<any>decoded).id);
        if (!userResult) return res.status(403).send({ message: "The user doesn't exist" });
    } catch (error) {
        return res.sendStatus(401);
    }

    next();
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ message: 'Token missing' });
    const decoded = jwt.verify(token.toString(), 'theSecretWord');
    const user = await User.findById((<any>decoded).id);
    if(user){
        const roles = await Role.find({ _id: { $in: user.roles } });
        for(let i = 0; i < roles.length; i++){
            if(roles[i].name === 'admin') return next();
        }

        return res.status(403).send({message: "You don't have permissions to access here."});
    }

    return res.status(401).send({message: "The user doesn't exist."});
}
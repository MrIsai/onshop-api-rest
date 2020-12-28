import { Request, Response } from "express"
import User from '../models/User';

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) return res.send(user);
        else return res.status(400).send({ message: `Doesn't exist the id:${userId}` });
    } catch (error) {
        return res.sendStatus(500);
    }
}

export const updateUserById = () => {

}

export const deleteUserById = () => {

}
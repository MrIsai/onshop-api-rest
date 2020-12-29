import { Request, Response } from "express"
import User from '../models/User';

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = (await User.findById(userId));
        if (user) {
            return res.send({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        }
        else return res.status(400).send({ message: `Doesn't exist the id:${userId}` });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const updateUserById = async (req: Request, res: Response) => {
    const { name } = req.body;
    const { userId } = req.params;
    if (!userId) return res.status(400).send({ message: "User id missing" });
    if (!name) return res.status(400).send({ message: "Field names missing" });

    try {
        await User.updateOne({ _id: userId }, {
            $set: {
                name: {
                    first: name.first,
                    last: name.last
                }
            },

            $currentDate: { lastModified: true }
        });

        return res.send({ message: "OK" });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).send({ message: "Parameters missing" });

    try {
        const deleteResult = await User.deleteOne({ _id: userId });
        return res.send({ message: "OK", ...deleteResult });
    } catch (error) {
        return res.status(500).send(error);
    }
}
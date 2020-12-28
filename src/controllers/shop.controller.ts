import { Request, Response } from "express";
import Shop from '../models/Shop';

export const getShops = async (req: Request, res: Response) => {
    try {
        const shops = await Shop.find({});
        return res.send(shops);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export const createShop = async (req: Request, res: Response) => {
    const { id, name, description, logo, portrait } = req.body;
    if (!id && !name) return res.status(400).send({ message: 'Parameters missing' });
    try {
        const shopCreated = new Shop({
            _id: id,
            name,
            description,
            validated: false
        });

        const saveResult = await shopCreated.save();
        return res.send(saveResult);
    } catch (error) {
        return res.sendStatus(500);
    }
}
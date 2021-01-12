import { Request, Response } from "express";
import Shop from '../models/Shop';
import User from '../models/User';
import cloudinary from 'cloudinary';

export const getShops = async (req: Request, res: Response) => {
    try {
        const shops = await Shop.find({});
        return res.send(shops);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export const getShopById = async (req: Request, res: Response) => {
    const { shopId } = req.query;

    try {
        const shop = await Shop.findById(shopId);
        if(!shop) return res.status(404).send({ message: "Not Found", shop: null });

        return res.send({message: "OK", shop});
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

export const getShopsByPublicName = async (req: Request, res: Response) => {
    const { name } = req.query;
}

export const createShop = async (req: Request, res: Response) => {
    const { shopid, name, description } = req.body;
    if (!shopid && !name) return res.status(400).send({ message: 'Parameters missing' });
    try {
        const shopData = new Shop({
            _id: shopid,
            name,
            description,
            validated: false,
            boss: req.userId
        });

        const shop = await shopData.save();
        return res.send(shop);
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}

export const setShopBrandLogo = async (req: Request, res: Response) => {
    const { brandlogo } = req.body;
    const { shopId } = req.params;
    try {
        const result = await cloudinary.v2.uploader.upload(brandlogo, {
            resource_type: "image",
            public_id: `shops/${shopId}/brand_logo`,
            overwrite: true
        });

        console.log('resultado de guardar el logo de la tienda:', result);
        if (!result) return res.status(400).send({ message: result });
        return res.send({ message: "OK" });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

export const setShopTheme = async (req: Request, res: Response) => {

}

export const updateShopById = async (req: Request, res: Response) => {
    const { shopId } = req.params;
    const { name, description, logo, portrait } = req.body;

    if (!shopId) return res.status(400).send({ message: "Shop id missing" });
}
// *************************
// ONSHOP PROJECT
// Author: Isai Pashel
// File: user.controller.ts
// *************************
// DESCRIPTION: 
// This file contains middleware functions to create and modify user data
// through user id gived when the user is login or signup.

import { Request, Response } from "express"
import User from '../models/User';
import cloudinary from 'cloudinary';

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

export const updateAccountPhotoById = async (req: Request, res: Response) => {
    // the photo must be in base 64 format
    const { photo } = req.body;
    const { userId } = req.params;

    //if (!photo) return res.status(400).send({ message: "Photo missing" });
    if (!userId) return res.status(400).send({ message: "User id missing" });

    try {
        const user = User.findOne({ _id: userId });
        if (!user) return res.status(404).send({ message: "User Not Found" });

        console.log('updating account photo');

        cloudinary.v2.uploader.upload(photo, {
            resource_type: "image",
            public_id: "users/isai_id/account_photo",
            overwrite: true
        }, (error, result) => {
            console.log(result, error);
            if (!error) res.send({ message: "OK" })
            else res.send({ message: "No se guardo" });
        })
    } catch (error) {
        console.log(error);
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
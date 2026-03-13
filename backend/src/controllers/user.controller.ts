import { Request, Response } from "express";
import { userModel } from "../models/user.model";

class UserController {
    // Get All User
    getAllUser = async (req: Request, res: Response) => {
        try {
            const result = await userModel.find();

            return res.status(200).send({
                message: "User fetched successfully!",
                count: result.length,
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get User By ID
    getUserById = async (req: Request, res: Response) => {
        try {
            const userExist = await userModel.findOne({ _id: req.params.userId });

            if (!userExist) {
                res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "User fetched successfully!",
                result: userExist,
                success: true
            });

        } catch (err: any) {
            console.log(err);

            res.status(500).send({
                message: err.response?.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
};

export default UserController;
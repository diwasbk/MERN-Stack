import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import bcrypt, { hash } from "bcrypt";
import { generateToken } from "../utils/jwt";

class AuthController {
    // Signup User
    signupUser = async (req: Request, res: Response) => {
        try {
            const { email, password, phone, termsAgreed } = req.body;

            const userExist = await userModel.findOne({ email: email });

            if (userExist) {
                return res.status(400).send({
                    message: "This email is already in use!",
                    success: false
                })
            };

            const salt = await bcrypt.genSalt(10);

            const hash = await bcrypt.hash(password, salt);

            const username = email.split("@")[0];

            await userModel.create({
                username: username,
                email: email,
                password: hash,
                phone: phone,
                termsAgreed: termsAgreed
            });

            res.status(201).send({
                message: "Signup successful!",
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
};

export default AuthController;
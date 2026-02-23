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

    // Login User
    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const userExist = await userModel.findOne({ email: email });

            if (!userExist) {
                return res.status(404).send({
                    message: "Invalid email or password.",
                    success: false
                });
            };

            const isPasswordMatch = await bcrypt.compare(password, userExist.password);

            if (!isPasswordMatch) {
                return res.status(401).send({
                    message: "Invalid email or password",
                    success: false
                });
            };

            const payload = {
                id: userExist._id.toString(),
                email: userExist.email,
                role: userExist.role
            }
            const auth_token = generateToken(payload);

            res.cookie("auth_token", auth_token, {
                httpOnly: true,
                maxAge: 3000 * 1000,
                sameSite: "lax",
                secure: false
            });

            res.status(200).send({
                message: "Logged in successfully!",
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

    // Update Password
    updatePassword = async (req: Request, res: Response) => {
        try {
            const { currentPassword, newPassword } = req.body;

            const user = req.user as { id: string };

            const userExist = await userModel.findOne({ _id: user.id });

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            const isPasswordMatch = await bcrypt.compare(currentPassword, userExist.password);

            if (!isPasswordMatch) {
                return res.status(401).send({
                    message: "Current password do not match!",
                    success: false
                });
            };

            const salt = await bcrypt.genSalt(10);

            const hash = await bcrypt.hash(newPassword, salt);

            await userModel.findOneAndUpdate(
                { _id: user.id },
                { $set: { password: hash } }
            );

            res.clearCookie("auth_token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            res.status(200).send({
                message: "Password updated successfully!",
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
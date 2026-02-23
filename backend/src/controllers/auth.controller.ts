import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { CLIENT_URL, JWT_SECRET_KEY } from "../config/config";
import { sendEmail } from "../services/email";

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

    // Send Password Reset Email
    sendPasswordResetEmail = async (req: Request, res: Response) => {
        try {
            const userExist = await userModel.findOne({ email: req.body.email });

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            // Generate a token valid for 3 minutes
            const token = jwt.sign({ email: userExist?.email }, JWT_SECRET_KEY, { expiresIn: "3m" });

            // Create password reset URL
            const resetUrl = `${CLIENT_URL}/reset-password?token=${token}`;

            // Email Content
            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
                    </div>
                    <div style="padding: 30px;">
                        <p style="font-size: 16px; margin-bottom: 20px;">Hello ${userExist.username},</p>
                        <p style="font-size: 14px; color: #666; margin-bottom: 25px; line-height: 1.8;">
                            We received a request to reset your password. Click the button below to create a new password. This link will expire in 3 minutes.
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${resetUrl}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold;">Reset Your Password</a>
                        </div>
                        <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; padding: 12px; font-size: 13px; color: #856404; margin: 25px 0;">
                            <strong>⚠️ Security Note:</strong> If you did not request a password reset, please ignore this email or contact our support team immediately.
                        </div>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 15px 30px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #eee;">
                        <p style="margin: 5px 0;">This is an automated message, please do not reply to this email.</p>
                        <p style="margin: 5px 0;">If you have any questions, please <a href="${CLIENT_URL}/contact" style="color: #007bff; text-decoration: none;">contact our support team</a>.</p>
                    </div>
                </div>
            `;

            // Send email
            await sendEmail(userExist.email, "Reset Your Password", html);

            res.status(200).send({
                message: "Password reset email send successfully!",
                success: true
            });

        } catch (err: any) {
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error",
                success: false
            });
        };
    };
};

export default AuthController;
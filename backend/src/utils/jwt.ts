import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";
import { NextFunction, Request, Response } from "express";

// Extend Request to include user
declare module "express" {
    interface Request {
        user?: string | JwtPayload
    }
};

// Payload type for token
interface tokenPayload {
    id: string;
    email: string;
    role: string;
}

// Generate Token 
const generateToken = (payload: tokenPayload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 3000 });
};

export {generateToken};
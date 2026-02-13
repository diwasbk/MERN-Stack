import mongoose, { Schema } from "mongoose";
import { userType } from "../types/user.types";

const userSchema: Schema = new mongoose.Schema<userType>({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    termsAgreed: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, { timestamps: true });

export interface IUser extends userType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const userModel = mongoose.model<IUser>("User", userSchema);
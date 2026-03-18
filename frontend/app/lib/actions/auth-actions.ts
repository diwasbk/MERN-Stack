import { loginType, signupType } from "@/app/(auth)/schema";
import { loginUser, signupUser } from "../api/auth";

// Handle Signup
export const handleSignUp = async (data: signupType) => {
    try {
        const result = await signupUser(data);

        if (!result) {
            return {
                message: result.message || "Signup failed!",
                success: false
            };
        };

        return {
            message: result.message || "Signup successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Signup failed!",
            success: false
        };
    };
};

// Handle Login
export const handleLogin = async (data: loginType) => {
    try {
        const result = await loginUser(data);

        if (!result.success) {
            return {
                message: result.message || "Login failed!",
                success: false
            };
        };

        return {
            message: result.message || "Login successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Login failed!",
            success: false
        };
    };
};
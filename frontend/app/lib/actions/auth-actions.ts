import { signupType } from "@/app/(auth)/schema";
import { signupUser } from "../api/auth";

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
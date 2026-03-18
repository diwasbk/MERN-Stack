import { signupType } from "@/app/(auth)/schema";
import axiosInstance from "./axios";
import API from "./endpoints";

// Signup User
export const signupUser = async (data: signupType) => {
    try {
        const response = await axiosInstance.post(API.AUTH.SIGN_UP, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Signup failed!");
    };
};
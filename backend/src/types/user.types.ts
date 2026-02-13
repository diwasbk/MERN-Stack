import { z } from "zod";

// User Schema
export const userSchema = z.object({
    username: z.string().optional(),
    email: z.string("Email is required.").nonempty("Email is required.").email({ message: "Invalid email." }),
    password: z.string("Password is required.").nonempty("Password is required.").min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string("Confirm password is required.").nonempty("Confirm password is required."),
    phone: z.string("Phone number is required").nonempty("Phone number is required.").regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
    termsAgreed: z.boolean("You must agree to the rerms and conditions.").refine(val => val == true, "You must agree to the terms and conditions."),
    role: z.enum(["admin", "user"]).default("user")
}).refine((data) => data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
});
export type userType = z.infer<typeof userSchema>;
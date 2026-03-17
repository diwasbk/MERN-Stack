import z from "zod";

/* Login Schema */
export const loginSchema = z.object({
    email: z.string().nonempty("Email is required.").email({ message: "Invalid email." }),
    password: z.string().nonempty("Password is required.").min(6, "Password must be at least 6 characters."),
});
export type loginType = z.infer<typeof loginSchema>;

/* Signup Schema */
export const signupSchema = z.object({
    email: z.string().nonempty("Email is required.").email({ message: "Please enter a valid email address." }),
    phone: z.string().nonempty("Phone number is required.").length(10, "Phone number must be exactly 10 digits."),
    password: z.string().nonempty("New password is required.").min(6, "Use 6 or more characters with a mix of letters, numbers & symbols."),
    confirmPassword: z.string().nonempty("Confirm password is required.").min(1, "Confirm password is required"),
    termsAgreed: z.boolean().refine(val => val === true, "You must agree to the terms and conditions."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"] // error shows under confirmPassword
});
export type signupType = z.infer<typeof signupSchema>;
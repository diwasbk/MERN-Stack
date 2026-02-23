import z from "zod";

/* Login Schema */
export const loginSchema = z.object({
    email: z.string("Email is required.").nonempty("Email is required.").email({ message: "Please enter a valid email address." }),
    password: z.string("Password is required.").nonempty("Password is required.")
});

/* Change Password Schema */
export const changePasswordSchema = z.object({
    currentPassword: z.string("Current Password is required.").nonempty("Current Password is required."),
    newPassword: z.string("New Password is required.").nonempty("New Password is required.").min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string("Confirm Password is required.").nonempty("Confirm Password is required."),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});

/* Send Password Reset Email Schema */
export const sendPasswordResetEmailSchema = z.object({
    email: z.string("Email is required.").nonempty("Email is required.").email({ message: "Please enter a valid email address." })
});
export type sendPasswordResetEmaiType = z.infer<typeof sendPasswordResetEmailSchema>;
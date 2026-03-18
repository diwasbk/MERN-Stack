"use client";
import { formStyles } from "@/app/lib/styles/styles";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdEmail, MdPassword } from "react-icons/md";
import { loginSchema, loginType } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleLogin } from "@/app/lib/actions/auth-actions";

export default function LoginForm() {
    const router = useRouter();
    const [err, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<loginType>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: loginType) => {
        setError("");

        try {
            const res = await handleLogin(data);

            if (!res.success) {
                throw new Error(res.message || "Login failed!");
            };

            router.push("/dashboard");

        } catch (err: any) {
            setError(err.message || "Login failed!");
        };
    };

    return (
        <div className="flex-1 flex items-center justify-center relative overflow-hidden m-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 backdrop-blur-sm rounded-2xl w-full max-w-lg p-10 md:ml-40 border-2 border-blue-200 bg-white shadow-lg"
            >
                <h2 className="text-4xl font-bold bg-linear-to-r from-slate-800 via-blue-600 to-slate-800 bg-clip-text text-transparent mb-2">
                    Welcome Back
                </h2>

                <p className="text-slate-600 text-sm mb-6">Sign in to access your personal space</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Server Error */}
                    {err && (
                        <div className="bg-red-300 p-2 rounded-[10px] text-xs text-red-600 mt-2">{err}</div>
                    )}
                    
                    {/* Email */}
                    <div>
                        <label htmlFor="login-email" className={formStyles.label}>Email address</label>
                        <div className="relative">
                            <MdEmail size={18} className={formStyles.icon} />
                            <input
                                {...register("email")}
                                id="login-email"
                                type="text"
                                placeholder="johndoe@example.com"
                                className={formStyles.input}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-2">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="login-password" className={formStyles.label}>Password</label>
                        <div className="relative">
                            <MdPassword size={18} className={formStyles.icon} />
                            <input
                                {...register("password")}
                                id="login-password"
                                type="password"
                                placeholder="•••••••••••"
                                className={formStyles.input}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-2">{errors.password.message}</p>
                        )}

                        {/* Forgot Password Link */}
                        <div className="text-right mt-2">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    {/* Action Row */}
                    <div className="flex flex-col gap-6 pt-4">
                        <button
                            type="submit"
                            className={`w-full bg-blue-700 text-white py-3 px-8 rounded-xl font-bold shadow-xl shadow-blue-100 transition-all
                                ${isSubmitting ? "opacity-60" : "hover:bg-blue-800 cursor-pointer"}`}
                        >
                            {isSubmitting ? "Logging In..." : "Log In"}
                        </button>

                        {/* Signup */}
                        <p className="text-center text-sm text-slate-600">
                            Don&apos;t have an Account?{" "}
                            <Link href="/signup">
                                <span className="font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer transition-colors">Create an account</span>
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
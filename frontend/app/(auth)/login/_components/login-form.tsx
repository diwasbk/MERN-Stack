"use client";
import { formStyles } from "@/app/lib/styles/styles";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdEmail, MdPassword } from "react-icons/md";

export default function LoginForm() {
    return (
        <div className="flex-1 flex items-center justify-center relative overflow-hidden m-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 backdrop-blur-sm rounded-2xl w-full max-w-lg p-10 md:ml-40 border-2 border-blue-200 bg-white shadow-lg"
            >
                <h2 className="text-3xl font-bolda bg-linear-to-r from-slate-800 via-blue-600 to-slate-800 bg-clip-text text-transparent mb-2">
                    Welcome Back
                </h2>

                <p className="text-slate-600 text-sm mb-6">Sign in to access your personal space</p>

                <form className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="login-email" className={formStyles.label}>Email address</label>
                        <div className="relative">
                            <MdEmail size={18} className={formStyles.icon} />
                            <input
                                id="login-email"
                                type="text"
                                placeholder="johndoe@example.com"
                                className={formStyles.input}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="login-password" className={formStyles.label}>Password</label>
                        <div className="relative">
                            <MdPassword size={18} className={formStyles.icon} />
                            <input
                                id="login-password"
                                type="password"
                                placeholder="•••••••••••"
                                className={formStyles.input}
                            />
                        </div>

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
                            className="w-full bg-blue-700 text-white py-3 px-8 rounded-xl font-bold shadow-xl shadow-blue-100 transition-all cursor-pointer"
                        >
                            Log In
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
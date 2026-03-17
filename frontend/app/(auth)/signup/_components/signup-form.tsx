"use client";
import { motion } from "framer-motion";
import { formStyles } from "@/app/lib/styles/styles";
import { MdEmail, MdPassword } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import Link from "next/link";

export default function SignupForm() {

    return (
        <div className="flex-1 flex items-center justify-center relative overflow-hidden m-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 backdrop-blur-sm rounded-2xl w-full max-w-lg p-10 md:ml-40 border-2 border-blue-200 bg-white shadow-lg"
            >
                <h2 className="text-4xl font-bold bg-linear-to-r from-slate-800 via-blue-600 to-slate-800 bg-clip-text text-transparent mb-2">
                    Create Your Account
                </h2>
                <p className="text-slate-600 text-sm mb-6">Join us to manage your personal space seamlessly</p>
                <form className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="signup-email" className={formStyles.label}>Email address</label>
                        <div className="relative">
                            <MdEmail size={18} className={formStyles.icon} />
                            <input
                                id="signup-email"
                                type="text"
                                placeholder="johndoe@example.com"
                                className={formStyles.input}
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="signup-phone" className={formStyles.label}>Phone number</label>
                        <div className="relative">
                            <BiPhone size={18} className={formStyles.icon} />
                            <input
                                id="signup-phone"
                                type="tel"
                                placeholder="9800000000"
                                className={formStyles.input}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="signup-password" className={formStyles.label}>Password</label>
                        <div className="relative">
                            <MdPassword size={18} className={formStyles.icon} />
                            <input
                                id="signup-password"
                                type="password"
                                placeholder="•••••••••••"
                                className={formStyles.input}
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="signup-confirm-password" className={formStyles.label}>Confirm Password</label>
                        <div className="relative">
                            <MdPassword size={18} className={formStyles.icon} />
                            <input
                                id="signup-confirm-password"
                                type="password"
                                placeholder="•••••••••••"
                                className={formStyles.input}
                            />
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-3">
                        <input
                            id="signup-terms"
                            type="checkbox"
                            className=" w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        />
                        <label htmlFor="signup-terms" className="text-xs text-slate-600 leading-relaxed">
                            By creating an account, you agree to our{" "}
                            <span className="text-blue-600 hover:text-blue-700 font-semibold underline cursor-pointer transition-colors\">Terms of Service</span> and{" "}
                            <span className="text-blue-600 hover:text-blue-700 font-semibold underline cursor-pointer transition-colors\">Privacy Policy</span>
                        </label>
                    </div>

                    {/* Action Row */}
                    <div className="flex flex-col gap-6 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-3 px-8 rounded-xl font-bold shadow-xl shadow-blue-100 transition-all hover:bg-blue-800 cursor-pointer"
                        >
                            Create Account
                        </button>
                        <p className="text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link href="/login">
                                <span className="font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer transition-colors">Sign in here</span>
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
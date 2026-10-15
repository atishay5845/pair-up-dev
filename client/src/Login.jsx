// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!emailId.trim() || !password) {
            setErrorMessage("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${BASE_URL}/login`,
                {
                    email: emailId.trim(),
                    password,
                },
                { withCredentials: true }
            );

            dispatch(addUser(res.data));
            navigate("/", { replace: true });
        } catch (err) {
            const responseData = err?.response?.data;

            setErrorMessage(
                responseData?.message ||
                    (typeof responseData === "string" ? responseData : "") ||
                    "Unable to sign in. Please check your credentials and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "mt-2 w-full rounded-xl border border-white/10 bg-[#0c101a] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/70 focus:ring-4 focus:ring-indigo-500/10";

    return (
        <main className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden bg-[#090c14] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
            {/* Background effects */}
            <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-indigo-600/[0.14] blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/[0.09] blur-[130px]" />

            <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#10141f]/80 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:min-h-[650px] lg:grid-cols-2">
                {/* Left promotional panel */}
                <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/[0.07] bg-[#0d111b] p-10 lg:flex xl:p-14">
                    <div className="pointer-events-none absolute -right-28 top-24 h-72 w-72 rounded-full bg-indigo-500/[0.15] blur-[90px]" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-full bg-gradient-to-t from-violet-500/[0.06] to-transparent" />

                    <div className="relative">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-gradient-to-br from-indigo-400 via-violet-500 to-fuchsia-500 text-xl font-black shadow-lg shadow-indigo-950/40">
                                d.
                            </span>
                            <span className="text-xl font-extrabold tracking-tight">
                                Dev<span className="text-indigo-300">Circle</span>
                            </span>
                        </Link>

                        <div className="mt-24">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-300/[0.07] px-3.5 py-2 text-xs font-medium text-indigo-200">
                                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                                YOUR PEOPLE ARE OUT THERE
                            </div>

                            <h1 className="max-w-lg text-5xl font-extrabold leading-[1.08] tracking-tight xl:text-6xl">
                                The next big thing starts with{" "}
                                <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                                    a connection.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
                                Meet curious minds, discover new perspectives,
                                and find the developers who make your ideas
                                bigger.
                            </p>
                        </div>
                    </div>

                    {/* Decorative connection card */}
                    <div className="relative mt-16 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400/20 to-fuchsia-400/20 text-xl text-indigo-200">
                                ✳
                            </div>
                            <div>
                                <p className="font-semibold text-white">
                                    Good to have you back.
                                </p>
                                <p className="mt-1 text-sm text-slate-400">
                                    Your next connection could be one click away.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Login form */}
                <section className="flex items-center justify-center p-5 sm:p-10 lg:p-12 xl:p-16">
                    <div className="w-full max-w-md">
                        <Link to="/" className="mb-10 inline-flex items-center gap-2 lg:hidden">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 text-lg font-black">
                                d.
                            </span>
                            <span className="text-lg font-extrabold">
                                Dev<span className="text-indigo-300">Circle</span>
                            </span>
                        </Link>

                        <div className="mb-8">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-300/15 bg-indigo-300/[0.08] text-xl text-indigo-200">
                                ↗
                            </div>

                            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Welcome back<span className="text-indigo-300">.</span>
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Sign in and pick up where your next great idea
                                begins.
                            </p>
                        </div>

                        {location.state?.message && (
                            <div
                                role="status"
                                className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 text-sm text-emerald-300"
                            >
                                {location.state.message}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="login-email"
                                    className="text-sm font-medium text-slate-200"
                                >
                                    Email address
                                </label>

                                <input
                                    id="login-email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="login-password"
                                        className="text-sm font-medium text-slate-200"
                                    >
                                        Password
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        className={`${inputClass} pr-16`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((visible) => !visible)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-indigo-300 transition hover:bg-white/[0.05] hover:text-indigo-200"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {errorMessage && (
                                <div
                                    role="alert"
                                    className="rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm leading-6 text-rose-300"
                                >
                                    {errorMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-indigo-400 hover:to-violet-400 hover:shadow-indigo-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm" />
                                        Signing you in...
                                    </>
                                ) : (
                                    <>
                                        Sign in to DevCircle
                                        <span className="transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/[0.08]" />
                            <span className="text-xs text-slate-500">
                                NEW TO DEVCIRCLE?
                            </span>
                            <div className="h-px flex-1 bg-white/[0.08]" />
                        </div>

                        <Link
                            to="/signup"
                            className="flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-300/30 hover:bg-indigo-300/[0.05] hover:text-white"
                        >
                            Create your account
                        </Link>

                        <p className="mt-8 text-center text-xs leading-6 text-slate-500">
                            By continuing, you agree to use DevCircle
                            respectfully and help build a welcoming developer
                            community.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;
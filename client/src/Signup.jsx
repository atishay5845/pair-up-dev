// Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        if (password.length < 8) {
            setErrorMessage("Your password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Your passwords don't match. Please try again.");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                `${BASE_URL}/signup`,
                {
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password,
                },
                { withCredentials: true }
            );

            navigate("/login", {
                replace: true,
                state: {
                    message: "Your account has been created successfully. Sign in to continue.",
                },
            });
        } catch (err) {
            const responseData = err?.response?.data;

            setErrorMessage(
                responseData?.message ||
                    (typeof responseData === "string" ? responseData : "") ||
                    "Unable to create your account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "mt-2 w-full rounded-xl border border-white/10 bg-[#0c101a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/70 focus:ring-4 focus:ring-indigo-500/10";

    return (
        <main className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden bg-[#090c14] px-4 py-8 text-white sm:px-6 sm:py-12 lg:px-8">
            {/* Background effects */}
            <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-violet-600/[0.14] blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-indigo-600/[0.12] blur-[130px]" />

            <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#10141f]/80 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-2">
                {/* Signup form */}
                <section className="flex items-center justify-center p-5 sm:p-9 lg:p-12 xl:p-14">
                    <div className="w-full max-w-md">
                        <Link
                            to="/"
                            className="mb-8 inline-flex items-center gap-3"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 via-violet-500 to-fuchsia-500 text-lg font-black shadow-lg shadow-indigo-950/40">
                                d.
                            </span>

                            <span className="text-lg font-extrabold tracking-tight">
                                Dev<span className="text-indigo-300">Circle</span>
                            </span>
                        </Link>

                        <div className="mb-7">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-300/[0.08] text-xl text-violet-200">
                                ✳
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Find your people<span className="text-violet-300">.</span>
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Create your account and meet developers who
                                are excited to build, learn, and grow.
                            </p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="signup-first-name"
                                        className="text-sm font-medium text-slate-200"
                                    >
                                        First name
                                    </label>

                                    <input
                                        id="signup-first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        maxLength={50}
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        placeholder="Alex"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="signup-last-name"
                                        className="text-sm font-medium text-slate-200"
                                    >
                                        Last name
                                    </label>

                                    <input
                                        id="signup-last-name"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        maxLength={50}
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        placeholder="Morgan"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="signup-email"
                                    className="text-sm font-medium text-slate-200"
                                >
                                    Email address
                                </label>

                                <input
                                    id="signup-email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="signup-password"
                                    className="text-sm font-medium text-slate-200"
                                >
                                    Create password
                                </label>

                                <div className="relative">
                                    <input
                                        id="signup-password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="At least 8 characters"
                                        className={`${inputClass} pr-16`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((visible) => !visible)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-indigo-300 hover:bg-white/[0.05] hover:text-indigo-200"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>

                                <p className="mt-2 text-xs text-slate-500">
                                    Choose a password with at least 8 characters.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="signup-confirm-password"
                                    className="text-sm font-medium text-slate-200"
                                >
                                    Confirm password
                                </label>

                                <input
                                    id="signup-confirm-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Enter your password again"
                                    className={inputClass}
                                />
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
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Creating your account...
                                    </>
                                ) : (
                                    <>
                                        Create my account
                                        <span className="transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-400">
                            Already part of the circle?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-indigo-300 transition hover:text-violet-200"
                            >
                                Sign in
                            </Link>
                        </p>

                        <p className="mt-5 text-center text-xs leading-6 text-slate-500">
                            Be respectful, share your skills, and help make
                            the developer community a welcoming place.
                        </p>
                    </div>
                </section>

                {/* Right promotional panel */}
                <section className="relative hidden flex-col justify-between overflow-hidden border-l border-white/[0.07] bg-[#0d111b] p-10 lg:flex xl:p-14">
                    <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-violet-500/[0.15] blur-[100px]" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-indigo-500/[0.07] to-transparent" />

                    <div className="relative">
                        <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.07] px-3.5 py-2 text-xs font-medium text-violet-200">
                            <span>✳</span>
                            MADE FOR BUILDERS
                        </div>

                        <h2 className="mt-10 max-w-lg text-5xl font-extrabold leading-[1.08] tracking-tight xl:text-6xl">
                            Your next
                            <br />
                            collaborator is
                            <br />
                            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                                out there.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
                            Great projects come from more than great code.
                            They start with people who challenge you, share
                            ideas, and believe in building something better.
                        </p>
                    </div>

                    {/* Three values */}
                    <div className="relative mt-16 space-y-3">
                        {[
                            {
                                icon: "</>",
                                title: "Show what you know",
                                description: "Make your skills visible.",
                            },
                            {
                                icon: "⌘",
                                title: "Meet your kind of people",
                                description: "Find developers with shared interests.",
                            },
                            {
                                icon: "↗",
                                title: "Build beyond yourself",
                                description: "Turn introductions into possibilities.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
                            >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-300/15 bg-indigo-300/[0.08] text-sm font-bold text-indigo-200">
                                    {item.icon}
                                </span>

                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        {item.title}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Signup;
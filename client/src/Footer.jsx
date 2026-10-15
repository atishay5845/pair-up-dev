// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
    const user = useSelector((state) => state.user);
    const ctaLink = user ? "/feed" : "/signup";

    const footerLinkClass =
        "inline-flex w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-indigo-300";

    return (
        <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#080b12] text-white">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute -right-32 -top-40 h-80 w-80 rounded-full bg-indigo-600/[0.08] blur-[110px]" />
            <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-violet-600/[0.06] blur-[100px]" />

            <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-14 sm:px-8 sm:pt-16 lg:px-10">
                {/* Main footer */}
                <div className="grid gap-12 border-b border-white/[0.08] pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.1fr] lg:gap-10">
                    {/* Brand column */}
                    <div>
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3"
                            aria-label="DevCircle home"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-gradient-to-br from-indigo-400 via-violet-500 to-fuchsia-500 text-xl font-black text-white shadow-lg shadow-indigo-950/40 transition group-hover:rotate-[-5deg]">
                                d.
                            </span>

                            <span className="text-2xl font-extrabold tracking-tight">
                                Dev<span className="text-indigo-300">Circle</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                            A space for developers to meet, share their skills,
                            discover fresh perspectives, and find people to
                            build with.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 text-xs font-medium text-slate-300">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Made for people who build
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-sm font-bold text-white">
                            Explore
                        </h3>

                        <div className="mt-5 flex flex-col items-start gap-4">
                            <Link to="/" className={footerLinkClass}>
                                Home
                            </Link>
                            <Link to="/feed" className={footerLinkClass}>
                                Discover developers
                            </Link>
                            <Link to="/#how-it-works" className={footerLinkClass}>
                                How it works
                            </Link>
                            <Link to="/#features" className={footerLinkClass}>
                                Features
                            </Link>
                        </div>
                    </div>

                    {/* Your account */}
                    <div>
                        <h3 className="text-sm font-bold text-white">
                            Your space
                        </h3>

                        <div className="mt-5 flex flex-col items-start gap-4">
                            <Link to="/profile" className={footerLinkClass}>
                                Your profile
                            </Link>
                            <Link to="/connections" className={footerLinkClass}>
                                Connections
                            </Link>
                            <Link to="/requests" className={footerLinkClass}>
                                Connection requests
                            </Link>
                            <Link
                                to={user ? "/profile" : "/login"}
                                className={footerLinkClass}
                            >
                                {user ? "Edit your profile" : "Log in"}
                            </Link>
                        </div>
                    </div>

                    {/* CTA column */}
                    <div className="relative overflow-hidden rounded-3xl border border-indigo-300/15 bg-gradient-to-br from-indigo-500/[0.12] via-[#121522] to-violet-500/[0.08] p-5 sm:p-6">
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-400/10 blur-2xl" />

                        <div className="relative">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-300/15 bg-indigo-300/[0.08] text-xl text-indigo-200">
                                ✳
                            </span>

                            <h3 className="mt-5 text-lg font-bold text-white">
                                Your next great connection awaits.
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Put your skills out there. Find your people.
                            </p>

                            <Link
                                to={ctaLink}
                                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-bold text-white transition hover:from-indigo-400 hover:to-violet-400"
                            >
                                {user ? "Explore developers" : "Join DevCircle"}
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-6 text-slate-500">
                        © {new Date().getFullYear()} DevCircle. Made for
                        developers, by the spirit of building together.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                        <span className="text-xs text-slate-500">
                            Connect. Collaborate. Create.
                        </span>

                        <Link
                            to="/"
                            className="text-xs font-semibold text-slate-400 transition hover:text-indigo-300"
                        >
                            Back to top ↑
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { removeUser } from "./utils/userSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    const closeMenus = () => {
        setMobileOpen(false);
        setProfileOpen(false);
    };

    const handleLogout = async () => {
        if (loggingOut) return;

        setLoggingOut(true);
        setLogoutError("");

        try {
            await axios.post(
                `${BASE_URL}/logout`,
                {},
                { withCredentials: true }
            );

            dispatch(removeUser());
            closeMenus();
            navigate("/login");
        } catch (error) {
            setLogoutError(
                error.response?.data?.message ||
                    "Couldn't log out. Please try again."
            );
        } finally {
            setLoggingOut(false);
        }
    };

    const navLinkClass =
        "rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white";

    const publicLinks = [
        { label: "How it works", to: "/#how-it-works" },
        { label: "Features", to: "/#features" },
    ];

    const privateLinks = [
        { label: "Discover", to: "/feed" },
        { label: "Connections", to: "/connections" },
        { label: "Requests", to: "/requests" },
    ];

    const avatarFallback =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#090c14]/85 text-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
                <nav
                    aria-label="Main navigation"
                    className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
                >
                    {/* Brand */}
                    <Link
                        to="/"
                        onClick={closeMenus}
                        className="group flex shrink-0 items-center gap-3"
                        aria-label="DevCircle home"
                    >
                        <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[14px] bg-gradient-to-br from-indigo-400 via-violet-500 to-fuchsia-500 text-xl font-black text-white shadow-lg shadow-indigo-950/40 transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
                            d<span className="text-indigo-100">.</span>
                            <span className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-white/20 blur-md" />
                        </span>

                        <span className="text-xl font-extrabold tracking-tight text-white sm:text-[22px]">
                            Dev<span className="text-indigo-300">Circle</span>
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {(user ? privateLinks : publicLinks).map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={navLinkClass}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden items-center gap-3 lg:flex">
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                    Log in
                                </Link>

                                <Link
                                    to="/signup"
                                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-400 hover:to-violet-400"
                                >
                                    Get started
                                    <span className="transition-transform group-hover:translate-x-0.5">
                                        →
                                    </span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/feed"
                                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-300/15 bg-indigo-300/[0.07] px-4 py-2.5 text-sm font-semibold text-indigo-200 transition hover:border-indigo-300/30 hover:bg-indigo-300/[0.12]"
                                >
                                    <span>✳</span>
                                    Explore people
                                </Link>

                                {/* Profile dropdown */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        aria-label="Open profile menu"
                                        aria-expanded={profileOpen}
                                        onClick={() =>
                                            setProfileOpen((open) => !open)
                                        }
                                        className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-1.5 pr-3 transition hover:border-white/15 hover:bg-white/[0.06]"
                                    >
                                        <img
                                            src={user.photoUrl || avatarFallback}
                                            alt=""
                                            onError={(event) => {
                                                event.currentTarget.onerror =
                                                    null;
                                                event.currentTarget.src =
                                                    avatarFallback;
                                            }}
                                            className="h-9 w-9 rounded-xl object-cover"
                                        />

                                        <span className="max-w-28 truncate text-sm font-semibold text-slate-200">
                                            {user.firstName || "My account"}
                                        </span>

                                        <svg
                                            className={`h-4 w-4 text-slate-500 transition-transform ${
                                                profileOpen ? "rotate-180" : ""
                                            }`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path
                                                d="m6 9 6 6 6-6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    {profileOpen && (
                                        <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#141925] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                                            <div className="border-b border-white/[0.07] px-3 py-3">
                                                <p className="truncate text-sm font-bold text-white">
                                                    {[
                                                        user.firstName,
                                                        user.lastName,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" ") || "Developer"}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Your DevCircle account
                                                </p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                onClick={closeMenus}
                                                className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                                            >
                                                <span className="text-indigo-300">
                                                    ◉
                                                </span>
                                                Edit profile
                                            </Link>

                                            <Link
                                                to="/connections"
                                                onClick={closeMenus}
                                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                                            >
                                                <span className="text-indigo-300">
                                                    ⌘
                                                </span>
                                                My connections
                                            </Link>

                                            <Link
                                                to="/requests"
                                                onClick={closeMenus}
                                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                                            >
                                                <span className="text-indigo-300">
                                                    ↗
                                                </span>
                                                Connection requests
                                            </Link>

                                            <div className="my-2 border-t border-white/[0.07]" />

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                disabled={loggingOut}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-rose-300 transition hover:bg-rose-400/[0.08] disabled:opacity-50"
                                            >
                                                <span>↪</span>
                                                {loggingOut
                                                    ? "Logging out..."
                                                    : "Log out"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        onClick={() => {
                            setMobileOpen((open) => !open);
                            setProfileOpen(false);
                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-200 transition hover:bg-white/[0.08] lg:hidden"
                    >
                        {mobileOpen ? (
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    d="m6 6 12 12M18 6 6 18"
                                    strokeLinecap="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    d="M4 7h16M4 12h16M4 17h16"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile navigation */}
                {mobileOpen && (
                    <div className="border-t border-white/[0.07] bg-[#0d111b] px-4 pb-5 pt-3 shadow-2xl lg:hidden">
                        <div className="mx-auto flex max-w-7xl flex-col gap-1">
                            {(user ? privateLinks : publicLinks).map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={closeMenus}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {user ? (
                                <>
                                    <div className="my-2 border-t border-white/[0.07]" />

                                    <Link
                                        to="/profile"
                                        onClick={closeMenus}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/[0.05] hover:text-white"
                                    >
                                        <img
                                            src={user.photoUrl || avatarFallback}
                                            alt=""
                                            onError={(event) => {
                                                event.currentTarget.onerror =
                                                    null;
                                                event.currentTarget.src =
                                                    avatarFallback;
                                            }}
                                            className="h-9 w-9 rounded-xl object-cover"
                                        />
                                        <span>
                                            {user.firstName
                                                ? `${user.firstName}'s profile`
                                                : "My profile"}
                                        </span>
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        disabled={loggingOut}
                                        className="mt-1 rounded-xl px-4 py-3 text-left text-sm font-semibold text-rose-300 transition hover:bg-rose-400/[0.08] disabled:opacity-50"
                                    >
                                        {loggingOut
                                            ? "Logging out..."
                                            : "Log out"}
                                    </button>
                                </>
                            ) : (
                                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-4">
                                    <Link
                                        to="/login"
                                        onClick={closeMenus}
                                        className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-slate-200 hover:bg-white/[0.05]"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        to="/signup"
                                        onClick={closeMenus}
                                        className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-center text-sm font-bold text-white"
                                    >
                                        Get started →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {logoutError && (
                <div
                    role="alert"
                    className="fixed right-4 top-24 z-[60] flex max-w-sm items-start gap-3 rounded-2xl border border-rose-400/20 bg-[#17121b] px-4 py-3 text-sm text-rose-200 shadow-2xl"
                >
                    <span className="flex-1">{logoutError}</span>
                    <button
                        type="button"
                        aria-label="Dismiss error"
                        onClick={() => setLogoutError("")}
                        className="text-rose-300 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
            )}
        </>
    );
};

export default Navbar;
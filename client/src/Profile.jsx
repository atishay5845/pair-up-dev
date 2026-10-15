
import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
    const user = useSelector((state) => state.user);

    // Profile unavailable
    if (!user) {
        return (
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f19] px-4">
                <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-[110px]" />
                <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-violet-600/10 blur-[110px]" />

                <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#141925] p-8 text-center shadow-2xl sm:p-10">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            className="h-8 w-8 text-indigo-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 21a8 8 0 0 0-16 0m8-10a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Profile unavailable
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        We couldn't find your profile information. Please sign
                        in or reload your account to continue.
                    </p>
                </section>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#0b0f19]">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-indigo-600/[0.08] blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 top-[35rem] h-96 w-96 rounded-full bg-violet-600/[0.08] blur-[130px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8">
                {/* Page introduction */}
                <header className="mx-auto mb-2 max-w-3xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.08] px-4 py-2 text-xs font-semibold tracking-wide text-indigo-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 21v-2a7 7 0 0 1 14 0v2"
                            />
                        </svg>
                        YOUR ACCOUNT
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Your profile,{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            your story.
                        </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                        Showcase your skills, tell other developers about
                        yourself, and make your next connection count.
                    </p>
                </header>

                {/* Existing profile editor */}
                <section className="mt-2">
                    <EditProfile user={user} />
                </section>

                {/* Footer */}
                <footer className="mt-4 border-t border-white/[0.07] pt-6 text-center">
                    <p className="text-xs text-slate-500">
                        Built for developers. Designed for connections.
                    </p>
                </footer>
            </div>
        </main>
    );
};

export default Profile;

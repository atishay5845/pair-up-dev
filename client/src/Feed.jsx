
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) {
            return;
        }

        try {
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true,
            });

            dispatch(addFeed(res.data.data));
        } catch (error) {
            console.log(
                "Error fetching feed:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    // Loading
    if (!feed) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-4">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-indigo-400"></span>
                    <p className="text-sm font-medium tracking-wide text-slate-400">
                        Finding developers for you...
                    </p>
                </div>
            </div>
        );
    }

    // No users
    if (feed.length === 0) {
        return (
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f19] px-4">
                <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />

                <div className="relative z-10 max-w-md text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] text-4xl">
                        🧑‍💻
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        You're all caught up!
                    </h2>

                    <p className="mt-3 leading-7 text-slate-400">
                        There are no new developers to discover right now.
                        Check back later for new connections.
                    </p>
                </div>
            </div>
        );
    }

    // Users available
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#0b0f19] px-4 py-10 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 top-80 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl">
                {/* Page heading */}
                <header className="mb-12 text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.08] px-4 py-2 text-sm font-medium text-indigo-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        Your developer community
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Discover{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Developers
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                        Meet passionate developers, explore their skills, and
                        find people to build something amazing with.
                    </p>
                </header>

                {/* Feed summary */}
                <div className="mb-8 flex flex-col gap-3 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            People you might like
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Find your next collaborator.
                        </p>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-indigo-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m8-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm4 2a4 4 0 0 1 0-8m6 19v-2a4 4 0 0 0-3-3.87"
                            />
                        </svg>
                        <span className="text-sm font-medium text-slate-300">
                            {feed.length}{" "}
                            {feed.length === 1 ? "developer" : "developers"}
                        </span>
                    </div>
                </div>

                {/* Developer cards */}
                <section
                    aria-label="Discover developers"
                    className="flex flex-wrap items-stretch justify-center gap-6 sm:gap-8"
                >
                    {feed.map((user) => (
                        <div
                            key={user._id}
                            className="flex justify-center transition duration-300 ease-out hover:-translate-y-1"
                        >
                            <UserCard user={user} />
                        </div>
                    ))}
                </section>

                {/* Footer note */}
                <footer className="mt-14 text-center">
                    <p className="text-sm text-slate-500">
                        Great things happen when developers connect.
                    </p>
                </footer>
            </div>
        </main>
    );
};

export default Feed;

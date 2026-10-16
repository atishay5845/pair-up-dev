
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import UserCard from "./UserCard";

const LIMIT = 10;

const Feed = () => {
    const feed = useSelector((store) => store.feed.feed);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch 10 developers for the current page.
    const getFeed = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get(`${BASE_URL}/feed`, {
                params: {
                    page,
                    limit: LIMIT,
                },
                withCredentials: true,
            });

            const users = res.data?.data;

            if (!Array.isArray(users)) {
                throw new Error("Invalid feed data received from server.");
            }

            // Replace the existing page of users in Redux.
            dispatch(addFeed(users));

            // If fewer than 10 users arrive, this is the last page.
            setHasMore(users.length === LIMIT);
        } catch (err) {
            console.error(
                "Error fetching feed:",
                err.response?.data || err.message
            );

            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Unable to load developers. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, [dispatch, page]);

    // Fetch again whenever the page changes.
    useEffect(() => {
        getFeed();
    }, [getFeed]);

    const developers = Array.isArray(feed) ? feed : [];

    // Loading screen.
    if (loading) {
        return (
            <div className="flex min-h-[75vh] items-center justify-center bg-[#0b0f19] px-4">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-indigo-400" />

                    <p className="text-sm font-medium tracking-wide text-slate-400">
                        Finding developers for you...
                    </p>

                    <p className="text-xs text-slate-600">
                        Loading page {page}
                    </p>
                </div>
            </div>
        );
    }

    // Error screen.
    if (error) {
        return (
            <div className="flex min-h-[75vh] items-center justify-center bg-[#0b0f19] px-4">
                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-3xl text-red-300">
                        !
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-white">
                        Couldn't load developers
                    </h2>

                    <p className="mt-3 break-words text-sm leading-6 text-slate-400">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={getFeed}
                        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

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
                        Meet passionate developers, explore their skills,
                        and find people to build something amazing with.
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
                            {developers.length}{" "}
                            {developers.length === 1
                                ? "developer"
                                : "developers"}{" "}
                            on this page
                        </span>
                    </div>
                </div>

                {/* Developer cards or empty state */}
                {developers.length > 0 ? (
                    <section
                        aria-label="Discover developers"
                        className="flex flex-wrap items-stretch justify-center gap-6 sm:gap-8"
                    >
                        {developers.map((user) => (
                            <div
                                key={user._id}
                                className="flex justify-center transition duration-300 ease-out hover:-translate-y-1"
                            >
                                <UserCard user={user} />
                            </div>
                        ))}
                    </section>
                ) : (
                    <section className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-16 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] text-4xl">
                            🧑‍💻
                        </div>

                        <h2 className="text-2xl font-bold text-white sm:text-3xl">
                            {page === 1
                                ? "You're all caught up!"
                                : "No more developers on this page"}
                        </h2>

                        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-400">
                            {page === 1
                                ? "There are no new developers to discover right now. Check back later for new connections."
                                : "You've reached the end of the available feed. Go back to see developers from the previous page."}
                        </p>
                    </section>
                )}

                {/* Pagination controls */}
                <nav
                    aria-label="Feed pagination"
                    className="mt-12 flex flex-wrap items-center justify-center gap-3"
                >
                    <button
                        type="button"
                        onClick={() =>
                            setPage((currentPage) =>
                                Math.max(1, currentPage - 1)
                            )
                        }
                        disabled={page === 1 || loading}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                    >
                        <span aria-hidden="true">←</span>
                        Previous
                    </button>

                    <span
                        aria-live="polite"
                        className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300"
                    >
                        Page {page}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setPage((currentPage) => currentPage + 1)
                        }
                        disabled={!hasMore || loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                        Next
                        <span aria-hidden="true">→</span>
                    </button>
                </nav>

                {/* Footer note */}
                <footer className="mt-10 text-center">
                    <p className="text-sm text-slate-500">
                        Great things happen when developers connect.
                    </p>
                </footer>
            </div>
        </main>
    );
};

export default Feed;

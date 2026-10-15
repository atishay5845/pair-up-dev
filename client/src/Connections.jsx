
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "./utils/constants";
import { addConnections } from "./utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchConnections = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${BASE_URL}/user/connections`,
        { withCredentials: true }
      );

      const users = response.data?.data;

      if (!Array.isArray(users)) {
        throw new Error("Invalid connections data received from server.");
      }

      // Keep only valid users and remove duplicate IDs.
      const uniqueConnections = [
        ...new Map(
          users
            .filter((user) => user && user._id)
            .map((user) => [String(user._id), user])
        ).values(),
      ];

      dispatch(addConnections(uniqueConnections));
    } catch (err) {
      console.error("Error fetching connections:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load your connections. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const connectionList = Array.isArray(connections) ? connections : [];

  // Search by name, about section, or skill.
  const filteredConnections = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return connectionList;

    return connectionList.filter((user) => {
      const name = `${user.firstName || ""} ${
        user.lastName || ""
      }`.toLowerCase();

      const about = (user.about || "").toLowerCase();

      const skills = Array.isArray(user.skills)
        ? user.skills.join(" ").toLowerCase()
        : "";

      return (
        name.includes(query) ||
        about.includes(query) ||
        skills.includes(query)
      );
    });
  }, [connectionList, search]);

  // Initial loading state.
  if (loading) {
    return (
      <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#090c14] px-4 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-400" />
          <span className="text-2xl">🤝</span>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-white">
          Building your network
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Loading your developer connections...
        </p>
      </main>
    );
  }

  // Error state.
  if (error) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#090c14] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-3xl">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            Couldn't load connections
          </h1>

          <p className="mt-3 break-words text-sm leading-6 text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchConnections}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#090c14]"
          >
            <span aria-hidden="true">↻</span>
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[80vh] overflow-hidden bg-[#090c14] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[min(700px,100vw)] -translate-x-1/2 rounded-full bg-violet-600/[0.12] blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Page heading */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1.5 text-xs font-medium tracking-wide text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                YOUR DEVELOPER NETWORK
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Your{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  Connections
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Great things happen when developers connect. Meet the people
                in your network, explore their skills, and grow together.
              </p>
            </div>

            {/* Connection count */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 lg:min-w-48">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl">
                <span aria-hidden="true">👥</span>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  {connectionList.length}
                </p>
                <p className="text-xs text-slate-400">
                  Total connections
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and toolbar */}
        <section className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500"
              >
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, skill, or expertise..."
                aria-label="Search connections"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-violet-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-300">
                  {filteredConnections.length}
                </span>{" "}
                {filteredConnections.length === 1
                  ? "developer"
                  : "developers"}
              </p>

              <button
                type="button"
                onClick={fetchConnections}
                disabled={loading}
                title="Refresh connections"
                aria-label="Refresh connections"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span aria-hidden="true">↻</span>
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/* Empty network state */}
        {connectionList.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/15 bg-violet-500/[0.08] text-4xl">
              🤝
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Your network starts here
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
              You haven't connected with any developers yet. Explore the
              developer feed and start building meaningful professional
              connections.
            </p>

            <a
              href="/feed"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Discover developers
              <span aria-hidden="true">→</span>
            </a>
          </section>
        ) : filteredConnections.length === 0 ? (
          /* Search empty state */
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] px-5 py-16 text-center">
            <div className="text-4xl" aria-hidden="true">
              🔎
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              No developers found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Try another name, skill, or keyword.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-400/30 hover:text-white"
            >
              Clear search
            </button>
          </section>
        ) : (
          /* Developer cards */
          <section
            aria-label="Your developer connections"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredConnections.map((connection) => {
              const {
                _id,
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
                skills,
              } = connection;

              const fullName =
                [firstName, lastName].filter(Boolean).join(" ") ||
                "Developer";

              const normalizedGender =
                typeof gender === "string" ? gender.toLowerCase() : "";

              const defaultPhoto =
                normalizedGender === "female"
                  ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

              const userSkills = Array.isArray(skills) ? skills : [];

              return (
                <article
                  key={_id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111622] transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[0_20px_60px_-25px_rgba(139,92,246,0.25)]"
                >
                  {/* Profile image */}
                  <div className="relative h-60 overflow-hidden bg-slate-800 sm:h-64">
                    <img
                      src={photoUrl || defaultPhoto}
                      alt={`${fullName}'s profile`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = defaultPhoto;
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-black/10 to-transparent" />

                    {/* Connected indicator */}
                    <div className="absolute right-4 top-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Connected
                      </span>
                    </div>

                    {/* Name and personal info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h2 className="truncate text-xl font-bold text-white sm:text-2xl">
                        {fullName}
                      </h2>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                        {age != null && (
                          <span className="rounded-lg border border-white/10 bg-black/25 px-2.5 py-1 backdrop-blur-sm">
                            {age} years old
                          </span>
                        )}

                        {gender && (
                          <span className="rounded-lg border border-white/10 bg-black/25 px-2.5 py-1 capitalize backdrop-blur-sm">
                            {gender}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile details */}
                  <div className="flex flex-1 flex-col p-5">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="h-4 w-1 rounded-full bg-violet-400" />
                        <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          About
                        </h3>
                      </div>

                      <p className="min-h-[4.5rem] break-words text-sm leading-6 text-slate-300 [overflow-wrap:anywhere]">
                        {about?.trim() ||
                          "This developer hasn't added a bio yet."}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="mt-5">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          Tech stack
                        </h3>

                        {userSkills.length > 0 && (
                          <span className="text-xs text-slate-500">
                            {userSkills.length}{" "}
                            {userSkills.length === 1 ? "skill" : "skills"}
                          </span>
                        )}
                      </div>

                      {userSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {userSkills.slice(0, 5).map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="max-w-full break-words rounded-lg border border-violet-400/15 bg-violet-400/[0.07] px-2.5 py-1.5 text-xs font-medium text-violet-200 [overflow-wrap:anywhere]"
                            >
                              {skill}
                            </span>
                          ))}

                          {userSkills.length > 5 && (
                            <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-slate-400">
                              +{userSkills.length - 5} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">
                          No skills added yet.
                        </p>
                      )}
                    </div>

                    {/* Bottom status */}
                    <div className="mt-auto pt-6">
                      <div className="mb-4 border-t border-white/[0.07]" />

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">
                          Your network
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                          <span aria-hidden="true">✓</span>
                          Connected
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Bottom note */}
        {connectionList.length > 0 && (
          <div className="mt-10 border-t border-white/[0.07] pt-6 text-center">
            <p className="text-xs leading-6 text-slate-500">
              Strong networks are built one connection at a time.
              Keep discovering, sharing, and growing.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Connections;

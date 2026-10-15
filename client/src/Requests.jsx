
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "./utils/constants";
import { addRequest } from "./utils/requestSlice";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [actionError, setActionError] = useState("");

  const requestList = Array.isArray(requests) ? requests : [];

  // Fetch incoming connection requests.
  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${BASE_URL}/user/requests/received`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Request failed: ${response.status}`
        );
      }

      if (!Array.isArray(data?.data)) {
        throw new Error("Invalid request data received from server.");
      }

      dispatch(addRequest(data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err.message || "Failed to load connection requests.");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Search incoming requests.
  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return requestList;

    return requestList.filter((request) => {
      const user = request?.fromUserId;

      if (!user || typeof user !== "object") return false;

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
  }, [requestList, search]);

  // Accept or reject a connection request.
  // Assumes the backend uses POST /request/review/:status/:requestId.
  const handleReview = async (requestId, status) => {
    if (!requestId || processingId) return;

    try {
      setProcessingId(requestId);
      setActionError("");

      const response = await fetch(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Unable to ${status} this request.`
        );
      }

      // Remove the reviewed request from the Redux list.
      dispatch(
        addRequest(
          requestList.filter(
            (request) => String(request._id) !== String(requestId)
          )
        )
      );
    } catch (err) {
      console.error("Error reviewing request:", err);
      setActionError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // Loading state.
  if (loading) {
    return (
      <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#090c14] px-4 text-center text-white">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-400" />
          <span className="text-2xl">✉</span>
        </div>

        <h2 className="mt-6 text-xl font-semibold">
          Checking your inbox
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Loading incoming developer requests...
        </p>
      </main>
    );
  }

  // API error state.
  if (error) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#090c14] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-3xl text-red-300">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            Couldn't load requests
          </h1>

          <p className="mt-3 break-words text-sm leading-6 text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchRequests}
            className="mt-7 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[80vh] overflow-hidden bg-[#090c14] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[min(700px,100vw)] -translate-x-1/2 rounded-full bg-violet-600/[0.12] blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1.5 text-xs font-medium tracking-wide text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                YOUR NETWORK INBOX
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Connection{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  Requests
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Developers want to connect with you. Discover their
                backgrounds, explore their skills, and decide who joins
                your network.
              </p>
            </div>

            {/* Requests count */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 sm:min-w-48">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl">
                ✉
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {requestList.length}
                </p>
                <p className="text-xs text-slate-400">
                  Pending requests
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search toolbar */}
        <section className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              placeholder="Search by developer, skill, or bio..."
              aria-label="Search connection requests"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-300">
                {filteredRequests.length}
              </span>
            </p>

            <button
              type="button"
              onClick={fetchRequests}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
            >
              <span aria-hidden="true">↻</span>
              Refresh
            </button>
          </div>
        </section>

        {/* Review feedback */}
        {actionError && (
          <div
            role="alert"
            className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300"
          >
            <span>{actionError}</span>
            <button
              type="button"
              onClick={() => setActionError("")}
              aria-label="Dismiss error"
              className="shrink-0 text-red-300 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* No incoming requests */}
        {requestList.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/15 bg-violet-500/[0.08] text-4xl">
              📭
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              You're all caught up!
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
              There are no pending connection requests right now. Keep
              exploring developers and growing your network.
            </p>

            <Link
              to="/feed"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Discover developers
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        ) : filteredRequests.length === 0 ? (
          /* Search empty state */
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] px-5 py-16 text-center">
            <div className="text-4xl">🔎</div>

            <h2 className="mt-5 text-xl font-semibold">
              No matching requests
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
          /* Incoming request cards */
          <section
            aria-label="Incoming connection requests"
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            {filteredRequests.map((request) => {
              const user = request?.fromUserId;

              const fullName =
                [user?.firstName, user?.lastName]
                  .filter(Boolean)
                  .join(" ") || "Developer";

              const skills = Array.isArray(user?.skills)
                ? user.skills
                : [];

              const gender =
                typeof user?.gender === "string"
                  ? user.gender.toLowerCase()
                  : "";

              const fallbackAvatar =
                gender === "female"
                  ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                  : DEFAULT_AVATAR;

              const isProcessing = processingId === request._id;

              return (
                <article
                  key={request._id}
                  className="group min-w-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111622] transition duration-300 hover:border-violet-400/30 hover:shadow-[0_20px_60px_-25px_rgba(139,92,246,0.22)]"
                >
                  <div className="p-5 sm:p-6">
                    {/* Request label */}
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/[0.07] px-3 py-1.5 text-xs font-medium text-amber-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                        Pending review
                      </span>

                      <span className="text-xs text-slate-500">
                        Wants to connect
                      </span>
                    </div>

                    {/* Developer profile */}
                    <div className="flex min-w-0 items-start gap-4">
                      <img
                        src={user?.photoUrl || fallbackAvatar}
                        alt={`${fullName}'s profile`}
                        loading="lazy"
                        className="h-20 w-20 shrink-0 rounded-2xl border border-white/10 bg-slate-800 object-cover sm:h-24 sm:w-24"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = fallbackAvatar;
                        }}
                      />

                      <div className="min-w-0 flex-1">
                        <h2 className="break-words text-lg font-bold text-white transition group-hover:text-violet-200 sm:text-xl">
                          {fullName}
                        </h2>

                        {(user?.age != null || user?.gender) && (
                          <p className="mt-1 text-xs capitalize text-slate-400">
                            {user?.age != null && `${user.age} years old`}
                            {user?.age != null && user?.gender && " · "}
                            {user?.gender || ""}
                          </p>
                        )}

                        <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-slate-400 [overflow-wrap:anywhere]">
                          {user?.about?.trim() ||
                            "This developer hasn't added a bio yet."}
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-6">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          Skills & expertise
                        </h3>

                        {skills.length > 0 && (
                          <span className="text-xs text-slate-500">
                            {skills.length} total
                          </span>
                        )}
                      </div>

                      {skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {skills.slice(0, 5).map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="max-w-full break-words rounded-lg border border-violet-400/15 bg-violet-400/[0.07] px-2.5 py-1.5 text-xs font-medium text-violet-200 [overflow-wrap:anywhere]"
                            >
                              {skill}
                            </span>
                          ))}

                          {skills.length > 5 && (
                            <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-400">
                              +{skills.length - 5} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">
                          No skills listed yet.
                        </p>
                      )}
                    </div>

                    {/* Accept / reject controls */}
                    <div className="mt-6 border-t border-white/[0.07] pt-5">
                      <p className="mb-4 text-xs leading-5 text-slate-500">
                        Review this request to update your network.
                      </p>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          disabled={Boolean(processingId)}
                          onClick={() =>
                            handleReview(request._id, "accepted")
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <span className="loading loading-spinner loading-sm" />
                          ) : (
                            <span aria-hidden="true">✓</span>
                          )}
                          Accept request
                        </button>

                        <button
                          type="button"
                          disabled={Boolean(processingId)}
                          onClick={() =>
                            handleReview(request._id, "rejected")
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-red-400/30 hover:bg-red-400/[0.06] hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <span className="loading loading-spinner loading-sm" />
                          ) : (
                            <span aria-hidden="true">✕</span>
                          )}
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Footer note */}
        {requestList.length > 0 && (
          <div className="mt-10 border-t border-white/[0.07] pt-6 text-center">
            <p className="text-xs leading-6 text-slate-500">
              Every great developer network begins with a connection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Requests;

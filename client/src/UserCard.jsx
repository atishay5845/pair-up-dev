
import React from "react";

const UserCard = ({
    user,
    showActions = true,
    onIgnore,
    onInterested,
    loading = false,
}) => {
    const {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
        skills = [],
    } = user || {};

    const defaultPhoto =
        gender?.toLowerCase() === "female"
            ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    const safeSkills = Array.isArray(skills) ? skills : [];
    const displayedSkills = safeSkills.slice(0, 4);
    const remainingSkills = safeSkills.length - displayedSkills.length;

    const fullName =
        [firstName, lastName].filter(Boolean).join(" ") ||
        "Developer";

    const handleImageError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = defaultPhoto;
    };

    return (
        <article className="group flex w-full max-w-[340px] flex-col overflow-hidden rounded-3xl border border-white/[0.09] bg-[#141925] shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/40 hover:shadow-[0_20px_55px_rgba(79,70,229,0.15)]">

            {/* Profile image */}
            <div className="relative h-[285px] overflow-hidden bg-[#202738]">
                <img
                    src={photoUrl || defaultPhoto}
                    alt={`${fullName}'s profile`}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    onError={handleImageError}
                    loading="lazy"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141925] via-black/10 to-black/20" />

                {/* Profile label */}
                <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-3.5 w-3.5 text-indigo-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 18.5a4.5 4.5 0 0 0-8 0M12 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 6.5a4 4 0 0 0-3-3.87M17 6.2a3.5 3.5 0 0 1 0 6.6"
                            />
                        </svg>
                        Developer profile
                    </span>
                </div>

                {/* Name and basic information */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="break-words text-2xl font-bold tracking-tight text-white">
                        {fullName}
                        {age !== undefined &&
                            age !== null &&
                            age !== "" && (
                                <span className="ml-2 text-lg font-medium text-slate-300">
                                    {age}
                                </span>
                            )}
                    </h2>

                    {gender && (
                        <p className="mt-1 text-sm capitalize text-slate-300">
                            {gender}
                        </p>
                    )}
                </div>
            </div>

            {/* Profile details */}
            <div className="flex flex-1 flex-col p-5">

                {/* About */}
                <section className="mb-5">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z"
                                />
                            </svg>
                        </span>

                        <h3 className="text-sm font-semibold text-slate-200">
                            About me
                        </h3>
                    </div>

                    <p className="min-h-[60px] whitespace-pre-line break-words text-sm leading-6 text-slate-400 [overflow-wrap:anywhere]">
                        {about?.trim()
                            ? about
                            : "This developer hasn't added a bio yet."}
                    </p>
                </section>

                {/* Skills */}
                <section className="mb-6">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-200">
                            Tech stack
                        </h3>

                        {safeSkills.length > 0 && (
                            <span className="text-xs text-slate-500">
                                {safeSkills.length}{" "}
                                {safeSkills.length === 1
                                    ? "skill"
                                    : "skills"}
                            </span>
                        )}
                    </div>

                    {safeSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {displayedSkills.map((skill, index) => (
                                <span
                                    key={`${skill}-${index}`}
                                    className="max-w-full break-words rounded-lg border border-indigo-400/20 bg-indigo-400/[0.08] px-3 py-1.5 text-xs font-medium text-indigo-200 transition-colors hover:border-indigo-400/40 hover:bg-indigo-400/[0.14]"
                                >
                                    {skill}
                                </span>
                            ))}

                            {remainingSkills > 0 && (
                                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-400">
                                    +{remainingSkills} more
                                </span>
                            )}
                        </div>
                    ) : (
                        <p className="rounded-xl border border-dashed border-white/10 px-3 py-4 text-center text-xs text-slate-500">
                            No skills added yet
                        </p>
                    )}
                </section>

                {/* Actions */}
                {showActions && (
                    <div className="mt-auto grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-5">
                        <button
                            type="button"
                            onClick={onIgnore}
                            disabled={loading}
                            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4 shrink-0"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m18 6-12 12M6 6l12 12"
                                />
                            </svg>
                            Ignore
                        </button>

                        <button
                            type="button"
                            onClick={onInterested}
                            disabled={loading}
                            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition-all duration-200 hover:from-indigo-400 hover:to-violet-400 hover:shadow-indigo-900/40 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-xs" />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-4 w-4 shrink-0"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                                    />
                                </svg>
                            )}
                            Interested
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
};

export default UserCard;

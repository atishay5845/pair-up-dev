// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
const steps = [
    {
        number: "01",
        symbol: "◈",
        title: "Build your profile",
        description:
            "Show the world what you do, what you're learning, and what you'd love to build next.",
    },
    {
        number: "02",
        symbol: "⌘",
        title: "Discover your people",
        description:
            "Explore developer profiles, find complementary skills, and meet people who share your interests.",
    },
    {
        number: "03",
        symbol: "↗",
        title: "Make something happen",
        description:
            "Send a connection request, start a conversation, and turn a great introduction into a great project.",
    },
];

const features = [
    {
        number: "01",
        icon: "◎",
        title: "People over profiles",
        description:
            "Discover developers by their skills, interests, and the things they want to create.",
        className: "md:col-span-2",
    },
    {
        number: "02",
        icon: "⌘",
        title: "Your stack, your story",
        description:
            "Showcase your technologies, introduce yourself, and let your work speak for you.",
        className: "",
    },
    {
        number: "03",
        icon: "↗",
        title: "Connections that matter",
        description:
            "Build your network one intentional connection at a time.",
        className: "",
    },
    {
        number: "04",
        icon: "✳",
        title: "Built for builders",
        description:
            "Whether you're exploring your first project or chasing your next big idea, find people to grow with.",
        className: "md:col-span-2",
    },
];

const Home = () => {
    const user = useSelector((state) => state.user);

    const primaryLink = user ? "/feed" : "/signup";
    const primaryLabel = user ? "Explore developers" : "Find your people";

    return (
        <main
            id="top"
            className="overflow-hidden bg-[#090c14] text-white"
        >
            {/* HERO */}
            <section className="relative isolate">
                {/* Background atmosphere */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_45%_0%,rgba(99,102,241,0.20),transparent_52%)]" />
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

                <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-10 lg:pb-28 lg:pt-24">
                    {/* Hero copy */}
                    <div className="relative z-10">
                        <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-indigo-300/20 bg-indigo-300/[0.07] px-4 py-2 text-xs font-medium text-indigo-200 sm:text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
                            </span>
                            A community for people who build
                            <span className="text-indigo-300">↗</span>
                        </div>

                        <h1 className="max-w-3xl text-[3.35rem] font-extrabold leading-[0.99] tracking-[-0.055em] sm:text-6xl md:text-7xl xl:text-[5.5rem]">
                            Great things
                            <br />
                            don&apos;t happen
                            <br />
                            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                                alone.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                            Find developers who get your ideas, complement
                            your skills, and make building something amazing
                            feel a little less like a solo mission.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                to={primaryLink}
                                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-4 text-sm font-bold text-white shadow-[0_10px_35px_rgba(99,102,241,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_45px_rgba(99,102,241,0.38)]"
                            >
                                {primaryLabel}
                                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <a
                                href="#how-it-works"
                                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-4 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06]"
                            >
                                See how it works
                                <span className="text-slate-400">↓</span>
                            </a>
                        </div>

                        <div className="mt-10 flex items-center gap-4 border-t border-white/[0.08] pt-6">
                            <div className="flex -space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#090c14] bg-gradient-to-br from-fuchsia-400 to-rose-500 text-xs font-bold">
                                    UI
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#090c14] bg-gradient-to-br from-cyan-400 to-blue-600 text-xs font-bold">
                                    JS
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#090c14] bg-gradient-to-br from-amber-300 to-orange-500 text-xs font-bold text-slate-900">
                                    AI
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#090c14] bg-[#202538] text-xs font-bold text-slate-300">
                                    +
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-200">
                                    Different skills. Shared ambition.
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Your next connection starts here.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product preview */}
                    <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[100px]" />

                        <div className="relative rounded-[30px] border border-white/10 bg-[#111622]/90 p-3 shadow-[0_35px_100px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-4">
                            {/* Fake app chrome */}
                            <div className="flex items-center justify-between border-b border-white/[0.07] px-3 pb-4 pt-2 sm:px-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-violet-600 text-sm font-black">
                                        d.
                                    </div>
                                    <span className="text-sm font-bold tracking-tight text-white">
                                        devcircle
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                                    <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                                </div>
                            </div>

                            <div className="grid gap-3 p-2 pt-4 sm:grid-cols-[1.2fr_0.8fr] sm:gap-4 sm:p-4">
                                {/* Main sample profile */}
                                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171d2b]">
                                    <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_10%,rgba(129,140,248,0.42),transparent_65%),linear-gradient(135deg,#202c48,#181826_70%)] sm:h-52">
                                        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.035)_40%,transparent_70%)]" />
                                        <div className="relative flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-gradient-to-br from-violet-300/25 to-indigo-500/20 shadow-2xl backdrop-blur-sm sm:h-32 sm:w-32">
                                            <span className="text-5xl font-black tracking-tighter text-white sm:text-6xl">
                                                MP
                                            </span>
                                            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-emerald-400 text-sm font-bold text-[#092319]">
                                                ✓
                                            </div>
                                        </div>

                                        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md sm:text-xs">
                                            ✳ Profile spotlight
                                        </span>
                                    </div>

                                    <div className="p-4 sm:p-5">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-white sm:text-xl">
                                                    Maya Patel
                                                </h3>
                                                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                                    Frontend Developer
                                                </p>
                                            </div>
                                            <span className="mt-1 whitespace-nowrap rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-2.5 py-1 text-[10px] font-semibold text-emerald-300 sm:text-xs">
                                                Open to build
                                            </span>
                                        </div>

                                        <p className="mt-4 text-xs leading-6 text-slate-400 sm:text-sm">
                                            Turning thoughtful designs into
                                            delightful digital experiences.
                                            Always up for a creative challenge.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["React", "Tailwind", "UI/UX"].map(
                                                (skill) => (
                                                    <span
                                                        key={skill}
                                                        className="rounded-lg border border-indigo-300/15 bg-indigo-300/[0.07] px-2.5 py-1.5 text-[10px] font-medium text-indigo-200 sm:text-xs"
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm">
                                                ↗
                                            </span>
                                            <span className="text-xs font-semibold text-slate-200 sm:text-sm">
                                                A connection worth making
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Mini dashboard panel */}
                                <div className="flex flex-col gap-3">
                                    <div className="rounded-2xl border border-white/10 bg-[#171d2b] p-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-semibold text-slate-200 sm:text-sm">
                                                Your circle
                                            </p>
                                            <span className="text-indigo-300">↗</span>
                                        </div>

                                        <div className="mt-5 flex -space-x-2">
                                            {[
                                                ["AK", "from-cyan-400 to-blue-600"],
                                                ["RS", "from-fuchsia-400 to-purple-600"],
                                                ["JD", "from-amber-300 to-orange-500"],
                                                ["NL", "from-emerald-400 to-teal-600"],
                                            ].map(([initials, gradient]) => (
                                                <div
                                                    key={initials}
                                                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#171d2b] bg-gradient-to-br ${gradient} text-[10px] font-bold text-white`}
                                                >
                                                    {initials}
                                                </div>
                                            ))}
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#171d2b] bg-[#292e40] text-[10px] text-slate-300">
                                                +
                                            </div>
                                        </div>

                                        <p className="mt-4 text-[11px] leading-5 text-slate-400">
                                            Different perspectives make better
                                            projects.
                                        </p>
                                    </div>

                                    <div className="relative flex-1 overflow-hidden rounded-2xl border border-violet-300/15 bg-gradient-to-br from-indigo-500/[0.16] via-[#171d2b] to-fuchsia-500/[0.08] p-4">
                                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl" />
                                        <div className="relative">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/10 text-lg text-violet-200">
                                                ✳
                                            </div>
                                            <p className="mt-4 text-sm font-bold text-white">
                                                Big ideas need good people.
                                            </p>
                                            <p className="mt-2 text-[11px] leading-5 text-slate-400">
                                                Find someone who complements
                                                your skills.
                                            </p>

                                            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-violet-200">
                                                Find your people
                                                <span>→</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom status strip */}
                            <div className="mx-2 mb-2 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 sm:mx-4 sm:px-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <span className="text-[10px] text-slate-400 sm:text-xs">
                                        Your next chapter starts with a hello.
                                    </span>
                                </div>
                                <span className="text-xs text-slate-500">✦</span>
                            </div>
                        </div>

                        {/* Floating detail chips */}
                        <div className="absolute -left-3 top-16 hidden animate-[float_5s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-[#171d2b]/95 p-3 shadow-2xl backdrop-blur-xl sm:block md:-left-8">
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-lg text-cyan-300">
                                    {"</>"}
                                </span>
                                <div>
                                    <p className="text-xs font-bold text-white">
                                        Share your stack
                                    </p>
                                    <p className="mt-1 text-[10px] text-slate-400">
                                        Show what you do
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-2 bottom-16 hidden animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-indigo-300/20 bg-[#171d2b]/95 p-3 shadow-2xl backdrop-blur-xl sm:block md:-right-7">
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-400/10 text-lg text-indigo-300">
                                    ♡
                                </span>
                                <div>
                                    <p className="text-xs font-bold text-white">
                                        A new connection
                                    </p>
                                    <p className="mt-1 text-[10px] text-slate-400">
                                        One hello at a time
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero bottom divider */}
                <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent" />
            </section>

            {/* TECHNOLOGY / COMMUNITY STRIP */}
            <section className="px-5 py-10 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
                    <p className="max-w-xs text-sm leading-6 text-slate-500">
                        Different backgrounds.
                        <br />
                        One shared love for building.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                        {[
                            "Frontend",
                            "Backend",
                            "AI / ML",
                            "Open source",
                            "Product design",
                            "Full stack",
                        ].map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-indigo-300/30 hover:bg-indigo-300/[0.06] hover:text-indigo-200"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                id="how-it-works"
                className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-300">
                            A better way to connect
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                            From solo coder
                            <br className="hidden sm:block" /> to{" "}
                            <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                                dream team.
                            </span>
                        </h2>
                        <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                            No complicated process. Just people, possibilities,
                            and a place to start.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <article
                                key={step.number}
                                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111622] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/25 hover:bg-[#141a29] sm:p-8"
                            >
                                <div className="absolute right-5 top-3 text-6xl font-black tracking-tighter text-white/[0.035] transition group-hover:text-indigo-300/[0.09]">
                                    {step.number}
                                </div>

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-300/15 bg-gradient-to-br from-indigo-300/[0.14] to-violet-300/[0.04] text-2xl text-indigo-200 shadow-inner">
                                    {step.symbol}
                                </div>

                                <p className="mt-7 text-xs font-bold tracking-[0.2em] text-indigo-300">
                                    STEP {step.number}
                                </p>
                                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                                    {step.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-slate-400">
                                    {step.description}
                                </p>

                                {index < steps.length - 1 && (
                                    <div className="absolute -right-2 top-1/2 hidden h-px w-7 bg-gradient-to-r from-indigo-300/40 to-transparent md:block" />
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section
                id="features"
                className="scroll-mt-24 border-y border-white/[0.06] bg-[#0d111b] px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-300">
                                More than a directory
                            </p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                                Your people are
                                <br />
                                <span className="text-slate-500">
                                    your superpower.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                            A place to put yourself out there, find fresh
                            perspectives, and meet developers who make you
                            want to build more.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <article
                                key={feature.number}
                                className={`group relative min-h-60 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#141925] p-6 transition duration-300 hover:border-violet-300/25 sm:p-8 ${feature.className}`}
                            >
                                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-500/[0.06] blur-3xl transition group-hover:bg-indigo-400/[0.12]" />

                                <div className="relative flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-300/[0.08] text-2xl text-violet-200">
                                        {feature.icon}
                                    </div>
                                    <span className="text-xs font-semibold tracking-widest text-slate-600">
                                        {feature.number}
                                    </span>
                                </div>

                                <h3 className="relative mt-8 text-xl font-bold text-white sm:text-2xl">
                                    {feature.title}
                                </h3>
                                <p className="relative mt-3 max-w-md text-sm leading-7 text-slate-400">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.12] blur-[120px]" />

                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-indigo-300/15 bg-gradient-to-br from-[#191a32] via-[#131626] to-[#171126] px-6 py-14 text-center shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:px-12 sm:py-20">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(129,140,248,0.06),transparent_48%,rgba(217,70,239,0.05))]" />

                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-200/20 bg-indigo-200/[0.08] text-2xl text-indigo-200">
                        ✳
                    </div>

                    <p className="relative mt-7 text-xs font-bold uppercase tracking-[0.22em] text-indigo-300">
                        Your next chapter starts here
                    </p>

                    <h2 className="relative mx-auto mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        You have the idea.
                        <br />
                        <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                            Find the people.
                        </span>
                    </h2>

                    <p className="relative mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                        Your next collaborator, coding friend, or project
                        partner could be one connection away.
                    </p>

                    <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            to={primaryLink}
                            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-[#111322] transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-100"
                        >
                            {primaryLabel}
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Link>

                        {!user && (
                            <Link
                                to="/login"
                                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
                            >
                                I already have an account
                            </Link>
                        )}
                    </div>

                    <p className="relative mt-6 text-xs text-slate-500">
                        Built for people who believe great work gets better
                        together.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Home;
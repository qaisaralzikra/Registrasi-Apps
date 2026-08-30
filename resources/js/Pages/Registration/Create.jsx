import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function RegistrationCreate({ event }) {
    const initialData = event.fields.reduce((acc, field) => {
        acc[field.key] = "";
        return acc;
    }, {});

    const { data, setData, post, processing, errors } = useForm(initialData);

    const submit = (e) => {
        e.preventDefault();
        post(route("events.register.store", { events: event.title_event }));
    };

    return (
        <GuestLayout>
            <Head title="Register for Event - Relate House" />

            <div className="mx-auto w-full max-w-xl">
                <div className="mb-6 flex items-center gap-3 text-slate-300">
                    <Link
                        href={`/user/${event.title_event}`}
                        className="text-sm text-slate-500 hover:text-slate-200"
                    >
                        ← Back to Event
                    </Link>
                </div>
                <div
                    className="overflow-hidden rounded-[32px] border border-white/10
    bg-[#0b3558]/70 shadow-[0_15px_35px_rgba(0,0,0,0.18)]
    backdrop-blur-md"
                >
                    <div className="rounded-t-[32px] bg-[#99BB1C] px-6 py-5 text-white">
                        <div className="flex items-start gap-4">
                            {/* <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20">
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 4H20V20H4V4Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 8H16"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div> */}
                            <div>
                                <h1 className="text-2xl font-semibold text-white">
                                    {event.title_event}
                                </h1>
                                <p className="mt-1 text-sm  text-[#012b52]">
                                    {event.subtitle_event}
                                </p>
                                <p className="mt-3 text-sm  text-[#012b52]">
                                    {event.date_time_event} · {event.venue}
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6 p-10 py-16">
                        {event.fields.map((field) => (
                            <div key={field.key}>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                                    <span>
                                        {field.label}
                                        {field.required ? " *" : ""}
                                    </span>
                                </label>
                                {field.type === "select" ? (
                                    <select
                                        value={data[field.key]}
                                        onChange={(e) =>
                                            setData(field.key, e.target.value)
                                        }
                                        className="w-full rounded-3xl border border-white/10 bg-[#0b3558]/60 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                    >
                                        <option value="">
                                            Select your Choice
                                        </option>
                                        {field.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        value={data[field.key]}
                                        onChange={(e) =>
                                            setData(field.key, e.target.value)
                                        }
                                        placeholder={
                                            field.type === "email"
                                                ? "you@company.com"
                                                : field.type === "tel"
                                                  ? "+62 812 3456 7890"
                                                  : `Enter your ${field.label.toLowerCase()}`
                                        }
                                        className="w-full rounded-3xl border border-white/10 bg-[#0b3558]/60 placeholder:text-white px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                    />
                                )}
                                {errors[field.key] && (
                                    <p className="mt-2 text-sm text-rose-400">
                                        {errors[field.key]}
                                    </p>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-3xl bg-[#99BB1C] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#99BB1C]/80 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Complete Registration
                        </button>

                        <p className="text-center text-xs text-slate-500">
                            You will receive a QR e-ticket after submission
                        </p>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

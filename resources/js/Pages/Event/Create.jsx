import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title_event: '',
        subtitle_event: '',
        desc_event: '',
        date_time_event: '',
        venue: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('events.store'));
    };

    return (
        <GuestLayout>
            <Head title="Create Event" />

            <div className="w-full max-w-2xl">
                <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/95 px-8 py-10 shadow-[0_40px_120px_rgba(15,23,42,0.45)]">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20">
                            <svg
                                className="h-7 w-7"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2L4 7V17L12 22L20 17V7L12 2Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 22V12"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-semibold text-white">
                            Create Event
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Set up a new event for registration
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-200">
                                Title Event
                            </label>
                            <input
                                type="text"
                                value={data.title_event}
                                onChange={(e) => setData('title_event', e.target.value)}
                                placeholder="e.g. DevSummit Indonesia 2025"
                                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                            />
                            {errors.title_event && (
                                <p className="mt-2 text-sm text-rose-400">{errors.title_event}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-200">
                                Subtitle Event
                            </label>
                            <input
                                type="text"
                                value={data.subtitle_event}
                                onChange={(e) => setData('subtitle_event', e.target.value)}
                                placeholder="Short tagline or subheading"
                                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                            />
                            {errors.subtitle_event && (
                                <p className="mt-2 text-sm text-rose-400">{errors.subtitle_event}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-200">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                value={data.desc_event}
                                onChange={(e) => setData('desc_event', e.target.value)}
                                placeholder="Event description..."
                                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                            />
                            {errors.desc_event && (
                                <p className="mt-2 text-sm text-rose-400">{errors.desc_event}</p>
                            )}
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">
                                    Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.date_time_event}
                                    onChange={(e) => setData('date_time_event', e.target.value)}
                                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                />
                                {errors.date_time_event && (
                                    <p className="mt-2 text-sm text-rose-400">{errors.date_time_event}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">
                                    Venue
                                </label>
                                <input
                                    type="text"
                                    value={data.venue}
                                    onChange={(e) => setData('venue', e.target.value)}
                                    placeholder="Venue or online link"
                                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                />
                                {errors.venue && (
                                    <p className="mt-2 text-sm text-rose-400">{errors.venue}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Min. 6 characters"
                                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-rose-400">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Repeat password"
                                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 rounded-3xl bg-violet-500 px-4 py-3 text-base font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Create Event
                            </button>
                            <Link
                                href={route('login')}
                                className="rounded-3xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

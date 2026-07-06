import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title_event: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign In" />

            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/95 px-8 py-10 shadow-[0_40px_120px_rgba(15,23,42,0.45)]">
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20">
                        <svg
                            className="h-7 w-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 3L4 8.5V15.5L12 21L20 15.5V8.5L12 3Z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 21V11"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-semibold text-white">Event Login</h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Enter your event name and password
                    </p>
                </div>

                {status && (
                    <div className="mb-6 rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-200">
                            Title Event
                        </label>
                        <input
                            id="title_event"
                            type="text"
                            name="title_event"
                            value={data.title_event}
                            autoComplete="off"
                            onChange={(e) => setData('title_event', e.target.value)}
                            className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                        />
                        {errors.title_event && (
                            <p className="mt-2 text-sm text-rose-400">
                                {errors.title_event}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-200">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-rose-400">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-3xl bg-violet-500 px-4 py-3 text-base font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Don't have an event?{' '}
                    <Link
                        href={route('events.create')}
                        className="font-medium text-violet-400 transition hover:text-violet-300"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}

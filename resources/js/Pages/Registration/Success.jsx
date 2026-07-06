import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function RegistrationSuccess({ event, attendee, token, status }) {
    const statusClasses = status === 'confirmed'
        ? 'inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold bg-emerald-500/15 text-emerald-300'
        : 'inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold bg-amber-500/15 text-amber-300';

    return (
        <GuestLayout>
            <Head title="Registration Success" />

            <div className="mx-auto w-full max-w-md">
                <div className="flex flex-col items-center gap-4 text-center text-slate-300">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20">
                        <svg
                            className="h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-semibold text-white">Registration Confirmed!</h1>
                    <p className="text-sm text-slate-400">Your e-ticket has been generated. Show this at the entrance.</p>
                </div>

                <div className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/95 shadow-[0_40px_120px_rgba(15,23,42,0.45)]">
                    <div className="rounded-t-[32px] bg-violet-500 px-6 py-5 text-white">
                        <div className="text-xs uppercase tracking-[0.24em] text-violet-100/80">E-Ticket</div>
                        <h2 className="mt-2 text-xl font-semibold">{event.title_event}</h2>
                    </div>

                    <div className="p-6 text-slate-300">
                        <div className="grid gap-4 sm:grid-cols-[1.4fr_0.8fr]">
                            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                                <div>
                                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Attendee</div>
                                    <div className="mt-2 text-base font-semibold text-white">{attendee.name}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Email</div>
                                    <div className="mt-2 text-sm text-slate-300">{attendee.email}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Role</div>
                                    <div className="mt-2 text-sm text-slate-300">{attendee.role}</div>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Date</div>
                                        <div className="mt-2 text-sm text-slate-300">{event.date_time_event}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Venue</div>
                                        <div className="mt-2 text-sm text-slate-300">{event.venue}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-slate-950/90 p-4">
                                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-slate-900/95">
                                    <div className="grid h-24 w-24 gap-1 rounded-xl bg-white p-3">
                                        <div className="grid grid-cols-4 gap-1">
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-1">
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-white"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-white"></span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-1">
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-white"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-1">
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                            <span className="block h-3 w-3 bg-slate-950"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Registration ID</p>
                                <p className="mt-2 text-sm text-slate-300">{token}</p>
                            </div>
                            <span className={statusClasses}>
                                {status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button className="flex-1 rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                        Save Ticket
                    </button>
                    <Link
                        href={route('events.register', { event: event.id })}
                        className="flex-1 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                    >
                        Back to Event
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}

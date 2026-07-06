import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function QrScanner() {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('dashboard')}
                        className="rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
                    >
                        ← Back
                    </Link>
                    <div>
                        <h2 className="text-3xl font-semibold text-white">
                            QR Scanner
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="QR Scanner" />

            <div className="px-6 py-8">
                <div className="mx-auto max-w-2xl space-y-6">
                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 px-6 py-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
                        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_45%),_linear-gradient(180deg,_rgba(15,23,42,0.95),_rgba(15,23,42,0.65))] p-8 text-center text-slate-300">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526318472351-bcdd69a4e018?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20"></div>
                            <div className="relative flex h-72 items-center justify-center rounded-[24px] border border-white/10 bg-slate-950/80">
                                <div className="text-center">
                                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl border border-violet-500/20 bg-slate-950 text-violet-300">
                                        <svg
                                            className="h-7 w-7"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7 7H4V4"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17 7H20V4"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M7 17H4V20"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17 17H20V20"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                                        Standby
                                    </p>
                                    <p className="mt-5 text-sm text-slate-400">
                                        Point camera at attendee QR code
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="mt-6 w-full rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                            Simulate QR Scan
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 px-6 py-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
                        <div className="mb-4 text-sm font-semibold text-white">
                            Manual Entry
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                placeholder="Registration ID or QR token..."
                                className="flex-1 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                            />
                            <button className="rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                                Check
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center">
                            <p className="text-3xl font-semibold text-emerald-300">4</p>
                            <p className="mt-2 text-sm text-slate-400">Scanned</p>
                        </div>
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center">
                            <p className="text-3xl font-semibold text-amber-300">3</p>
                            <p className="mt-2 text-sm text-slate-400">Pending</p>
                        </div>
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center">
                            <p className="text-3xl font-semibold text-slate-100">8</p>
                            <p className="mt-2 text-sm text-slate-400">Total</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

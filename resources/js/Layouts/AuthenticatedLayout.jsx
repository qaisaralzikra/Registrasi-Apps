import { Link, usePage } from '@inertiajs/react';

const navItems = [
    {
        name: 'Dashboard',
        href: route('dashboard'),
        routeName: 'dashboard',
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3 13H11V21H3V13Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M13 3H21V21H13V3Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        name: 'Form Builder',
        href: route('form.builder'),
        routeName: 'form.builder',
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 8H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M8 12H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M8 16H12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        name: 'QR Scanner',
        href: route('qr.scanner'),
        routeName: 'qr.scanner',
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3 7V3H7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M17 3H21V7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M3 17V21H7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M17 21H21V17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

export default function AuthenticatedLayout({ header, children }) {
    const event = usePage().props.auth.event;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="flex min-h-screen">
                <aside className="hidden w-72 flex-col border-r border-slate-800 bg-slate-900/95 px-6 py-8 sm:flex">
                    <div className="mb-10 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20">
                            <svg
                                className="h-6 w-6"
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
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-200/80">
                                {event?.title_event ?? 'Event'}
                            </p>
                            <p className="text-xs text-slate-500">Admin portal</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={
                                    'flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ' +
                                    (route().current(item.routeName)
                                        ? 'bg-slate-800 text-white shadow-[0_12px_30px_-20px_rgba(139,92,246,0.8)]'
                                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white')
                                }
                            >
                                <span className="text-slate-400">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto border-t border-slate-800 pt-6">
                        <div className="space-y-2 text-sm text-slate-500">
                            <p className="text-slate-300">Signed in as</p>
                            <p className="font-semibold text-slate-100">{event?.title_event}</p>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            Logout
                        </Link>
                    </div>
                </aside>

                <div className="flex-1">
                    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
                        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                {header}
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('qr.scanner')}
                                    className="inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400"
                                >
                                    <svg
                                        className="h-4 w-4"
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
                                    Scan QR
                                </Link>
                            </div>
                        </div>
                    </header>

                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}

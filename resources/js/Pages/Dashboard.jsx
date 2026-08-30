import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ event, stats, columns, registrants }) {
    const statCards = [
        {
            title: "Total Registered",
            value: String(stats.total),
            subtitle: "registered attendees",
            accent: "bg-violet-500/10 text-violet-300",
        },
        {
            title: "Confirmed",
            value: String(stats.confirmed),
            subtitle: "attendance confirmed",
            accent: "bg-emerald-500/10 text-emerald-300",
        },
        {
            title: "Pending",
            value: String(stats.pending),
            subtitle: "awaiting scan",
            accent: "bg-amber-500/10 text-amber-300",
        },
        {
            title: "Fill Rate",
            value:
                stats.total > 0
                    ? Math.round((stats.confirmed / stats.total) * 100) + "%"
                    : "0%",
            subtitle: "confirmed rate",
            accent: "bg-sky-500/10 text-sky-300",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-white">
                        {event.title_event}
                    </h2>
                    {event.subtitle_event && (
                        <p className="mt-1 text-sm text-slate-400">
                            {event.subtitle_event}
                        </p>
                    )}
                </div>
            }
        >
            <Head title="Dashboard Invitation - Relate House" />

            <div className="min-w-0 max-w-full overflow-x-hidden px-4 py-8 sm:px-6">
                <div className="grid gap-4 lg:grid-cols-4">
                    {statCards.map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-3xl ${stat.accent}`}
                                >
                                    <span className="text-xl">•</span>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                                        {stat.title}
                                    </p>
                                    <p className="mt-3 text-3xl font-semibold text-white">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-slate-400">
                                {stat.subtitle}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 min-w-0 max-w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 p-4 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)] sm:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                Registrants
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Latest attendee registrations and scan status.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative w-full max-w-xs">
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-200 outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                                />
                            </div>
                            <button className="inline-flex items-center justify-center rounded-3xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 min-w-0 max-w-full overflow-hidden rounded-[28px] border border-white/10">
                        <div className="w-full max-w-full overflow-x-auto">
                            <table className="w-max min-w-full divide-y divide-slate-800 text-left text-sm">
                                <thead className="bg-slate-950/80 text-slate-400">
                                    <tr>
                                        <th className="whitespace-nowrap px-6 py-4 uppercase tracking-wider">
                                            ID REGISTRASI
                                        </th>

                                        {columns.map((col) => (
                                            <th
                                                key={col.key}
                                                className="whitespace-nowrap px-6 py-4 uppercase tracking-wider"
                                            >
                                                {col.label}
                                            </th>
                                        ))}

                                        <th className="whitespace-nowrap px-6 py-4 uppercase tracking-wider">
                                            STATUS
                                        </th>

                                        <th className="whitespace-nowrap px-6 py-4 uppercase tracking-wider">
                                            REGISTERED AT
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-800 bg-slate-900/95">
                                    {registrants.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={columns.length + 3}
                                                className="px-6 py-12 text-center text-sm text-slate-500"
                                            >
                                                No registrants yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        registrants.map((registrant, i) => (
                                            <tr
                                                key={i}
                                                className="border-b border-slate-800 last:border-0"
                                            >
                                                <td className="whitespace-nowrap px-6 py-5 text-slate-500">
                                                    {i + 1}
                                                </td>

                                                {columns.map((col) => (
                                                    <td
                                                        key={col.key}
                                                        className="px-6 py-5 text-slate-200"
                                                    >
                                                        <div className="max-w-[220px] truncate">
                                                            {registrant.data[
                                                                col.key
                                                            ] ?? "-"}
                                                        </div>
                                                    </td>
                                                ))}

                                                <td className="whitespace-nowrap px-6 py-5">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                            registrant.status ===
                                                            "confirmed"
                                                                ? "bg-emerald-500/15 text-emerald-300"
                                                                : "bg-amber-500/15 text-amber-300"
                                                        }`}
                                                    >
                                                        {registrant.status}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-5 text-slate-500">
                                                    {registrant.timestamp}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

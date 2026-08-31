import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function RegistrationCreate({ event }) {
    const initialData = event.fields.reduce((acc, field) => {
        acc[field.key] = field.allowMultiple ? [""] : "";
        return acc;
    }, {});

    const { data, setData, post, processing, errors } = useForm(initialData);

    // Fungsi update nilai spesifik untuk field biasa maupun multiple
    const handleValueChange = (key, value, index = 0, isMultiple = false) => {
        if (isMultiple) {
            const currentValues = Array.isArray(data[key])
                ? [...data[key]]
                : [""];
            currentValues[index] = value;
            setData(key, currentValues);
        } else {
            setData(key, value);
        }
    };

    // Fungsi menambah baris jawaban ke-2
    const addAnswerField = (key) => {
        const currentValues = Array.isArray(data[key]) ? [...data[key]] : [""];
        if (currentValues.length < 2) {
            setData(key, [...currentValues, ""]);
        }
    };

    // Fungsi menghapus jawaban ke-2
    const removeAnswerField = (key, index) => {
        const currentValues = Array.isArray(data[key]) ? [...data[key]] : [""];
        if (currentValues.length > 1) {
            currentValues.splice(index, 1);
            setData(key, currentValues);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("events.register.store", { events: event.title_event }));
    };

    // Helper render per input element (Select / Input Standard)
    const renderInput = (field, value, onChangeHandler, index = 0) => {
        if (field.type === "select") {
            return (
                <select
                    value={value}
                    onChange={(e) => onChangeHandler(e.target.value)}
                    className="w-full rounded-3xl border border-white/10 bg-[#0b3558]/60 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                >
                    <option value="">Select your Choice</option>
                    {field.options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                type={field.type}
                value={value}
                onChange={(e) => onChangeHandler(e.target.value)}
                placeholder={
                    field.type === "email"
                        ? "you@company.com"
                        : field.type === "tel"
                          ? "+62 812 3456 7890"
                          : `Enter ${field.label.toLowerCase()}` +
                            (index > 0 ? ` #${index + 1}` : "")
                }
                className="w-full rounded-3xl border border-white/10 bg-[#0b3558]/60 placeholder:text-slate-400 px-4 py-3 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
            />
        );
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
                <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0b3558]/70 shadow-[0_15px_35px_rgba(0,0,0,0.18)] backdrop-blur-md">
                    <div className="rounded-t-[32px] bg-[#99BB1C] px-6 py-5 text-white">
                        <h1 className="text-2xl font-semibold text-white">
                            {event.title_event}
                        </h1>
                        <p className="mt-1 text-sm text-[#012b52]">
                            {event.subtitle_event}
                        </p>
                        <p className="mt-3 text-sm text-[#012b52]">
                            {event.date_time_event} · {event.venue}
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6 p-10 py-16">
                        {event.fields.map((field) => {
                            const answers = field.allowMultiple
                                ? Array.isArray(data[field.key])
                                    ? data[field.key]
                                    : [data[field.key] || ""]
                                : [data[field.key] || ""];

                            return (
                                <div key={field.key}>
                                    <div className="flex items-center gap-[10px]">
                                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                                            <span>
                                                {field.label}
                                                {field.required ? " *" : ""}
                                            </span>
                                        </label>
                                        {/* Tombol Tambah Jawaban (Tampil jika allowMultiple true dan jumlah jawaban < 2) */}
                                        {field.allowMultiple &&
                                            answers.length < 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        addAnswerField(
                                                            field.key,
                                                        )
                                                    }
                                                    className="mb-2 text-xs font-semibold text-[#99BB1C] transition hover:underline"
                                                >
                                                    + Tambah Jawaban Kedua
                                                </button>
                                            )}
                                    </div>

                                    <div className="space-y-3">
                                        {answers.map((val, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="flex-1">
                                                    {renderInput(
                                                        field,
                                                        val,
                                                        (v) =>
                                                            handleValueChange(
                                                                field.key,
                                                                v,
                                                                idx,
                                                                field.allowMultiple,
                                                            ),
                                                        idx,
                                                    )}
                                                </div>
                                                {field.allowMultiple &&
                                                    idx > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeAnswerField(
                                                                    field.key,
                                                                    idx,
                                                                )
                                                            }
                                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-300 transition hover:bg-rose-500/30"
                                                            title="Hapus jawaban"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                            </div>
                                        ))}
                                    </div>

                                    {errors[field.key] && (
                                        <p className="mt-2 text-sm text-rose-400">
                                            {errors[field.key]}
                                        </p>
                                    )}
                                </div>
                            );
                        })}

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

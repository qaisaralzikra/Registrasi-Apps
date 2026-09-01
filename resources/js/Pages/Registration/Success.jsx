import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function RegistrationSuccess({
    event,
    attendeeDetails,
    token,
    status,
}) {
    const ticketRef = useRef(null);
    const [isSaving, setIsSaving] = useState(false);

    const downloadPDF = async () => {
        if (!ticketRef.current) return;

        try {
            setIsSaving(true);

            const dataUrl = await toPng(ticketRef.current, {
                quality: 1,
                pixelRatio: 2,
                cacheBust: true,
                backgroundColor: "#0b3558",
            });

            const img = new Image();

            img.onload = () => {
                const imgWidth = img.width;
                const imgHeight = img.height;

                const pdfWidth = 210; // A4 width in mm
                const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: [pdfWidth, pdfHeight],
                });

                pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

                pdf.save(`E-Ticket-${token}.pdf`);

                setIsSaving(false);
            };

            img.onerror = () => {
                throw new Error("Failed to load ticket image.");
            };

            img.src = dataUrl;
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert("Failed to save ticket as PDF.");
            setIsSaving(false);
        }
    };

    const statusClasses =
        status === "confirmed"
            ? "inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold bg-emerald-500/15 text-emerald-300"
            : "inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold bg-amber-500/15 text-amber-300";

    return (
        <GuestLayout>
            <Head title="Registration Success" />

            <div className="mx-auto w-full max-w-md">
                <div className="flex flex-col items-center gap-4 text-center text-slate-300">
                    <div
                        className="flex h-16 w-16 items-center justify-center rounded-full border border-[#99BB1C]/50
        bg-[#99BB1C]/10 text-[#99BB1C]"
                    >
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
                    <h1 className="text-3xl font-semibold text-white">
                        Pendaftaran Telah Dikonfirmasi!
                    </h1>
                    <p className="text-sm text-slate-400">
                        E-tiket Anda telah diterbitkan. Tunjukkan e-tiket ini di
                        pintu masuk.
                    </p>
                </div>

                <div
                    ref={ticketRef}
                    className="mt-8 overflow-hidden rounded-[32px] border border-white/10
    bg-[#0b3558]/70 shadow-[0_15px_35px_rgba(0,0,0,0.18)]
    backdrop-blur-md"
                >
                    <div className="rounded-t-[32px] bg-[#99BB1C] px-6 py-5 text-white">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#012b52]">
                            E-Ticket
                        </div>
                        <h2 className="mt-2 text-xl font-semibold">
                            {event.title_event}
                        </h2>
                    </div>

                    <div className="p-6 text-slate-300">
                        <div className="flex flex-col gap-[20px]">
                            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#0b3558]/60 p-4">
                                {attendeeDetails.map((detail) => (
                                    <div key={detail.key}>
                                        <div className="text-xs uppercase tracking-[0.24em] text-[#99bb1c]">
                                            {detail.label}
                                        </div>
                                        <div className="mt-2 text-sm font-semibold text-white">
                                            {detail.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#0b3558]/60 p-4">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <div className="text-xs uppercase tracking-[0.24em] text-[#99bb1c]">
                                            Tanggal & Waktu
                                        </div>
                                        <div className="mt-2 text-sm text-white">
                                            {event.hari}, {event.date_time_event} • {event.time} WITA
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-[0.24em] text-[#99bb1c]">
                                            Tempat
                                        </div>
                                        <div className="mt-2 text-sm text-white">
                                            {event.venue}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 rounded-3xl border border-white/10 bg-[#0b3558]/60 p-4 gap-[30px]">
                                {/* qrcode */}
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center rounded-3xl bg-white p-4 shadow-inner">
                                        <QRCodeSVG
                                            value={token}
                                            size={140}
                                            level={"H"}
                                            includeMargin={false}
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <div className="mb-[20px]">
                                        <p className="text-xs uppercase tracking-[0.24em] text-[#99bb1c]">
                                            Token Pendaftaran
                                        </p>
                                        <p className="mt-2 text-sm text-white">
                                            {token}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={downloadPDF}
                                        disabled={isSaving}
                                        className="
        flex-1
        rounded-[12px]
        bg-[#99BB1C]
        px-6
        py-[6px]
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-[#99BB1C]/80
        disabled:cursor-not-allowed
        disabled:opacity-50
    "
                                    >
                                        {isSaving ? "Menyimpan..." : "Simpan Tiket"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href={route("user", {
                            event: event.title_event,
                        })}
                        className="flex-1 text-center rounded-3xl bg-[#99BB1C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#99BB1C]/80"
                    >
                        Kembali ke Acara
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}

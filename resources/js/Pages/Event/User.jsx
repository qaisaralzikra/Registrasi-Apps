import {
    CalendarDays,
    MapPin,
    Users,
    QrCode,
    ChevronRight,
    Shield,
} from "lucide-react";

import { Link, Head } from "@inertiajs/react";

import { QRCodeSVG } from "qrcode.react";

function InfoItem({ icon: Icon, label, children }) {
    return (
        <div className="flex items-start gap-2.5">
            {/* Icon */}
            <div className="mt-0.5 flex w-3.5 min-w-3.5 justify-center text-[#99BB1C]">
                <Icon
                    className="h-[18px] w-[18px] sm:h-[19px] sm:w-[19px] md:h-5 md:w-5"
                    strokeWidth={1.8}
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5">
                <span className="text-[11px] leading-tight text-slate-500 sm:text-[12px]">
                    {label}
                </span>

                <strong className="text-[12px] font-semibold leading-relaxed text-slate-100 sm:text-[13px] md:text-[14px]">
                    {children}
                </strong>
            </div>
        </div>
    );
}

function User({ event }) {
    const registrationUrl =
        "https://invitation.relatehouse.id/events/BUSINESS%20CONNECTION%20INDONESIA%20-%20CHINA/register";

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#012b52] text-white">
            <Head title="Digital Invitation - Relate House" />
            {/* =====================================================
          HERO BACKGROUND
      ====================================================== */}

            {/* bg-[linear-gradient(
                to_bottom,
                rgba(1,54,104,0.25)_0%,
                rgba(1,54,104,0.40)_35%,
                rgba(1,54,104,0.70)_70%,
                #013668_100%
            )] */}

            <img
                src="/assets/BG WEB.png"
                alt=""
                className="
        block h-[160px]
        sm:h-auto
        w-full
        object-cover
        object-center
    "
            />

            {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

            <main
                className="
        relative z-10
        mx-auto
        -mt-[50px]
        w-full max-w-[820px]
        px-6
        pb-10
        sm:-mt-[70px]
        md:-mt-[100px]
        lg:-mt-[150px]
    "
            >
                {/* =====================================================
            EVENT HEADING
        ====================================================== */}

                <section className="mb-[14px]">
                    {/* Registration Badge */}
                    <div
                        className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#99BB1C]/50
        bg-[#99BB1C]/10
        px-2.5
        py-1
        text-[10px]
        font-bold
        tracking-[0.8px]
        text-[#99BB1C]
        sm:text-[11px]
        md:text-[12px]
    "
                    >
                        <span
                            className="
            h-1.5
            w-1.5
            rounded-full
            bg-[#99BB1C]
            shadow-[0_0_8px_rgba(153,187,28,0.8)]
        "
                        />
                        REGISTRATION OPEN
                    </div>
                </section>

                {/* =====================================================
            CONTENT GRID
        ====================================================== */}

                <section
                    className="
            grid grid-cols-1
            sm:grid-cols-[minmax(0,1fr)_250px]
            items-start
            gap-5
          "
                >
                    {/* =================================================
              LEFT COLUMN
          ================================================== */}

                    <div className="flex flex-col gap-3.5">
                        {/* =================================================
                  EVENT DETAILS
              ================================================== */}

                        <div
                            className="
        rounded-[13px]
        border
        border-white/10
        bg-[#012d56]/95
        p-5
        shadow-[0_15px_35px_rgba(0,0,0,0.18)]
        backdrop-blur-md
    "
                        >
                            <h2 className="text-[16px] font-bold text-slate-100 sm:text-[17px] md:text-[18px]">
                                Event Details
                            </h2>

                            <div className="mt-4 flex flex-col gap-3.5">
                                <InfoItem
                                    icon={CalendarDays}
                                    label="Date & Time"
                                >
                                    {event.hari}, {event.date} · {event.time}{" "}
                                    WITA
                                </InfoItem>

                                <InfoItem icon={MapPin} label="Venue">
                                    {event.venue}
                                </InfoItem>
                            </div>
                        </div>

                        {/* =================================================
                  ABOUT EVENT
              ================================================== */}

                        <div
                            className="
        rounded-[13px]
        border
        border-white/10
        bg-[#012d56]/95
        p-5
        shadow-[0_15px_35px_rgba(0,0,0,0.18)]
        backdrop-blur-md
    "
                        >
                            <h2 className="text-[16px] font-bold text-slate-100 sm:text-[17px] md:text-[18px]">
                                About This Event
                            </h2>

                            <p
                                className="
        mt-3
        text-[12px]
        leading-[1.65]
        text-slate-400
        text-justify
        sm:text-[13px]
        md:text-[14px]
        md:leading-[1.7]
    "
                            >
                                {event.desc_event}
                            </p>
                        </div>
                    </div>

                    {/* =================================================
              RIGHT COLUMN
          ================================================== */}

                    <div className="flex flex-col">
                        {/* =================================================
                  QR CARD
              ================================================== */}

                        <div
                            className="
        flex
        min-h-[307px]
        gap-[8px]
        flex-col
        items-center
        rounded-[13px]
        border
        border-white/10
        bg-[#012d56]/95
        px-4
        py-5
        text-center
        shadow-[0_15px_35px_rgba(0,0,0,0.18)]
        backdrop-blur-md
    "
                        >
                            {/* QR Icon */}
                            <div
                                className="
        mb-2.5
        flex
        h-[33px]
        w-[33px]
        items-center
        justify-center
        rounded-[10px]
        bg-[#99BB1C]/10
        text-[#99BB1C]
    "
                            >
                                <QrCode size={20} />
                            </div>

                            {/* Title */}
                            <h2 className="text-[16px] font-bold text-slate-100">
                                Scan to Register
                            </h2>

                            {/* Description */}
                            <p
                                className="
        my-2
        text-[11px]
        leading-[1.45]
        text-slate-500
        sm:text-[11px]
        md:text-[12px]
    "
                            >
                                Scan this QR code at the venue or register
                                online below
                            </p>

                            {/* QR */}
                            <div
                                className="
                    flex
                    h-[130px]
                    w-[130px]
                    items-center
                    justify-center
                    rounded-[14px]
                    bg-white
                    p-1.5
                    shadow-[0_5px_20px_rgba(0,0,0,0.2)]
                  "
                            >
                                <QRCodeSVG
                                    value={registrationUrl}
                                    size={118}
                                    bgColor="#ffffff"
                                    fgColor="#013668"
                                    level="H"
                                />
                            </div>

                            <span
                                className="
        mt-2.5
        font-mono
        text-[10px]
        tracking-[0.5px]
        text-slate-500
        sm:text-[11px]
    "
                            >
                                Maximum of two participants.
                            </span>
                            {/* Event Code */}
                            <span
                                className="
        mt-2.5
        font-mono
        text-[10px]
        tracking-[0.5px]
        text-slate-500
        sm:text-[11px]
    "
                            >
                                EXP Thursday-10-September-2026
                            </span>
                        </div>

                        {/* =================================================
                  REGISTER BUTTON
              ================================================== */}

                        <Link
                            href={`/events/${event.title_event}/register`}
                            type="button"
                            className="
        mt-3.5
        flex
        h-10
        w-full
        items-center
        justify-center
        gap-1
        rounded-[11px]
        border-0
        bg-[#99BB1C]
        text-[13px]
        font-bold
        text-[#013668]
        shadow-[0_8px_20px_rgba(153,187,28,0.25)]
        transition
        hover:-translate-y-px
        hover:bg-[#a9ca25]
        hover:shadow-[0_11px_25px_rgba(153,187,28,0.35)]
        active:translate-y-0
        sm:text-[14px]
    "
                        >
                            Register Now
                            <ChevronRight size={17} strokeWidth={2.3} />
                        </Link>

                        {/* Payment */}
                        <span
                            className="
        mt-2.5
        text-center
        text-[10px]
        text-slate-600
        sm:text-[11px]
    "
                        >
                            Free · No payment required
                        </span>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default User;

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

export default function QrScanner() {
    const [scanResult, setScanResult] = useState(null);

    // Inertia form untuk mengirim token ke backend
    const { data, setData, post, processing, reset } = useForm({
        token: '',
    });

    // Fungsi untuk mengirim data token ke backend
    const handleVerifyToken = (tokenToVerify) => {
        setData('token', tokenToVerify);
        
        // Kirim request POST ke route backend '/qr-scanner/verify'
        post(route('qr.verify'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('token');
            },
        });
    };

    // Inisialisasi Kamera Scanner menggunakan html5-qrcode
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader", 
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        scanner.render(
            (decodedText) => {
                // Ketika QR code berhasil terbaca oleh kamera
                setScanResult(decodedText);
                scanner.clear(); // Hentikan sementara scanner agar tidak spam
                handleVerifyToken(decodedText);
            },
            (error) => {
                // Error kecil saat mencari QR code di frame (biarkan kosong agar tidak mengganggu console)
            }
        );

        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (!data.token) return;
        handleVerifyToken(data.token);
    };

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
            <Head title="QR Scanner - Relate House" />

            <div className="px-6 py-8">
                <div className="mx-auto max-w-2xl space-y-6">
                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 px-6 py-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
                        
                        {/* Area Kamera Asli */}
                        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 p-4 text-center text-slate-300">
                            <div id="reader" className="overflow-hidden rounded-2xl"></div>
                            {scanResult && (
                                <p className="mt-4 text-sm text-emerald-400">
                                    Last Scanned Token: <span className="font-mono font-bold">{scanResult}</span>
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Manual Entry */}
                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 px-6 py-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
                        <div className="mb-4 text-sm font-semibold text-white">
                            Manual Entry
                        </div>
                        <form onSubmit={handleManualSubmit} className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                value={data.token}
                                onChange={(e) => setData('token', e.target.value)}
                                placeholder="Registration ID or QR token..."
                                className="flex-1 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-violet-300 focus:ring-violet-500/20"
                            />
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:opacity-50"
                            >
                                {processing ? 'Checking...' : 'Check'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
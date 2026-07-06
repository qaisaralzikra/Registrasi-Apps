export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </div>
    );
}

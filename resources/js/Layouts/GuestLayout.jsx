import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Panel - Branding & Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-orange-500 to-amber-500">
                <div className="absolute inset-0 bg-black/10" />
                
                {/* Decorative shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-12 right-12 w-64 h-64 rounded-full bg-white/10 blur-2xl"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-center px-16 text-white h-full w-full">
                    <Link href="/" className="mb-12 inline-block">
                        <div className="flex items-center gap-3">
                            <ApplicationLogo className="h-12 w-12 text-white fill-current" />
                            <span className="text-3xl font-extrabold tracking-tight">BlitarHub</span>
                        </div>
                    </Link>
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                        Wujudkan Potensimu <br/> Bersama Kami.
                    </h1>
                    <p className="text-lg text-orange-50/90 font-medium max-w-md leading-relaxed">
                        Platform terbaik untuk menghubungkan Talent, Mentor, dan Kolaborator. Temukan peluang baru dan bangun masa depanmu.
                    </p>
                </div>
            </div>

            {/* Right Panel - Form Area */}
            <div className="flex w-full lg:w-1/2 flex-col justify-center py-12 px-8 sm:px-16 md:px-24 xl:px-32 relative">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-8 left-8">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="h-8 w-8 text-orange-500 fill-current" />
                        <span className="text-xl font-bold text-gray-900 tracking-tight">BlitarHub</span>
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

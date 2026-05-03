import { usePage } from '@inertiajs/react';
import ChatWidget from '@/Components/ChatWidget';
import Navbar from '@/Components/Navbar';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {header && (
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            {/* ChatWidget handles its own auth check internally */}
            <ChatWidget />
        </div>
    );
}

import { Head, Link } from '@inertiajs/react';

export default function Show({ campaign }) {
    const progress = Math.min(100, Math.round((campaign.current_amount / campaign.target_amount) * 100));

    return (
        <>
            <Head title={`${campaign.title} | Scholarship Hub`} />
            <div className="min-h-screen bg-gray-100 font-sans">
                                <nav className="bg-white shadow-sm py-3 px-6 sticky top-0 z-50">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <Link href={route('home')} className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
                            <span className="font-extrabold text-lg text-orange-600 tracking-tight">BlitarHub<span className="text-gray-900">.</span></span>
                        </Link>
                        <div className="space-x-5 font-medium text-gray-600 hidden md:flex items-center text-sm">
                            <Link href={route('talents.index')} className="hover:text-blue-600 transition">Talent Hub</Link>
                            <Link href={route('mentorships.index')} className="hover:text-blue-600 transition">Mentorships</Link>
                            <Link href={route('scholarships.index')} className="text-orange-600 font-semibold">Scholarships</Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-5xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Campaign Header */}
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                                <div className="h-56 bg-gradient-to-br from-blue-400 via-blue-500 to-orange-400 flex items-center justify-center relative">
                                    <div className="absolute top-4 right-4 bg-white/90 px-4 py-1.5 rounded-full text-sm font-bold text-gray-700 shadow backdrop-blur-sm">
                                        ⏳ {campaign.days_left} Hari Lagi
                                    </div>
                                    <div className="text-white text-center">
                                        <div className="text-5xl mb-2">🎓</div>
                                        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">{campaign.category}</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">{campaign.title}</h1>
                                    <p className="text-sm text-gray-500 mb-6">Oleh: <span className="font-bold text-blue-600">{campaign.organizer}</span></p>

                                    {/* Progress */}
                                    <div className="mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-bold text-gray-900">Rp {campaign.current_amount.toLocaleString()}</span>
                                            <span className="text-sm text-gray-500">dari Rp {campaign.target_amount.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                            <div className="bg-gradient-to-r from-blue-500 to-orange-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between mt-3 text-sm text-gray-500">
                                            <span><strong className="text-gray-900">{progress}%</strong> tercapai</span>
                                            <span><strong className="text-gray-900">{campaign.donors.toLocaleString()}</strong> donatur</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all">
                                        💝 Donasi Sekarang
                                    </button>
                                </div>
                            </div>

                            {/* Cerita */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">📖</span>Cerita Campaign
                                </h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{campaign.description}</p>
                                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <p className="text-sm text-gray-700"><span className="font-bold">Penerima Manfaat:</span> <span className="text-blue-600 font-bold">{campaign.beneficiary}</span></p>
                                </div>
                            </div>

                            {/* Update / Kabar Terbaru */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">📢</span>Kabar Terbaru
                                </h2>
                                <div className="space-y-4">
                                    {campaign.updates?.map((u, i) => (
                                        <div key={i} className="flex space-x-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5"></div>
                                                {i < campaign.updates.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1"></div>}
                                            </div>
                                            <div className="pb-6">
                                                <p className="text-xs text-gray-400 font-bold mb-1">{u.date}</p>
                                                <p className="text-sm text-gray-700 leading-relaxed">{u.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Donasi Masuk */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-gray-900">Donatur ({campaign.donors})</h2>
                                    <span className="flex w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                </div>
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                                    {campaign.donor_list?.map((d, i) => (
                                        <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                                                        {d.name === 'Anonim' ? '?' : d.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm text-gray-900">{d.name}</div>
                                                        <div className="text-[10px] text-gray-400">{d.time}</div>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-bold text-blue-600">Rp {d.amount.toLocaleString()}</div>
                                            </div>
                                            {d.message && (
                                                <p className="text-xs text-gray-500 italic ml-10 mt-1 bg-gray-50 p-2 rounded-lg">"{d.message}"</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Donate */}
                            <div className="bg-blue-600 rounded-2xl shadow-sm p-6 text-white">
                                <h2 className="text-lg font-bold mb-3">Pilih Nominal</h2>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {[25000, 50000, 100000, 250000, 500000, 1000000].map(amt => (
                                        <button key={amt} className="bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-xl font-bold text-sm transition backdrop-blur-sm">
                                            Rp {amt.toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                                <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
                                    Donasi Sekarang
                                </button>
                            </div>

                            {/* Share */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 text-center">
                                <h2 className="text-lg font-bold text-gray-900 mb-2">Bantu Sebarkan</h2>
                                <p className="text-sm text-gray-500 mb-4">Berbagi kebaikan itu gratis!</p>
                                <div className="flex justify-center space-x-3">
                                    <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm hover:scale-110 transition">W</button>
                                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm hover:scale-110 transition">F</button>
                                    <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold text-sm hover:scale-110 transition">T</button>
                                    <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-sm hover:scale-110 transition">🔗</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <Link href={route('scholarships.index')} className="text-orange-600 font-semibold hover:underline">← Kembali ke Scholarship Hub</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

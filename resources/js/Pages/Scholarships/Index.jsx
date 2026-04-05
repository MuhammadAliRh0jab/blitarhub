import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

const CATS = ['Semua', 'Pendidikan Tinggi', 'Pendidikan Vokasi', 'Infrastruktur Pendidikan', 'Peralatan Belajar'];

export default function Index({ campaigns }) {
    const [query, setQuery]       = useState('');
    const [category, setCategory] = useState('Semua');
    const [sortBy, setSortBy]     = useState('urgency');

    const filtered = useMemo(() => {
        let result = campaigns ?? [];

        if (query.trim()) {
            const q = query.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(q) ||
                c.beneficiary.toLowerCase().includes(q) ||
                c.category?.toLowerCase().includes(q)
            );
        }

        if (category !== 'Semua') {
            result = result.filter(c => c.category === category);
        }

        if (sortBy === 'urgency')  result = [...result].sort((a, b) => a.days_left - b.days_left);
        if (sortBy === 'progress') result = [...result].sort((a, b) => (b.current_amount / b.target_amount) - (a.current_amount / a.target_amount));
        if (sortBy === 'donors')   result = [...result].sort((a, b) => b.donors - a.donors);

        return result;
    }, [campaigns, query, category, sortBy]);

    return (
        <>
            <Head title="Scholarship Hub | BlitarHub" />
            <div className="min-h-screen bg-gray-50 font-sans">
                <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link href={route('home')} className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
                            <span className="font-extrabold text-xl text-orange-600 tracking-tight">BlitarHub<span className="text-gray-900">.</span></span>
                        </Link>
                        <div className="space-x-6 font-medium text-gray-600 hidden md:flex items-center">
                            <Link href={route('talents.index')} className="hover:text-orange-600 transition">Talent Hub</Link>
                            <Link href={route('mentorships.index')} className="hover:text-orange-600 transition">Mentorships</Link>
                            <Link href={route('scholarships.index')} className="text-orange-600 font-semibold">Scholarships</Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Scholarship Hub</h1>
                        <p className="text-gray-500 mt-2 text-lg">Bantu wujudkan mimpi pendidikan <strong>{campaigns?.length ?? 0}</strong> penerima manfaat.</p>
                    </div>

                    {/* Search & Filter */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100">
                        <div className="flex gap-3 mb-4">
                            <div className="relative flex-1">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Cari campaign atau penerima (contoh: beasiswa, PAUD, laptop)..."
                                    className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 bg-gray-50 transition text-sm"
                                />
                                {query && (
                                    <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
                                )}
                            </div>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:border-orange-500 bg-gray-50"
                            >
                                <option value="urgency">⏳ Segera Berakhir</option>
                                <option value="progress">📊 Progress Tertinggi</option>
                                <option value="donors">👥 Donatur Terbanyak</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {CATS.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${
                                        category === cat
                                            ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-rose-400 hover:text-rose-600'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 font-medium">
                        Menampilkan <strong className="text-gray-700">{filtered.length}</strong> dari {campaigns?.length} campaign
                        {query && <span> untuk "<em className="text-rose-600">{query}</em>"</span>}
                    </p>

                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <div className="text-5xl mb-4">🔍</div>
                            <p className="text-lg font-semibold">Tidak ada campaign yang cocok</p>
                            <button onClick={() => { setQuery(''); setCategory('Semua'); }} className="mt-4 text-rose-600 font-semibold hover:underline">Reset pencarian</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((campaign) => {
                                const progress = Math.min(100, Math.round((campaign.current_amount / campaign.target_amount) * 100));
                                const isUrgent = campaign.days_left <= 7;
                                return (
                                    <Link key={campaign.id} href={route('scholarships.show', campaign.id)} className="block group">
                                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                            <div className={`h-44 flex flex-col items-center justify-center relative overflow-hidden ${isUrgent ? 'bg-gradient-to-tr from-rose-400 via-orange-400 to-amber-300' : 'bg-gradient-to-tr from-orange-300 via-amber-300 to-yellow-200'}`}>
                                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm ${isUrgent ? 'bg-red-600 text-white animate-pulse' : 'bg-white/90 text-gray-700'}`}>
                                                    ⏳ {campaign.days_left} Hari Lagi
                                                </div>
                                                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-600">{campaign.category}</div>
                                                <div className="text-4xl">🎓</div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight">{campaign.title}</h3>
                                                <p className="text-sm text-gray-500 mb-5">Untuk: <span className="font-bold text-orange-600">{campaign.beneficiary}</span></p>
                                                <div className="mt-auto">
                                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                                                        <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                                                    </div>
                                                    <div className="flex justify-between text-xs mb-4">
                                                        <span><strong className="text-gray-900">{progress}%</strong> <span className="text-gray-400">tercapai</span></span>
                                                        <span className="text-gray-500">Rp {campaign.current_amount.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                                                        <span>👥 <strong className="text-gray-700">{campaign.donors.toLocaleString()}</strong> donatur</span>
                                                        <span>🎯 Rp {campaign.target_amount.toLocaleString()}</span>
                                                    </div>
                                                    <span className="block w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-center text-sm group-hover:bg-orange-700 transition shadow-sm">
                                                        💝 Donasi Sekarang
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

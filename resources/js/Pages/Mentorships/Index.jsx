import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

const EXPERTISE_CATS = ['Semua', 'Engineering', 'Product', 'Business', 'Research', 'Design', 'Academic'];
const expertiseMap = {
    'Engineering': ['engineer', 'developer', 'devops', 'cloud', 'cto', 'tech', 'software', 'backend', 'frontend'],
    'Product':     ['product', 'pm', 'ux', 'ui'],
    'Business':    ['business', 'consultant', 'strategy', 'advisor', 'entrepreneur'],
    'Research':    ['research', 'researcher', 'scientist', 'academic'],
    'Design':      ['design', 'ux', 'ui', 'creative'],
    'Academic':    ['profesor', 'dosen', 'lecturer', 'academic', 'phd', 'doctor'],
};

export default function Index({ mentors }) {
    const [query, setQuery]       = useState('');
    const [category, setCategory] = useState('Semua');
    const [sortBy, setSortBy]     = useState('rating');

    const filtered = useMemo(() => {
        let result = mentors ?? [];

        if (query.trim()) {
            const q = query.toLowerCase();
            result = result.filter(m =>
                m.name.toLowerCase().includes(q) ||
                m.company.toLowerCase().includes(q) ||
                m.expertise.toLowerCase().includes(q) ||
                m.location?.toLowerCase().includes(q) ||
                m.programs?.some(p => p.title.toLowerCase().includes(q))
            );
        }

        if (category !== 'Semua') {
            const keys = expertiseMap[category] ?? [];
            result = result.filter(m =>
                keys.some(k => m.expertise.toLowerCase().includes(k))
            );
        }

        if (sortBy === 'rating')  result = [...result].sort((a, b) => b.rating - a.rating);
        if (sortBy === 'mentees') result = [...result].sort((a, b) => b.mentees - a.mentees);

        return result;
    }, [mentors, query, category, sortBy]);

    return (
        <>
            <Head title="Mentorship Hub | BlitarHub" />
            <div className="min-h-screen bg-gray-50 font-sans">
                <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link href={route('home')} className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
                            <span className="font-extrabold text-xl text-orange-600 tracking-tight">BlitarHub<span className="text-gray-900">.</span></span>
                        </Link>
                        <div className="space-x-6 font-medium text-gray-600 hidden md:flex items-center">
                            <Link href={route('talents.index')} className="hover:text-orange-600 transition">Talent Hub</Link>
                            <Link href={route('mentorships.index')} className="text-orange-600 font-semibold">Mentorships</Link>
                            <Link href={route('scholarships.index')} className="hover:text-orange-600 transition">Scholarships</Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Mentorship Hub</h1>
                        <p className="text-gray-500 mt-2 text-lg">Belajar dari <strong>{mentors?.length ?? 0}</strong> mentor profesional terbaik Indonesia.</p>
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
                                    placeholder="Cari mentor, perusahaan, atau program (contoh: Product Manager, Google)..."
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
                                <option value="rating">⭐ Rating Tertinggi</option>
                                <option value="mentees">👥 Mentees Terbanyak</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {EXPERTISE_CATS.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${
                                        category === cat
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 font-medium">
                        Menampilkan <strong className="text-gray-700">{filtered.length}</strong> dari {mentors?.length} mentor
                        {query && <span> untuk "<em className="text-blue-600">{query}</em>"</span>}
                    </p>

                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <div className="text-5xl mb-4">🔍</div>
                            <p className="text-lg font-semibold">Tidak ada mentor yang cocok</p>
                            <button onClick={() => { setQuery(''); setCategory('Semua'); }} className="mt-4 text-blue-600 font-semibold hover:underline">Reset pencarian</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filtered.map((mentor) => (
                                <Link key={mentor.id} href={route('mentorships.show', mentor.id)} className="block group">
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                        <div className="p-8 flex-1">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">
                                                        {mentor.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                                                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded inline-block mt-1 font-bold">{mentor.company}</span>
                                                    </div>
                                                </div>
                                                <div className="bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                                    <div className="text-amber-500 text-sm font-bold">⭐ {mentor.rating}</div>
                                                </div>
                                            </div>
                                            <p className="text-blue-600 font-semibold text-sm mb-1">{mentor.expertise}</p>
                                            <p className="text-xs text-gray-400 mb-5">📍 {mentor.location}</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Program:</span>
                                                    <span className="text-xs text-gray-400">{mentor.mentees} mentees lulus</span>
                                                </div>
                                                {mentor.programs?.slice(0, 2).map(p => (
                                                    <div key={p.id} className="bg-gray-50 border border-gray-100 px-3 py-2.5 rounded-xl flex justify-between items-center">
                                                        <span className="text-xs font-semibold text-gray-800 truncate pr-2">{p.title}</span>
                                                        <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md whitespace-nowrap">{p.price}</span>
                                                    </div>
                                                ))}
                                                {mentor.programs?.length > 2 && (
                                                    <p className="text-xs text-gray-400 text-center">+{mentor.programs.length - 2} program lainnya</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                                            <span className="text-sm text-gray-400 font-medium group-hover:text-blue-600 transition">Lihat Profil →</span>
                                            <span className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold group-hover:bg-blue-600 transition">Booking</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

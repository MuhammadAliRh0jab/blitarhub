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

import Navbar from '@/Components/Navbar';

export default function Index({ auth, mentors }) {
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
                <Navbar />

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
                            <button onClick={() => { setQuery(''); setCategory('Semua'); }} className="mt-4 text-orange-600 font-semibold hover:underline">Reset pencarian</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filtered.map((mentor) => (
                                <Link key={mentor.id} href={route('mentorships.show', mentor.id)} className="block group">
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                        {/* Cover Photo */}
                                        <div className="h-28 relative overflow-hidden">
                                            {mentor.cover_url ? (
                                                <img
                                                    src={mentor.cover_url}
                                                    alt="Cover"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                        </div>

                                        <div className="px-6 pb-5">
                                            {/* Avatar + name header */}
                                            <div className="flex items-end -mt-8 mb-4 gap-4 relative z-10">
                                                <div className="shrink-0">
                                                    {mentor.avatar_url
                                                        ? <img src={mentor.avatar_url} alt={mentor.name} className="w-16 h-16 rounded-2xl border-4 border-white object-cover shadow-md" />
                                                        : <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl border-4 border-white flex items-center justify-center font-bold text-2xl shadow-md">
                                                            {mentor.name.charAt(0)}
                                                          </div>
                                                    }
                                                </div>
                                                <div className="flex-1 min-w-0 pb-1">
                                                    <h3 className="text-base font-bold text-gray-900 leading-tight truncate">{mentor.name}</h3>
                                                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded inline-block mt-0.5 font-semibold">{mentor.company}</span>
                                                </div>
                                                <div className="pb-1 shrink-0">
                                                    <div className="bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                                        <div className="text-amber-500 text-sm font-bold">⭐ {mentor.rating}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-blue-600 font-semibold text-sm mb-1">{mentor.expertise}</p>
                                            <p className="text-xs text-gray-400 mb-4">📍 {mentor.location}</p>

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

                                        <div className="mt-auto px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                                            <span className="text-sm text-gray-400 font-medium group-hover:text-orange-600 transition">Lihat Profil →</span>
                                            <span className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold group-hover:bg-orange-600 transition">Booking</span>
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

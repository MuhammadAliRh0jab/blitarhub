import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

const CATEGORIES = ['Semua', 'Development', 'Design', 'Marketing', 'Data & AI', 'DevOps', 'Blockchain', 'Creative', 'Management'];

const categoryMap = {
    'Development': ['React','Vue','Laravel','Node.js','Flutter','Golang','TypeScript','PHP','Python','Dart','gRPC','Kubernetes','Docker'],
    'Design':      ['Figma','UI/UX','Prototyping','Design System','Framer','Illustrator','Photoshop','Procreate','Branding','Motion Graphics'],
    'Marketing':   ['SEO','Google Ads','Meta Ads','Copywriting','Analytics','Content Strategy','Social Media'],
    'Data & AI':   ['Python','TensorFlow','Scikit-learn','SQL','Tableau','Machine Learning','Data Science'],
    'DevOps':      ['AWS','Terraform','CI/CD','Linux','Ansible','Kubernetes','Docker'],
    'Blockchain':  ['Solidity','Ethereum','Web3.js','Hardhat','NFT','DeFi'],
    'Creative':    ['Copywriting','Canva','Motion Graphics','Ilustrasi','Video Editing','Procreate'],
    'Management':  ['Scrum','Jira','Project Planning','Agile','Stakeholder Management','PMP'],
};

export default function Index({ talents }) {
    const [query, setQuery]       = useState('');
    const [category, setCategory] = useState('Semua');
    const [sortBy, setSortBy]     = useState('rating');

    const filtered = useMemo(() => {
        let result = talents ?? [];

        // Filter by search query
        if (query.trim()) {
            const q = query.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(q) ||
                t.headline.toLowerCase().includes(q) ||
                t.skills?.some(s => s.toLowerCase().includes(q)) ||
                t.location?.toLowerCase().includes(q)
            );
        }

        // Filter by category
        if (category !== 'Semua') {
            const catSkills = categoryMap[category] ?? [];
            result = result.filter(t =>
                t.skills?.some(s => catSkills.map(c => c.toLowerCase()).includes(s.toLowerCase()))
            );
        }

        // Sort
        if (sortBy === 'rating')  result = [...result].sort((a, b) => b.rating - a.rating);
        if (sortBy === 'jobs')    result = [...result].sort((a, b) => b.jobs_completed - a.jobs_completed);
        if (sortBy === 'reviews') result = [...result].sort((a, b) => b.reviews - a.reviews);

        return result;
    }, [talents, query, category, sortBy]);

    return (
        <>
            <Head title="Talent Hub | BlitarHub" />
            <div className="min-h-screen bg-gray-50 font-sans">
                {/* Navbar */}
                <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link href={route('home')} className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
                            <span className="font-extrabold text-xl text-orange-600 tracking-tight">BlitarHub<span className="text-gray-900">.</span></span>
                        </Link>
                        <div className="space-x-6 font-medium text-gray-600 hidden md:flex items-center">
                            <Link href={route('talents.index')} className="text-orange-600 font-semibold">Talent Hub</Link>
                            <Link href={route('mentorships.index')} className="hover:text-orange-600 transition">Mentorships</Link>
                            <Link href={route('scholarships.index')} className="hover:text-orange-600 transition">Scholarships</Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Talent Hub</h1>
                        <p className="text-gray-500 mt-2 text-lg">Temukan <strong>{talents?.length ?? 0}</strong> profesional terverifikasi untuk proyek Anda.</p>
                    </div>

                    {/* Search & Filter */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100">
                        {/* Search bar */}
                        <div className="flex gap-3 mb-4">
                            <div className="relative flex-1">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Cari nama, skill, atau lokasi (contoh: React, Blitar, Flutter)..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 bg-gray-50 transition text-sm"
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
                                <option value="jobs">💼 Proyek Terbanyak</option>
                                <option value="reviews">💬 Ulasan Terbanyak</option>
                            </select>
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${
                                        category === cat
                                            ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-600'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="text-sm text-gray-400 mb-4 font-medium">
                        Menampilkan <strong className="text-gray-700">{filtered.length}</strong> dari {talents?.length} talent
                        {query && <span> untuk "<em className="text-orange-600">{query}</em>"</span>}
                    </p>

                    {/* Grid */}
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <div className="text-5xl mb-4">🔍</div>
                            <p className="text-lg font-semibold">Tidak ada talent yang cocok</p>
                            <p className="text-sm mt-2">Coba kata kunci lain atau hapus filter</p>
                            <button onClick={() => { setQuery(''); setCategory('Semua'); }} className="mt-4 text-orange-600 font-semibold hover:underline">Reset pencarian</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((talent) => (
                                <Link key={talent.id} href={route('talents.show', talent.id)} className="block group">
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="h-24 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500"></div>
                                        <div className="px-5 pb-5">
                                            <div className="flex justify-center -mt-10 mb-3">
                                                <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl shadow-md group-hover:shadow-lg transition">
                                                    {talent.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="text-center mb-4">
                                                <h3 className="text-base font-bold text-gray-900 leading-tight">{talent.name}</h3>
                                                <p className="text-xs font-semibold text-orange-600 mt-1">{talent.headline}</p>
                                                <p className="text-xs text-gray-400 mt-1">📍 {talent.location}</p>
                                            </div>
                                            <div className="flex justify-center space-x-3 mb-4 text-xs">
                                                <span className="bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-full border border-amber-100">⭐ {talent.rating}</span>
                                                <span className="bg-gray-50 text-gray-600 font-semibold px-3 py-1 rounded-full border border-gray-100">💼 {talent.jobs_completed}</span>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                                                {talent.skills?.slice(0, 4).map((skill, i) => (
                                                    <span key={i} className="px-2 py-0.5 text-[11px] font-bold bg-orange-50 text-orange-700 rounded-full border border-orange-100">{skill}</span>
                                                ))}
                                                {talent.skills?.length > 4 && <span className="px-2 py-0.5 text-[11px] font-bold bg-gray-100 text-gray-500 rounded-full">+{talent.skills.length - 4}</span>}
                                            </div>
                                            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                                                <span className="text-xs text-gray-400 font-medium group-hover:text-orange-600 transition">Lihat Profil →</span>
                                                <span className="text-xs font-bold bg-gray-900 text-white px-4 py-1.5 rounded-full group-hover:bg-orange-600 transition">Hire</span>
                                            </div>
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

import { Head, Link } from '@inertiajs/react';

export default function Show({ talent }) {
    return (
        <>
            <Head title={`${talent.name} | BlitarHub`} />
            <div className="min-h-screen bg-gray-100 font-sans">
                {/* Navbar */}
                <nav className="bg-white shadow-sm py-3 px-6 sticky top-0 z-50">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <Link href={route('home')} className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
                            <span className="font-extrabold text-lg text-orange-600 tracking-tight">BlitarHub<span className="text-gray-900">.</span></span>
                        </Link>
                        <div className="space-x-5 font-medium text-gray-600 hidden md:flex items-center text-sm">
                            <Link href={route('talents.index')} className="text-orange-600 font-semibold">Talent Hub</Link>
                            <Link href={route('mentorships.index')} className="hover:text-orange-600 transition">Mentorships</Link>
                            <Link href={route('scholarships.index')} className="hover:text-orange-600 transition">Scholarships</Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-5xl mx-auto px-4 py-6">
                    {/* Profile Card Header */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 mb-6">
                        {/* Cover */}
                        <div className="h-48 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 relative">
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        {/* Profile Info */}
                        <div className="px-8 pb-8 relative">
                            <div className="flex items-end -mt-16 mb-6">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-5xl shadow-xl flex-shrink-0">
                                    {talent.name.charAt(0)}
                                </div>
                                <div className="ml-6 pb-1 flex-1">
                                    <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{talent.name}</h1>
                                    <p className="text-lg text-orange-600 font-semibold mt-1">{talent.headline}</p>
                                    <p className="text-sm text-gray-500 mt-1">📍 {talent.location}</p>
                                </div>
                                <div className="flex space-x-3 pb-1">
                                    <button className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition">
                                        Hire Me
                                    </button>
                                    <button className="border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-full font-bold hover:border-orange-600 hover:text-orange-600 transition">
                                        Hubungi
                                    </button>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className="flex space-x-8 border-t border-gray-100 pt-5">
                                <div className="text-center">
                                    <div className="text-2xl font-extrabold text-gray-900">{talent.jobs_completed}</div>
                                    <div className="text-xs text-gray-500 font-medium">Proyek Selesai</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-extrabold text-amber-500">⭐ {talent.rating}</div>
                                    <div className="text-xs text-gray-500 font-medium">{talent.reviews} Ulasan</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-extrabold text-gray-900">{talent.connections}+</div>
                                    <div className="text-xs text-gray-500 font-medium">Koneksi</div>
                                </div>
                                <div className="flex-1"></div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {talent.skills?.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-bold bg-orange-50 text-orange-700 rounded-full border border-orange-100">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Tentang */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">👤</span>
                                    Tentang
                                </h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{talent.about}</p>
                            </div>

                            {/* Pengalaman */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">💼</span>
                                    Pengalaman Kerja
                                </h2>
                                <div className="space-y-6">
                                    {talent.experience?.map((exp, i) => (
                                        <div key={i} className="flex space-x-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 font-bold text-lg flex-shrink-0 border border-gray-200">
                                                {exp.company.charAt(0)}
                                            </div>
                                            <div className="flex-1 border-b border-gray-50 pb-5">
                                                <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                                <p className="text-sm text-orange-600 font-semibold">{exp.company}</p>
                                                <p className="text-xs text-gray-400 mt-1">{exp.period}</p>
                                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pendidikan */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">🎓</span>
                                    Pendidikan
                                </h2>
                                <div className="space-y-6">
                                    {talent.education?.map((edu, i) => (
                                        <div key={i} className="flex space-x-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0 border border-blue-100">
                                                🏛️
                                            </div>
                                            <div className="flex-1 border-b border-gray-50 pb-5">
                                                <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                                                <p className="text-sm text-gray-600 font-medium">{edu.degree}</p>
                                                <p className="text-xs text-gray-400 mt-1">{edu.year}</p>
                                                {edu.gpa && <p className="text-sm text-gray-500 mt-1">IPK: <span className="font-bold text-gray-700">{edu.gpa}</span></p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prestasi */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">🏆</span>
                                    Prestasi & Sertifikasi
                                </h2>
                                <div className="space-y-4">
                                    {talent.achievements?.map((ach, i) => (
                                        <div key={i} className="flex items-start space-x-3 bg-amber-50 p-4 rounded-xl border border-amber-100">
                                            <span className="text-xl flex-shrink-0">{ach.icon}</span>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{ach.title}</h3>
                                                <p className="text-sm text-gray-500">{ach.issuer} • {ach.year}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Portofolio Proyek */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Portofolio Proyek</h2>
                                <div className="space-y-4">
                                    {talent.projects?.map((proj, i) => (
                                        <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition cursor-pointer">
                                            <div className="h-24 bg-gradient-to-br from-orange-200 to-amber-100 rounded-lg mb-3 flex items-center justify-center">
                                                <span className="text-2xl">{proj.emoji}</span>
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{proj.desc}</p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {proj.tech?.map((t, j) => (
                                                    <span key={j} className="text-[10px] font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ulasan */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Ulasan Klien</h2>
                                <div className="space-y-4">
                                    {talent.client_reviews?.map((rev, i) => (
                                        <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">{rev.name.charAt(0)}</div>
                                                <span className="font-bold text-sm text-gray-900">{rev.name}</span>
                                                <span className="text-amber-400 text-xs">{'⭐'.repeat(rev.stars)}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed italic">"{rev.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Kontak */}
                            <div className="bg-orange-600 rounded-2xl shadow-sm p-6 text-white">
                                <h2 className="text-lg font-bold mb-3">Tertarik Berkolaborasi?</h2>
                                <p className="text-orange-100 text-sm mb-5">Hubungi {talent.name.split(' ')[0]} untuk mendiskusikan proyek Anda.</p>
                                <button className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
                                    Kirim Pesan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Back */}
                    <div className="mt-10 text-center">
                        <Link href={route('talents.index')} className="text-orange-600 font-semibold hover:underline">← Kembali ke Talent Hub</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

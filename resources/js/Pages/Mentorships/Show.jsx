import { Head, Link } from '@inertiajs/react';

export default function Show({ mentor }) {
    return (
        <>
            <Head title={`${mentor.name} | Mentorship Hub`} />
            <div className="min-h-screen bg-gray-100 font-sans">
                <nav className="bg-white shadow-sm py-3 px-6 sticky top-0 z-50">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <Link href={route('home')} className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
                            <span className="font-extrabold text-lg text-orange-600 tracking-tight">BlitarHub<span className="text-gray-900">.</span></span>
                        </Link>
                        <div className="space-x-5 font-medium text-gray-600 hidden md:flex items-center text-sm">
                            <Link href={route('talents.index')} className="hover:text-orange-600 transition">Talent Hub</Link>
                            <Link href={route('mentorships.index')} className="text-orange-600 font-semibold">Mentorships</Link>
                            <Link href={route('scholarships.index')} className="hover:text-orange-600 transition">Scholarships</Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-5xl mx-auto px-4 py-6">
                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 mb-6">
                        <div className="h-44 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 relative">
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 relative">
                            <div className="flex items-end -mt-14 mb-6">
                                <div className="w-28 h-28 rounded-2xl border-4 border-white bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center text-teal-600 font-bold text-4xl shadow-xl flex-shrink-0">
                                    {mentor.name.charAt(0)}
                                </div>
                                <div className="ml-6 pb-1 flex-1">
                                    <h1 className="text-3xl mb-6 font-extrabold text-gray-900">{mentor.name}</h1>
                                    <p className="text-lg text-emerald-600 font-semibold mt-6">{mentor.expertise}</p>
                                    <div className="flex items-center space-x-3 mt-2">
                                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-bold">{mentor.company}</span>
                                        <span className="text-sm text-gray-500">📍 {mentor.location}</span>
                                    </div>
                                </div>
                                <div className="flex space-x-3 pb-1">
                                    <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition">Booking Sesi</button>
                                    <button className="border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-full font-bold hover:border-emerald-600 hover:text-emerald-600 transition">Hubungi</button>
                                </div>
                            </div>
                            <div className="flex space-x-8 border-t border-gray-100 pt-5">
                                <div className="text-center"><div className="text-2xl font-extrabold text-gray-900">{mentor.mentees}</div><div className="text-xs text-gray-500 font-medium">Mentees Lulus</div></div>
                                <div className="text-center"><div className="text-2xl font-extrabold text-amber-500">⭐ {mentor.rating}</div><div className="text-xs text-gray-500 font-medium">Rating</div></div>
                                <div className="text-center"><div className="text-2xl font-extrabold text-gray-900">{mentor.programs?.length}</div><div className="text-xs text-gray-500 font-medium">Program Aktif</div></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Tentang */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">👤</span>Tentang Mentor
                                </h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{mentor.about}</p>
                            </div>

                            {/* Program Mentorship */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">📚</span>Program Mentorship
                                </h2>
                                <div className="space-y-4">
                                    {mentor.programs?.map(p => (
                                        <div key={p.id} className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-md transition">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                                                <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-sm">{p.price}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{p.desc}</p>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500 font-medium">
                                                <span>⏱️ {p.duration}</span>
                                                <span>📹 {p.format}</span>
                                                <span>👥 {p.enrolled} enrolled</span>
                                            </div>
                                            <button className="mt-4 w-full bg-gray-900 text-white py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition">Daftar Sekarang</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pengalaman */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">💼</span>Pengalaman Kerja
                                </h2>
                                <div className="space-y-6">
                                    {mentor.experience?.map((exp, i) => (
                                        <div key={i} className="flex space-x-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 font-bold text-lg flex-shrink-0 border border-gray-200">{exp.company.charAt(0)}</div>
                                            <div className="flex-1 border-b border-gray-50 pb-5">
                                                <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                                <p className="text-sm text-emerald-600 font-semibold">{exp.company}</p>
                                                <p className="text-xs text-gray-400 mt-1">{exp.period}</p>
                                                <p className="text-sm text-gray-600 mt-2">{exp.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pendidikan */}
                            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">🎓</span>Pendidikan
                                </h2>
                                {mentor.education?.map((edu, i) => (
                                    <div key={i} className="flex space-x-4 mb-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border border-blue-100">🏛️</div>
                                        <div><h3 className="font-bold text-gray-900">{edu.institution}</h3><p className="text-sm text-gray-600">{edu.degree}</p><p className="text-xs text-gray-400">{edu.year}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Prestasi */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">🏆 Prestasi</h2>
                                <div className="space-y-3">
                                    {mentor.achievements?.map((a, i) => (
                                        <div key={i} className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                                            <h3 className="font-bold text-gray-900 text-sm">{a.icon} {a.title}</h3>
                                            <p className="text-xs text-gray-500">{a.issuer} • {a.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">💬 Kata Mentee</h2>
                                <div className="space-y-4">
                                    {mentor.testimonials?.map((t, i) => (
                                        <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-600">{t.name.charAt(0)}</div>
                                                <div>
                                                    <div className="font-bold text-sm text-gray-900">{t.name}</div>
                                                    <div className="text-[10px] text-gray-400">{t.role}</div>
                                                </div>
                                                <span className="text-amber-400 text-xs ml-auto">{'⭐'.repeat(t.stars)}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 italic leading-relaxed">"{t.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-emerald-600 rounded-2xl shadow-sm p-6 text-white">
                                <h2 className="text-lg font-bold mb-3">Ingin Dibimbing?</h2>
                                <p className="text-emerald-100 text-sm mb-5">Mulai perjalanan karirmu bersama {mentor.name.split(' ')[0]} sekarang.</p>
                                <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold shadow hover:shadow-lg hover:scale-105 transition-all duration-300">Booking Sesi Pertama</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <Link href={route('mentorships.index')} className="text-emerald-600 font-semibold hover:underline">← Kembali ke Mentorship Hub</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, talent }) {
    const handleStartChat = async () => {
        if (!auth?.user) {
            router.get(route('login'));
            return;
        }

        try {
            const res = await axios.post('/api/conversations', { user_id: talent.user_id });
            const conversation = res.data;
            window.dispatchEvent(new CustomEvent('open-chat', { detail: conversation }));
        } catch (error) {
            console.error('Failed to start chat', error);
            alert('Gagal memulai obrolan.');
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${talent.name} | BlitarHub`} />
            
            <div className="py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Profile Card Header */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 mb-6">
                        {/* ── Profile Header ── */}
                        <div className="h-72 relative overflow-hidden rounded-t-2xl">
                            {talent.cover_url ? (
                                <img
                                    src={talent.cover_url}
                                    alt="Cover photo"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Profile Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-5">
                                <div className="w-28 h-28 rounded-2xl border-4 border-white bg-white flex items-center justify-center text-orange-600 font-bold text-4xl shadow-xl flex-shrink-0 overflow-hidden">
                                    {talent.avatar_url ? (
                                        <img src={talent.avatar_url} alt={talent.name} className="w-full h-full object-cover" />
                                    ) : (
                                        talent.name.charAt(0)
                                    )}
                                </div>
                                <div className="sm:ml-2 pb-1 flex-1 text-white">
                                    <h1 className="text-3xl font-extrabold mb-1 drop-shadow-md">{talent.name}</h1>
                                    <p className="text-lg text-orange-300 font-semibold drop-shadow-md">{talent.headline}</p>
                                    <p className="text-sm text-gray-200 mt-1 drop-shadow-md">📍 {talent.location}</p>
                                </div>
                                <div className="flex gap-3 pb-1 shrink-0">
                                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-900/50 hover:bg-blue-700 transition active:scale-95">
                                        Hire Me
                                    </button>
                                    <button onClick={handleStartChat} className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-full font-bold hover:bg-white/20 transition">
                                        💬 Hubungi
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="px-6 sm:px-8 py-5 bg-white rounded-b-2xl">
                            <div className="flex flex-wrap gap-6 border-gray-100 items-center justify-between">
                                <div className="flex gap-8">
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
                                </div>
                                <div className="flex-1 flex flex-wrap gap-2 items-center justify-end">
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

                            {/* Pengalaman Kerja */}
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
                                                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">{(rev.name || '?').charAt(0)}</div>
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
                                <button onClick={handleStartChat} className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
                                    Mulai Chat
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
        </AuthenticatedLayout>
    );
}

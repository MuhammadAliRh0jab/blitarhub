import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useRef } from 'react';

export default function Show({ auth, mentor }) {
    const [bookingModal, setBookingModal] = useState(null);
    const [bookingMessage, setBookingMessage] = useState('Halo kak, saya ingin mendaftar program ini.');
    const [submitting, setSubmitting] = useState(false);
    const programsRef = useRef(null);

    const handleStartChat = async () => {
        if (!auth?.user) { router.get(route('login')); return; }
        try {
            const res = await axios.post('/api/conversations', { user_id: mentor.user_id });
            window.dispatchEvent(new CustomEvent('open-chat', { detail: res.data }));
        } catch (error) {
            console.error('Failed to start chat', error);
            alert('Gagal memulai obrolan.');
        }
    };

    const scrollToPrograms = () => {
        programsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const openBooking = (program) => {
        if (!auth?.user) { router.get(route('login')); return; }
        setBookingModal(program);
        setBookingMessage('Halo kak, saya ingin mendaftar program ini.');
    };

    const submitBooking = () => {
        if (!bookingModal) return;
        setSubmitting(true);
        router.post(route('mentorship-registrations.store'), {
            mentorship_program_id: bookingModal.id,
            message: bookingMessage,
        }, {
            onFinish: () => setSubmitting(false),
        });
        setBookingModal(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${mentor.name} | Mentorship Hub`} />

            <div className="py-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* ── Profile Header ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
                        <div className="h-72 relative overflow-hidden rounded-t-2xl">
                            {mentor.cover_url ? (
                                <img src={mentor.cover_url} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Profile Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-5">
                                {/* Avatar */}
                                <div className="w-28 h-28 rounded-2xl border-4 border-white bg-white flex items-center justify-center text-orange-600 font-bold text-4xl shadow-xl flex-shrink-0 overflow-hidden">
                                    {mentor.avatar_url
                                        ? <img src={mentor.avatar_url} alt={mentor.name} className="w-full h-full object-cover" />
                                        : mentor.name.charAt(0)
                                    }
                                </div>

                                {/* Name & Info */}
                                <div className="sm:ml-2 pb-1 flex-1 text-white">
                                    <h1 className="text-3xl font-extrabold mb-1 drop-shadow-md">{mentor.name}</h1>
                                    <p className="text-lg text-orange-300 font-semibold drop-shadow-md">{mentor.expertise}</p>
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        <span className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs px-3 py-1 rounded-full font-bold">{mentor.company}</span>
                                        <span className="text-sm text-gray-200 drop-shadow-md">📍 {mentor.location}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pb-1 shrink-0">
                                    <button
                                        onClick={scrollToPrograms}
                                        className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-orange-900/50 hover:bg-orange-700 active:scale-95 transition-all"
                                    >
                                        📚 Booking Sesi
                                    </button>
                                    <button
                                        onClick={handleStartChat}
                                        className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-full font-bold hover:bg-white/20 transition"
                                    >
                                        💬 Hubungi
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="px-6 sm:px-8 py-5 bg-white rounded-b-2xl">
                            <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
                                <div className="text-center">
                                    <div className="text-2xl font-extrabold text-gray-900">{mentor.mentees}</div>
                                    <div className="text-xs text-gray-500 font-medium">Mentees Lulus</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-extrabold text-amber-500">⭐ {mentor.rating}</div>
                                    <div className="text-xs text-gray-500 font-medium">Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-extrabold text-gray-900">{mentor.programs?.length ?? 0}</div>
                                    <div className="text-xs text-gray-500 font-medium">Program Aktif</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Main Grid ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left: Main Content */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Tentang */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">👤</span>
                                    Tentang Mentor
                                </h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{mentor.about}</p>
                            </div>

                            {/* Program Mentorship */}
                            <div ref={programsRef} className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200 scroll-mt-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">📚</span>
                                    Program Mentorship
                                </h2>
                                <div className="space-y-4">
                                    {mentor.programs?.map(p => (
                                        <div key={p.id} className="border border-gray-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-md transition group">
                                            <div className="flex justify-between items-start mb-3 gap-3">
                                                <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                                                <span className="bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full text-sm shrink-0">{p.price}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{p.desc}</p>
                                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium mb-5">
                                                <span>⏱️ {p.duration}</span>
                                                <span>📹 {p.format}</span>
                                                <span>👥 {p.enrolled} enrolled</span>
                                            </div>
                                            <button
                                                onClick={() => openBooking(p)}
                                                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold group-hover:bg-orange-600 hover:bg-orange-600 active:scale-95 transition-all"
                                            >
                                                Daftar Sekarang →
                                            </button>
                                        </div>
                                    ))}
                                    {(!mentor.programs || mentor.programs.length === 0) && (
                                        <p className="text-center text-gray-400 py-8 italic">Belum ada program yang tersedia.</p>
                                    )}
                                </div>
                            </div>

                            {/* Pengalaman Kerja */}
                            {mentor.experience?.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">💼</span>
                                        Pengalaman Kerja
                                    </h2>
                                    <div className="space-y-6">
                                        {mentor.experience.map((exp, i) => (
                                            <div key={i} className="flex space-x-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 font-bold text-lg flex-shrink-0 border border-gray-200">
                                                    {exp.company?.charAt(0)}
                                                </div>
                                                <div className="flex-1 border-b border-gray-50 pb-5">
                                                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                                    <p className="text-sm text-orange-600 font-semibold">{exp.company}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{exp.period}</p>
                                                    <p className="text-sm text-gray-600 mt-2">{exp.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pendidikan */}
                            {mentor.education?.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">🎓</span>
                                        Pendidikan
                                    </h2>
                                    <div className="space-y-4">
                                        {mentor.education.map((edu, i) => (
                                            <div key={i} className="flex space-x-4">
                                                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border border-orange-100">🏛️</div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                                                    <p className="text-sm text-gray-600">{edu.degree}</p>
                                                    <p className="text-xs text-gray-400">{edu.year}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Sidebar */}
                        <div className="space-y-6">

                            {/* Prestasi */}
                            {mentor.achievements?.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">🏆 Prestasi</h2>
                                    <div className="space-y-3">
                                        {mentor.achievements.map((a, i) => (
                                            <div key={i} className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                                                <h3 className="font-bold text-gray-900 text-sm">{a.icon} {a.title}</h3>
                                                <p className="text-xs text-gray-500">{a.issuer} • {a.year}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Testimonial */}
                            {mentor.testimonials?.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">💬 Kata Mentee</h2>
                                    <div className="space-y-4">
                                        {mentor.testimonials.map((t, i) => (
                                            <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">
                                                        {(t.name || '?').charAt(0)}
                                                    </div>
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
                            )}

                            {/* CTA Card */}
                            <div className="bg-orange-600 rounded-2xl shadow-sm p-6 text-white">
                                <h2 className="text-lg font-bold mb-2">Ingin Dibimbing?</h2>
                                <p className="text-orange-100 text-sm mb-5">
                                    Mulai perjalanan karirmu bersama {mentor.name.split(' ')[0]} sekarang.
                                </p>
                                <button
                                    onClick={scrollToPrograms}
                                    className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold shadow hover:shadow-lg hover:scale-105 transition-all duration-300 mb-3"
                                >
                                    Lihat Program →
                                </button>
                                <button
                                    onClick={handleStartChat}
                                    className="w-full border-2 border-white/50 text-white py-2.5 rounded-xl font-bold hover:bg-white/10 transition"
                                >
                                    Mulai Chat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Back Link */}
                    <div className="mt-10 text-center">
                        <Link href={route('mentorships.index')} className="text-orange-600 font-semibold hover:underline">
                            ← Kembali ke Mentorship Hub
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Booking Modal ── */}
            {bookingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setBookingModal(null)}
                    />

                    {/* Card */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-5 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-extrabold">Daftar Program</h2>
                                    <p className="text-orange-100 text-sm mt-0.5">bersama {mentor.name}</p>
                                </div>
                                <button
                                    onClick={() => setBookingModal(null)}
                                    className="text-white/70 hover:text-white transition p-1"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Program Summary */}
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 text-base leading-tight pr-3">{bookingModal.title}</h3>
                                    <span className="text-orange-600 font-extrabold text-sm shrink-0">{bookingModal.price}</span>
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs text-gray-500 font-medium">
                                    <span>⏱️ {bookingModal.duration}</span>
                                    <span>📹 {bookingModal.format}</span>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pesan untuk Mentor{' '}
                                    <span className="text-gray-400 font-normal">(opsional)</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={bookingMessage}
                                    onChange={e => setBookingMessage(e.target.value)}
                                    placeholder="Ceritakan tujuan atau harapan Anda dari program ini..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none transition"
                                />
                            </div>

                            {/* Payment notice for paid programs */}
                            {bookingModal.price !== 'Gratis' && bookingModal.price !== '0' && bookingModal.price !== '' && (
                                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex gap-3 items-start">
                                    <span className="text-blue-500 text-base shrink-0 mt-0.5">💳</span>
                                    <p className="text-xs text-blue-700 leading-relaxed">
                                        Setelah mendaftar, Anda akan diarahkan ke halaman pembayaran aman via{' '}
                                        <strong>Midtrans</strong>.
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    onClick={() => setBookingModal(null)}
                                    className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={submitBooking}
                                    disabled={submitting}
                                    className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Mendaftar...
                                        </span>
                                    ) : 'Konfirmasi Daftar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

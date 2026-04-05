import { Head, Link } from '@inertiajs/react';

export default function Welcome({ featuredTalents, featuredMentors, activeCampaigns }) {
    return (
        <>
            <Head title="BlitarHub — Ekosistem Kolaborasi Talenta Terbaik" />
            <div className="min-h-screen bg-orange-50 flex flex-col font-sans">
                {/* Navbar */}
                <nav className="bg-white shadow-sm py-4 px-6 fixed w-full top-0 z-50">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Logo" style={{ height: '36px', width: 'auto' }} />
                            <div className="font-extrabold text-2xl text-orange-600 tracking-tight">BlitarHub<span className="text-gray-900">.</span></div>
                        </div>
                        <div className="space-x-6 font-medium text-gray-600 hidden md:block">
                            <Link href={route('talents.index')} className="hover:text-orange-600 transition">Talent Hub</Link>
                            <Link href={route('mentorships.index')} className="hover:text-orange-600 transition">Mentorships</Link>
                            <Link href={route('scholarships.index')} className="hover:text-orange-600 transition">Scholarships</Link>
                        </div>
                        <div className="space-x-4">
                            <Link href="/login" className="text-gray-700 font-medium hover:text-orange-600">Login</Link>
                            <Link href="/register" className="bg-orange-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-700 transition shadow-md shadow-orange-200">Daftar</Link>
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <div className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto mt-8">
                    <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
                        <span className="flex w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span>Platform Kolaborasi Ekosistem #1 di Blitar</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 drop-shadow-sm leading-tight">
                        Wujudkan Ide Besarmu <br /> Bersama <span className="text-orange-600">Talenta Terbaik</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Temukan pekerja lepas profesional, dapatkan bimbingan dari mentor berpengalaman, dan bantu ringankan biaya pendidikan generasi penerus bangsa.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href={route('talents.index')} className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-300 transition-all duration-300">Mulai Kolaborasi</Link>
                        <Link href={route('mentorships.index')} className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300">Cari Mentor</Link>
                    </div>
                    <div className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-orange-200/50 max-w-4xl mx-auto">
                        <div><div className="text-4xl font-extrabold text-orange-600 mb-1">1,240+</div><div className="text-gray-500 font-medium">Talenta Terverifikasi</div></div>
                        <div><div className="text-4xl font-extrabold text-orange-600 mb-1">50+</div><div className="text-gray-500 font-medium">Expert Mentor</div></div>
                        <div><div className="text-4xl font-extrabold text-orange-600 mb-1">Rp 12M+</div><div className="text-gray-500 font-medium">Donasi Disalurkan</div></div>
                    </div>
                </div>

                {/* 🔥 Donasi Sedang Berlangsung */}
                <div className="bg-white py-20 border-y border-gray-100">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-semibold text-xs mb-3">
                                    <span className="flex w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                    <span>LIVE</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Donasi Sedang Berlangsung</h2>
                                <p className="text-gray-500 mt-2">Bantu mereka yang membutuhkan. Setiap rupiah berarti.</p>
                            </div>
                            <Link href={route('scholarships.index')} className="text-orange-600 font-semibold hover:underline hidden md:block">Lihat Semua →</Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {activeCampaigns?.map(c => {
                                const progress = Math.min(100, Math.round((c.current_amount / c.target_amount) * 100));
                                return (
                                    <Link key={c.id} href={route('scholarships.show', c.id)} className="block group">
                                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-bold text-gray-900 leading-tight pr-4">{c.title}</h3>
                                                <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-bold whitespace-nowrap">⏳ {c.days_left}h</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-4">Untuk: <span className="font-bold text-orange-600">{c.beneficiary}</span></p>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                                                <div className="bg-gradient-to-r from-orange-500 to-rose-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs mb-4">
                                                <span className="font-bold text-gray-900">Rp {c.current_amount.toLocaleString()}</span>
                                                <span className="text-gray-400">dari Rp {c.target_amount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500 font-medium">{c.donors.toLocaleString()} donatur</span>
                                                <span className="text-xs font-bold text-orange-600 group-hover:underline">Donasi →</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="bg-orange-50 py-20">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12">Kisah Sukses Mereka</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            {[
                                { quote: "Dapat freelancer frontend yang jago banget lewat Talent Hub. Proyek startup saya selesai sebulan lebih cepat dari target!", name: 'Rizky Aditya', role: 'Founder TechIn' },
                                { quote: "Sesi mentoring dengan VP Tokopedia merubah cara pandang saya mengatur tim. BlitarHub benar-benar naik level!", name: 'Anisa Larasati', role: 'Product Manager' },
                                { quote: "Sangat transparan. Donasi saya diproses cepat dan laporannya disalurkan tepat bulan itu juga ke mahasiswa berprestasi.", name: 'Haji Rahmat', role: 'Donatur Rutin' },
                            ].map((t, i) => (
                                <div key={i} className="bg-white rounded-2xl p-8 border border-orange-100 shadow-sm">
                                    <div className="text-orange-400 mb-4">⭐⭐⭐⭐⭐</div>
                                    <p className="text-gray-700 font-medium mb-6">"{t.quote}"</p>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-700 text-sm">{t.name.charAt(0)}</div>
                                        <div><div className="font-bold text-gray-900">{t.name}</div><div className="text-sm text-gray-500">{t.role}</div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured Talents & Mentors */}
                <div className="py-20 px-4 bg-white">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
                        <div>
                            <div className="flex justify-between items-end mb-6">
                                <div><h2 className="text-2xl font-bold text-gray-900">Top Talenta Freelance</h2><p className="text-gray-500 mt-1">Talenta dengan rating tertinggi bulan ini.</p></div>
                                <Link href={route('talents.index')} className="text-orange-600 font-semibold hover:underline">Lihat Semua</Link>
                            </div>
                            <div className="space-y-3">
                                {featuredTalents?.map(t => (
                                    <Link key={t.id} href={route('talents.show', t.id)} className="block">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center space-x-4 hover:shadow-md hover:bg-white transition cursor-pointer">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">{t.name[0]}</div>
                                            <div className="flex-1"><div className="font-bold text-gray-900">{t.name}</div><div className="text-sm text-orange-600 font-medium">{t.headline}</div></div>
                                            <div className="text-right"><div className="text-sm font-bold text-gray-900">⭐ {t.rating}</div><div className="text-xs text-gray-500">{t.jobs_completed} Jobs</div></div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-6">
                                <div><h2 className="text-2xl font-bold text-gray-900">Mentor Inspirasional</h2><p className="text-gray-500 mt-1">Dapatkan insight tajam dari ekspert industri.</p></div>
                                <Link href={route('mentorships.index')} className="text-orange-600 font-semibold hover:underline">Cari Mentor</Link>
                            </div>
                            <div className="space-y-3">
                                {featuredMentors?.map(m => (
                                    <Link key={m.id} href={route('mentorships.show', m.id)} className="block">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center space-x-4 hover:shadow-md hover:bg-white transition cursor-pointer">
                                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">{m.name[0]}</div>
                                            <div className="flex-1"><div className="font-bold text-gray-900">{m.name}</div><div className="text-sm text-gray-600 font-medium">{m.expertise} <span className="text-gray-400">•</span> {m.company}</div></div>
                                            <div className="text-right"><div className="text-sm font-bold text-gray-900">⭐ {m.rating}</div><div className="text-xs text-gray-500">{m.mentees} Mentees</div></div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Ticker */}
                <div className="bg-gray-900 py-6 overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex items-center space-x-8 text-sm animate-pulse">
                            <span className="text-green-400 font-bold whitespace-nowrap">🟢 LIVE</span>
                            <span className="text-gray-400 whitespace-nowrap">Haji Rahmat baru saja mendonasikan <span className="text-orange-400 font-bold">Rp 5.000.000</span></span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400 whitespace-nowrap">Rizky Aditya merekrut <span className="text-orange-400 font-bold">Budi Santoso</span> sebagai React Developer</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400 whitespace-nowrap">Anisa Larasati menyelesaikan sesi mentoring dengan <span className="text-orange-400 font-bold">Jessica Wongso</span></span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400 whitespace-nowrap">Alumni SMAN 1 mendonasikan <span className="text-orange-400 font-bold">Rp 1.000.000</span> untuk Siti Nurhaliza</span>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="bg-orange-600 py-20 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-sm">Siap Membangun Masa Depan?</h2>
                    <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">Bergabunglah dengan ribuan profesional dan orang baik lainnya. Perjalanan Anda sebagai talent, mentor, atau donatur dimulai dari sini.</p>
                    <Link href="/register" className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">Daftar Akun Gratis</Link>
                </div>
            </div>
        </>
    );
}

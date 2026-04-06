import { Head, Link } from '@inertiajs/react';
import { useRef, useEffect } from 'react';

export default function Welcome({ featuredTalents, featuredMentors, activeCampaigns }) {
    // Calculate aggregated donation stats
    const totalDonated = activeCampaigns?.reduce((acc, c) => acc + c.current_amount, 0) || 0;
    const totalTarget = activeCampaigns?.reduce((acc, c) => acc + c.target_amount, 0) || 0;
    const totalDonors = activeCampaigns?.reduce((acc, c) => acc + (c.donors || 0), 0) || 0;
    const donationProgress = Math.min(100, Math.round((totalDonated / totalTarget) * 100));

    // Carousel Refs
    const talentRef = useRef(null);
    const mentorRef = useRef(null);
    
    // Auto-slide logic
    const setupAutoSlide = (ref) => {
        useEffect(() => {
            const container = ref.current;
            if (!container) return;

            let intervalId;
            const startSlide = () => {
                intervalId = setInterval(() => {
                    if (container) {
                        const maxScroll = container.scrollWidth - container.clientWidth;
                        if (container.scrollLeft >= maxScroll - 10) {
                            container.scrollTo({ left: 0, behavior: 'smooth' });
                        } else {
                            container.scrollBy({ left: 300, behavior: 'smooth' });
                        }
                    }
                }, 4000);
            };

            const pauseSlide = () => clearInterval(intervalId);

            container.addEventListener('mouseenter', pauseSlide);
            container.addEventListener('mouseleave', startSlide);
            
            startSlide();

            return () => {
                pauseSlide();
                container.removeEventListener('mouseenter', pauseSlide);
                container.removeEventListener('mouseleave', startSlide);
            };
        }, [ref]);
    };

    setupAutoSlide(talentRef);
    setupAutoSlide(mentorRef);

    const scrollManual = (ref, direction) => {
        const container = ref.current;
        if (container) {
            const scrollAmount = direction === 'next' ? 300 : -300;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head title="BlitarHub — Kolaborasi Talenta & Mentor Terbaik di Blitar" />
            <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
                
                {/* Fixed Navbar */}
                <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 fixed w-full top-0 z-50">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <img src="/logo.png" alt="BlitarHub" className="h-10 w-auto transform group-hover:scale-110 transition-transform" />
                            <div className="font-extrabold text-2xl text-gray-900 tracking-tight">BlitarHub<span className="text-orange-600">.</span></div>
                        </Link>
                        <div className="hidden md:flex space-x-8 font-semibold text-gray-500">
                            <Link href={route('talents.index')} className="hover:text-orange-600 transition">Talent Hub</Link>
                            <Link href={route('mentorships.index')} className="hover:text-orange-600 transition">Mentor Hub</Link>
                            <Link href={route('scholarships.index')} className="hover:text-orange-600 transition">Scholarships</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className="text-gray-600 font-bold hover:text-orange-600 hidden sm:block">Login</Link>
                            <Link href="/register" className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200 active:scale-95">Mulai Sekarang</Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6 lg:pt-48 lg:pb-32 bg-gradient-to-b from-orange-50/50 to-white overflow-hidden">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left z-10">
                            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold text-sm mb-8 animate-fade-in">
                                <span className="flex w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                <span>Ekosistem Digital #1 di Blitar</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
                                Hubungkan <span className="text-orange-600">Ide</span> <br /> 
                                Temukan <span className="text-orange-600">Solusi.</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                Platform kolaborasi untuk menemukan pekerja lepas berbakat, mendapatkan bimbingan mentor ekspert, dan berdonasi untuk pendidikan.
                            </p>
                            
                            {/* Stats in Hero */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 min-w-[120px]">
                                    <div className="text-2xl font-black text-orange-600">1.2k+</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Talenta</div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 min-w-[120px]">
                                    <div className="text-2xl font-black text-orange-600">80+</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mentor</div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 min-w-[120px]">
                                    <div className="text-2xl font-black text-orange-600">Rp 12M+</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Donasi</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative lg:h-[500px] flex items-center justify-center">
                            <div className="absolute inset-0 bg-orange-400/10 blur-[100px] rounded-full"></div>
                            <img 
                                src="/images/hero-illustration.png" 
                                alt="Collaboration Illustration" 
                                className="relative z-10 max-w-full h-auto object-contain drop-shadow-2xl animate-float"
                            />
                        </div>
                    </div>
                </section>

                {/* Section 1: Talent Hub (Slider - Small Vertical Cards) */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Talent Hub</h2>
                                <p className="text-gray-500 font-medium italic">Temukan talenta terbaik untuk proyek impianmu.</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button onClick={() => scrollManual(talentRef, 'prev')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-sm">←</button>
                                <button onClick={() => scrollManual(talentRef, 'next')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-sm">→</button>
                            </div>
                        </div>

                        {/* Carousel Wrapper */}
                        <div className="relative">
                            <div ref={talentRef} className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-6 px-6">
                                {featuredTalents?.map((t, idx) => (
                                    <Link key={t.id} href={route('talents.show', t.id)} className="flex-none w-[75%] md:w-[calc(25%-18px)] snap-start group/talent">
                                        <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-orange-200 hover:bg-white p-4 relative h-full flex flex-col">
                                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-100 text-[10px] font-black text-orange-600 shadow-sm z-20">⭐ {t.rating}</div>
                                            <div className="w-full aspect-square mb-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl overflow-hidden relative flex-none">
                                                <img 
                                                    src={`/images/talents/profile-${(idx % 2) + 1}.png`} 
                                                    alt={t.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/talent:scale-110"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 px-2">
                                                <h3 className="text-base font-black text-gray-900 mb-0.5 truncate">{t.name}</h3>
                                                <p className="text-[10px] font-bold text-orange-600 mb-4 line-clamp-1 truncate">{t.headline}</p>
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {t.skills?.slice(0, 2).map(s => (
                                                        <span key={s} className="text-[8px] uppercase tracking-widest font-black bg-white border border-gray-100 px-2 py-1 rounded-full text-gray-400">{s}</span>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                                                    <div className="text-[10px] font-bold text-gray-400 capitalize">{t.jobs_completed} Selesai</div>
                                                    <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-black opacity-0 group-hover/talent:opacity-100 transition-opacity">→</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Mentor Hub (Slider - Small Vertical Cards Synced with Talent) */}
                <section className="py-24 bg-orange-50/50 border-y border-orange-100 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Mentor Hub</h2>
                                <p className="text-gray-500 font-medium italic">Belajar langsung dari yang terbaik di industrinya.</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button onClick={() => scrollManual(mentorRef, 'prev')} className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-sm">←</button>
                                <button onClick={() => scrollManual(mentorRef, 'next')} className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-sm">→</button>
                            </div>
                        </div>

                        {/* Carousel Wrapper */}
                        <div className="relative">
                            <div ref={mentorRef} className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-6 px-6">
                                {featuredMentors?.map((m, idx) => (
                                    <Link key={m.id} href={route('mentorships.show', m.id)} className="flex-none w-[75%] md:w-[calc(25%-18px)] snap-start group/mentor">
                                        <div className="bg-white rounded-3xl overflow-hidden border border-orange-100 transition-all duration-300 hover:shadow-xl hover:border-orange-300 p-4 relative h-full flex flex-col">
                                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-100 text-[10px] font-black text-orange-600 shadow-sm z-20">⭐ {m.rating}</div>
                                            <div className="w-full aspect-square mb-4 bg-orange-100 border-2 border-white rounded-2xl overflow-hidden relative flex-none shadow-sm">
                                                <img 
                                                    src={`/images/mentors/mentor-${(idx % 2) + 1}.png`} 
                                                    alt={m.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/mentor:scale-110"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 px-2">
                                                <div className="flex justify-between items-start mb-0.5">
                                                    <h3 className="text-base font-black text-gray-900 truncate">{m.name}</h3>
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-400 mb-4 truncate uppercase tracking-widest">{m.company || 'Mentor Expert'}</p>
                                                
                                                <div className="bg-orange-50 p-2.5 rounded-xl mb-4 group-hover/mentor:bg-orange-600 transition-colors">
                                                    <p className="text-[9px] font-black text-orange-700 group-hover/mentor:text-white transition-colors uppercase tracking-[0.15em] line-clamp-1">{m.expertise}</p>
                                                </div>
                                                
                                                <div className="flex justify-between items-center pt-3 border-t border-orange-50 mt-auto">
                                                    <div className="text-[10px] font-bold text-gray-400 capitalize">{m.mentees} Mentees</div>
                                                    <div className="text-[10px] font-black text-orange-600 group-hover/mentor:translate-x-1 transition-transform">Masuk Hub →</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Donation Hub (Modern Clean Impact Center) */}
                <section className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-5 gap-12 items-center">
                            <div className="lg:col-span-2 text-left">
                                <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full font-black text-xs mb-6 uppercase tracking-widest border border-orange-200">Social Impact</div>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">Wujudkan <span className="text-orange-600">Mimpi</span> Pendidikan Bakat Muda.</h2>
                                <p className="text-lg text-gray-500 mb-8 font-medium leading-relaxed">Setiap donasi Anda membantu talenta berbakat di Blitar untuk mendapatkan pendidikan dan pelatihan yang layak.</p>
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="flex -space-x-3">
                                        {[1,2,3,4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Donor" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm font-bold text-gray-400 leading-tight">
                                        <span className="text-gray-900 font-black block">+{totalDonors.toLocaleString()} Orang Baik</span>
                                        Telah Bergabung
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-3">
                                <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-orange-100 shadow-[0_32px_64px_-16px_rgba(249,115,22,0.1)] relative overflow-hidden group">
                                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
                                    <div className="relative z-10">
                                        <div className="mb-10">
                                            <div className="flex justify-between items-end mb-4">
                                                <div>
                                                    <div className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Total Dana Terkumpul</div>
                                                    <div className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">Rp {totalDonated.toLocaleString()}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-orange-600">{donationProgress}%</div>
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tercapai</div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden border border-gray-50 p-1">
                                                <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-1000" style={{ width: `${donationProgress}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                                            <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
                                                <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Sisa Target</div>
                                                <div className="text-xl font-black text-gray-900">Rp {(totalTarget - totalDonated).toLocaleString()}</div>
                                            </div>
                                            <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
                                                <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Aktif Kampanye</div>
                                                <div className="text-xl font-black text-gray-900">{activeCampaigns?.length || 0} Program</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link href={route('scholarships.index')} className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-xl text-center hover:bg-orange-700 hover:shadow-2xl hover:shadow-orange-200 transition-all active:scale-95 flex-1">Donasi Sekarang</Link>
                                            <div className="px-6 py-5 rounded-2xl bg-gray-50 text-xs text-gray-400 font-bold border border-gray-100 text-center flex items-center justify-center flex-1">Laporan Transparansi tersedia secara mingguan.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Testimonials (Glints Style Card) */}
                <section className="py-32 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Kisah Sukses Mereka</h2>
                            <p className="text-gray-500 font-medium italic text-lg max-w-2xl mx-auto">Kami tidak hanya membangun platform, kami membangun masa depan untuk ribuan orang hebat.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12 mt-20">
                            {[
                                { quote: "Mendapat freelancer berbakat dari BlitarHub sangat membantu startup saya berkembang lebih cepat. Prosesnya instan dan kualitasnya tidak main-main.", name: 'Rizky Aditya', role: 'Founder TechIn', color: 'orange', age: '24 years old' },
                                { quote: "Mentoring dengan pakar industri benar-benar merubah pola pikir saya dalam berkarir. Sekarang saya merasa jauh lebih percaya diri menghadapi tantangan global.", name: 'Anisa Larasati', role: 'Product Manager', color: 'blue', age: '26 years old' },
                                { quote: "Sistem transparansi donasinya sangat membantu saya sebagai donatur merasa tenang. Saya bisa melihat langsung dampak nyata dari bantuan saya.", name: 'Haji Rahmat', role: 'Donatur Tetap', color: 'emerald', age: '52 years old' },
                            ].map((t, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative pt-20 group hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all flex flex-col h-full border border-gray-100/50">
                                    {/* Overlapping Profile Image */}
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-8 border-gray-50 shadow-xl">
                                        <img src={`https://i.pravatar.cc/200?u=${idx + 10}`} alt={t.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    </div>
                                    
                                    <div className="flex-1 text-center">
                                        <div className={`text-5xl font-serif text-${t.color}-500/20 mb-4 h-10`}>“</div>
                                        <p className="text-gray-600 font-semibold mb-10 leading-relaxed italic px-4">"{t.quote}"</p>
                                    </div>
                                    
                                    <div className="pt-6 border-t border-gray-100 mt-auto text-left">
                                        <div className="font-black text-gray-900 text-lg">{t.name}, <span className="text-gray-400 font-bold text-sm tracking-normal">{t.age}</span></div>
                                        <div className={`text-xs font-black text-${t.color}-600 uppercase tracking-[0.2em] mt-1`}>{t.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer CTA (Shrunken) */}
                <section className="py-12 px-6">
                    <div className="max-w-5xl mx-auto bg-orange-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-orange-200 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 group-hover:scale-110 transition-transform duration-[10s]"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Sudah Siap Melompat Lebih Tinggi?</h2>
                            <p className="text-lg text-orange-100 mb-10 max-w-2xl mx-auto font-medium">Bawa mimpi dan idemu sekarang. Bergabunglah dalam komunitas talenta digital terbesar di Blitar.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/register" className="bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95">Mulai Kolaborasi</Link>
                                <Link href={route('scholarships.index')} className="bg-orange-700 text-white border border-orange-500 px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-800 transition-all active:scale-95">Ikut Berdonasi</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="py-12 bg-white text-center">
                    <div className="text-gray-300 font-bold tracking-widest uppercase text-xs">© 2026 BlitarHub Collaboration Platform. All Rights Reserved.</div>
                </footer>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-fade-in {
                    animation: fadeIn 1s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            ` }} />
        </>
    );
}

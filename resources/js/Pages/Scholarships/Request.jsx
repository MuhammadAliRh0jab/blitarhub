import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Request() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        category: '',
        title: '',
        target_amount: '',
        description: '',
        institution: '',
    });

    const categories = [
        'Pendidikan Tinggi (S1/S2)',
        'Pendidikan Vokasi (D3/LKP)',
        'Infrastruktur Sekolah/PAUD',
        'Alat Bantu Belajar (Laptop/Buku)',
        'Pelatihan & Sertifikasi Digital',
    ];

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Permohonan Anda telah dikirim! Tim BlitarHub akan melakukan verifikasi dalam 3x24 jam.');
        window.location.href = '/';
    };

    return (
        <>
            <Head title="Ajukan Permohonan Donasi | BlitarHub" />
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
                
                {/* Minimal Navbar */}
                <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 fixed w-full top-0 z-50">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <img src="/logo.png" alt="BlitarHub" className="h-8 w-auto transform group-hover:scale-110 transition-transform" />
                            <div className="font-extrabold text-xl text-gray-900 tracking-tight">BlitarHub<span className="text-orange-600">.</span></div>
                        </Link>
                        <Link href={route('scholarships.index')} className="text-sm font-bold text-gray-400 hover:text-orange-600 transition">Batal & Kembali</Link>
                    </div>
                </nav>

                <main className="pt-24 pb-20 px-6 flex-1 flex items-center justify-center">
                    <div className="max-w-4xl w-full grid lg:grid-cols-10 gap-12 items-start">
                        
                        {/* Left Side: Progress & Info */}
                        <div className="lg:col-span-4 space-y-8 hidden lg:block sticky top-32">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Wujudkan Mimpimu bersama <span className="text-orange-600">BlitarHub.</span></h1>
                                <p className="text-gray-500 font-medium leading-relaxed">Kami percaya setiap talenta berhak mendapatkan kesempatan yang sama untuk bertumbuh.</p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { s: 1, t: 'Informasi Personal', d: 'Data diri lengkap pemohon' },
                                    { s: 2, t: 'Detail Program', d: 'Tujuan dan kebutuhan dana' },
                                    { s: 3, t: 'Verifikasi Data', d: 'Unggah dokumen pendukung' },
                                ].map((item) => (
                                    <div key={item.s} className="flex items-start space-x-4 group">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all shadow-sm ${step >= item.s ? 'bg-orange-600 text-white shadow-orange-200 scale-110' : 'bg-white text-gray-300 border border-gray-100'}`}>
                                            {item.s}
                                        </div>
                                        <div>
                                            <div className={`font-bold transition-colors ${step >= item.s ? 'text-gray-900' : 'text-gray-300'}`}>{item.t}</div>
                                            <div className={`text-xs font-medium ${step >= item.s ? 'text-gray-500' : 'text-gray-200'}`}>{item.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 text-sm">💡</div>
                                    <div className="text-sm font-black text-orange-800 uppercase tracking-wider text-xs">Tips Sukses</div>
                                </div>
                                <p className="text-xs text-orange-700 leading-relaxed font-medium font-italic">"Ceritakan latar belakang dan impianmu dengan jujur. Foto pendukung yang jelas meningkatkan kepercayaan donatur hingga 70%."</p>
                            </div>
                        </div>

                        {/* Right Side: Form Card */}
                        <div className="lg:col-span-6 w-full">
                            <form className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gray-50">
                                    <div className="h-full bg-orange-600 transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
                                </div>

                                {step === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 mb-1">Informasi Personal</h2>
                                            <p className="text-sm text-gray-400 font-bold mb-8 uppercase tracking-widest">Step 01 / 03</p>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Nama Lengkap Sesuai KTP</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-gray-900 placeholder:text-gray-300" 
                                                    placeholder="Contoh: Ahmad Fauzi"
                                                    value={formData.full_name}
                                                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Nomor WhatsApp Aktif</label>
                                                <input 
                                                    type="tel" 
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-gray-900 placeholder:text-gray-300" 
                                                    placeholder="0812 XXXX XXXX"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Asal Sekolah / Universitas</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-gray-900 placeholder:text-gray-300" 
                                                    placeholder="SMAN 1 Blitar atau Universitas Brawijaya"
                                                    value={formData.institution}
                                                    onChange={(e) => setFormData({...formData, institution: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <button 
                                            onClick={handleNext}
                                            disabled={!formData.full_name || !formData.phone}
                                            className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-8"
                                        >
                                            Lanjutkan Ke Detail Program
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 mb-1">Detail Program</h2>
                                            <p className="text-sm text-gray-400 font-bold mb-8 uppercase tracking-widest">Step 02 / 03</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Kategori Permohonan</label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {categories.map((cat) => (
                                                        <button 
                                                            key={cat}
                                                            type="button"
                                                            onClick={() => setFormData({...formData, category: cat})}
                                                            className={`text-left px-6 py-4 rounded-2xl font-bold text-sm transition-all border ${formData.category === cat ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100' : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'}`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Judul Permohonan (Contoh: "Laptop untuk Siswa Berprestasi")</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-gray-900 placeholder:text-gray-300" 
                                                    placeholder="Deskripsikan tujuan dana secara singkat"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Target Dana Yang Dibutuhkan (Rp)</label>
                                                <input 
                                                    type="number" 
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-200 transition-all font-black text-gray-900 placeholder:text-gray-300" 
                                                    placeholder="0"
                                                    value={formData.target_amount}
                                                    onChange={(e) => setFormData({...formData, target_amount: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-8">
                                            <button 
                                                onClick={handleBack}
                                                className="w-1/3 bg-gray-50 text-gray-500 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all active:scale-95"
                                            >
                                                Kembali
                                            </button>
                                            <button 
                                                onClick={handleNext}
                                                disabled={!formData.category || !formData.title || !formData.target_amount}
                                                className="w-2/3 bg-orange-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                Lanjut Verifikasi
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 mb-1">Verifikasi Data</h2>
                                            <p className="text-sm text-gray-400 font-bold mb-8 uppercase tracking-widest">Step 03 / 03</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Ceritakan Alasan Mengapa Anda Layak Dibantu</label>
                                                <textarea 
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-gray-900 placeholder:text-gray-300 min-h-[150px]" 
                                                    placeholder="Tuliskan latar belakang ekonomi, prestasi, dan rencana penggunaan dana..."
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                ></textarea>
                                            </div>
                                            
                                            <div className="p-8 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50 text-center group hover:border-orange-200 transition-colors cursor-pointer">
                                                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">📸</div>
                                                <div className="text-sm font-black text-gray-900 mb-1">Unggah Dokumen Pendukung</div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">KTP, Surat Keterangan Tidak Mampu, Sertifikat Prestasi (PDF/JPG)</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-8">
                                            <button 
                                                onClick={handleBack}
                                                className="w-1/3 bg-gray-50 text-gray-500 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all active:scale-95"
                                            >
                                                Kembali
                                            </button>
                                            <button 
                                                onClick={handleSubmit}
                                                disabled={!formData.description}
                                                className="w-2/3 bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                            >
                                                Kirim Permohonan
                                            </button>
                                        </div>
                                        
                                        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">Dengan mengirimkan, Anda menyetujui Syarat & Ketentuan BlitarHub</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </main>

                <footer className="py-8 bg-white text-center border-t border-gray-100">
                    <div className="text-gray-300 font-bold tracking-widest uppercase text-[10px]">© 2026 BlitarHub Collaboration Platform. Transparansi & Integritas.</div>
                </footer>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            ` }} />
        </>
    );
}

import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useRef } from 'react';

export default function Payment({ auth, program, mentor, registration_id }) {
    const { data, setData, post, processing, errors } = useForm({
        payment_proof: null,
    });
    
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('payment_proof', file);
            
            // Preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mentorship-registrations.upload-proof', registration_id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pembayaran Mentorship" />

            <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-lg">
                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                        {/* Header Banner */}
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-10 text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-extrabold mb-1">Transfer Pembayaran</h1>
                            <p className="text-orange-100 text-sm">Transfer sesuai nominal dan unggah bukti pembayaran.</p>
                        </div>

                        <div className="px-8 py-8">
                            {/* Order Summary */}
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Detail Tagihan</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Program</p>
                                            <p className="font-bold text-gray-900 mt-0.5">{program.title}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                                        <p className="font-semibold text-gray-600">Total Pembayaran</p>
                                        <p className="text-2xl font-extrabold text-orange-600">{program.price}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Rekening Tujuan */}
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-6">
                                <h2 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">Transfer Ke Rekening Mentor</h2>
                                
                                {mentor.bank_account_number ? (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-orange-600 font-medium">Nama Bank</p>
                                            <p className="font-bold text-gray-900 text-lg">{mentor.bank_name || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-orange-600 font-medium">Nomor Rekening</p>
                                            <p className="font-extrabold text-gray-900 text-xl tracking-wider">{mentor.bank_account_number}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-orange-600 font-medium">Atas Nama</p>
                                            <p className="font-bold text-gray-900">{mentor.bank_account_name || mentor.name}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-sm font-semibold text-gray-700">Mentor belum mengatur nomor rekening.</p>
                                        <p className="text-xs text-gray-500 mt-1">Silakan hubungi mentor via chat untuk meminta nomor rekening tujuan.</p>
                                    </div>
                                )}
                            </div>

                            {/* Upload Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h2 className="text-sm font-bold text-gray-900 mb-3">Unggah Bukti Transfer</h2>
                                    
                                    <div 
                                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                                            preview ? 'border-orange-500 bg-orange-50/50' : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/30'
                                        }`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {preview ? (
                                            <div className="relative">
                                                <img src={preview} alt="Preview Bukti Transfer" className="max-h-48 mx-auto rounded-lg shadow-sm" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                                    Klik untuk ganti foto
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-4">
                                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-bold text-gray-700">Pilih foto bukti transfer</p>
                                                <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG, atau JPEG (Max: 2MB)</p>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden" 
                                            accept="image/*"
                                        />
                                    </div>
                                    {errors.payment_proof && (
                                        <p className="text-sm text-red-500 font-semibold mt-2">{errors.payment_proof}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!data.payment_proof || processing}
                                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-lg flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Mengunggah...
                                        </>
                                    ) : (
                                        <>
                                            Kirim Bukti Pembayaran
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Back link */}
                            <div className="mt-6 text-center">
                                <Link href={route('dashboard')} className="text-sm text-gray-400 hover:text-orange-600 transition font-medium">
                                    ← Bayar nanti & kembali ke Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

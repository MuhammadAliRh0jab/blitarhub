import React, { useState } from 'react';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';

export default function CoverPhotoUpload({ type, className = '' }) {
    const { auth } = usePage().props;

    // Determine initial cover url from auth user's talent/mentor relation
    const profile = auth?.user?.talent ?? auth?.user?.mentor ?? null;
    const [preview, setPreview] = useState(profile?.cover_url ?? null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('cover', file);
        formData.append('type', type); // 'talent' or 'mentor'

        try {
            const res = await axios.post('/upload/cover', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setPreview(res.data.url);
            router.reload({ only: ['auth'] });
        } catch (err) {
            console.error(err);
            alert('Gagal mengunggah foto sampul.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={className}>
            <header className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Foto Sampul</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Perbarui foto sampul profil Anda (maks. 5MB). Disarankan ukuran 1500×500px.
                </p>
            </header>

            <div className="relative w-full h-44 rounded-xl overflow-hidden group shadow-md border border-gray-100">
                {/* Cover image or gradient fallback */}
                {preview ? (
                    <img
                        src={preview}
                        alt="Cover photo"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500" />
                )}

                {/* Hover overlay */}
                <label
                    htmlFor="cover-photo-input"
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer
                        bg-black/0 group-hover:bg-black/30 transition-all duration-200
                        ${loading ? 'bg-black/30' : ''}`}
                >
                    <div className={`flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${loading ? 'opacity-100' : ''}`}>
                        {loading ? (
                            <svg className="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                            </svg>
                        ) : (
                            <>
                                <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    Ganti Foto Sampul
                                </div>
                            </>
                        )}
                    </div>
                    <input
                        id="cover-photo-input"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                </label>
            </div>
        </section>
    );
}

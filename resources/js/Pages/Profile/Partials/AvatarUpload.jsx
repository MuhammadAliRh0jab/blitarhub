import React, { useState } from 'react';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';

export default function AvatarUpload({ className = '' }) {
    const user = usePage().props.auth.user;
    const [preview, setPreview] = useState(user.avatar_url);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const res = await axios.post('/upload/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setPreview(res.data.url);
            router.reload({ only: ['auth'] });
        } catch (err) {
            console.error(err);
            alert('Gagal mengunggah foto profil.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={className}>
            <header className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">Foto Profil</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Perbarui foto profil akun Anda (maks. 2MB).
                </p>
            </header>

            <div className="flex items-center gap-5">
                {/* Avatar preview */}
                <div className="relative shrink-0 group">
                    <img
                        className="h-20 w-20 object-cover rounded-full shadow border-2 border-orange-100"
                        src={
                            preview ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=fb923c&color=ffffff`
                        }
                        alt="Foto profil"
                    />
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                            </svg>
                        </div>
                    )}
                </div>

                {/* Upload controls */}
                <div>
                    <label
                        htmlFor="avatar-input"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-300 bg-orange-50 text-orange-700 font-semibold text-sm cursor-pointer hover:bg-orange-100 transition disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                        </svg>
                        Pilih Foto
                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={loading}
                            className="sr-only"
                        />
                    </label>
                    <p className="mt-2 text-xs text-gray-400">JPG, PNG, atau GIF. Maks 2MB.</p>
                </div>
            </div>
        </section>
    );
}


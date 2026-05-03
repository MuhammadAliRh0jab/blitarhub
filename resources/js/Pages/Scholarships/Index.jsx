import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ScholarshipIndex({ auth, campaigns }) {
    // Helper to format currency
    const formatRp = (num) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Beasiswa & Donasi</h2>}>
            <Head title="Scholarships" />

            <div className="py-12 bg-[#F8FAFC] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Wujudkan Mimpi Bersama</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Mari berdonasi untuk mendukung pendidikan dan talenta digital di seluruh Indonesia.</p>
                    </div>

                    {/* Campaigns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {campaigns.map(campaign => {
                            const progress = campaign.target_amount > 0 ? Math.min(100, Math.round((campaign.current_amount / campaign.target_amount) * 100)) : 0;
                            
                            return (
                                <Link key={campaign.id} href={route('scholarships.show', campaign.id)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        <img src={`https://source.unsplash.com/600x400/?education,student&sig=${campaign.id}`} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                                            {campaign.category || 'Pendidikan'}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition line-clamp-2">{campaign.title}</h2>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{campaign.description}</p>
                                        
                                        <div className="mt-auto">
                                            <div className="flex justify-between text-sm mb-2 font-medium">
                                                <span className="text-gray-500">Terkumpul</span>
                                                <span className="text-orange-600 font-bold">{progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                                                <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Total Donasi</p>
                                                    <p className="font-bold text-gray-900">{formatRp(campaign.current_amount)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500 mb-1">Sisa Hari</p>
                                                    <p className="font-bold text-gray-900">{campaign.days_left}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {campaigns.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                            <p className="text-gray-500 text-lg">Belum ada kampanye donasi saat ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

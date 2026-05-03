import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function ScholarshipShow({ auth, campaign }) {
    const [activeTab, setActiveTab] = useState('cerita'); // cerita, update, donatur
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        campaign_id: campaign.id,
        amount: '',
        donor_name: auth.user?.name || '',
        message: '',
        is_anonymous: false
    });

    const formatRp = (num) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    };

    const progress = campaign.target_amount > 0 ? Math.min(100, Math.round((campaign.current_amount / campaign.target_amount) * 100)) : 0;

    const predefinedAmounts = [10000, 25000, 50000, 100000];

    const submitDonation = (e) => {
        e.preventDefault();
        post(route('donations.store'), {
            onSuccess: () => {
                setIsDonateModalOpen(false);
                reset();
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Detail Kampanye</h2>}>
            <Head title={campaign.title} />

            <div className="py-12 bg-[#F8FAFC] min-h-screen">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Header Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-200">
                                <img src={`https://source.unsplash.com/800x600/?education,student&sig=${campaign.id}`} alt={campaign.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-4 w-max uppercase tracking-wider">{campaign.category || 'Pendidikan'}</span>
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{campaign.title}</h1>
                                
                                <div className="mb-8">
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span className="text-gray-500">Terkumpul</span>
                                        <span className="text-orange-600 font-bold">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                                        <div className="bg-orange-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Total Donasi</p>
                                            <p className="font-bold text-2xl text-gray-900">{formatRp(campaign.current_amount)}</p>
                                            <p className="text-xs text-gray-400 mt-1">dari target {formatRp(campaign.target_amount)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 mb-1">Sisa Hari</p>
                                            <p className="font-bold text-2xl text-gray-900">{campaign.days_left}</p>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => setIsDonateModalOpen(true)} className="w-full bg-orange-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                    Donasi Sekarang
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Area */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                            <button onClick={() => setActiveTab('cerita')} className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition ${activeTab === 'cerita' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Cerita</button>
                            <button onClick={() => setActiveTab('update')} className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition ${activeTab === 'update' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Kabar Terbaru ({campaign.updates?.length || 0})</button>
                            <button onClick={() => setActiveTab('donatur')} className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition ${activeTab === 'donatur' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Donatur ({campaign.donations?.length || 0})</button>
                        </div>

                        {activeTab === 'cerita' && (
                            <div className="prose max-w-none text-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Penggalang Dana</h3>
                                <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl">
                                        {campaign.organizer ? campaign.organizer.charAt(0) : 'O'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{campaign.organizer}</p>
                                        <p className="text-sm text-gray-500">Terverifikasi</p>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Kisah Kampanye</h3>
                                <div className="whitespace-pre-line leading-relaxed">
                                    {campaign.description}
                                </div>
                            </div>
                        )}

                        {activeTab === 'update' && (
                            <div className="space-y-6">
                                {campaign.updates?.length > 0 ? campaign.updates.map(update => (
                                    <div key={update.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative">
                                        <div className="absolute top-6 right-6 text-sm font-bold text-gray-400">{update.date_label}</div>
                                        <p className="text-gray-700 whitespace-pre-line leading-relaxed pr-24">{update.text}</p>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 text-gray-500">Belum ada kabar terbaru.</div>
                                )}
                            </div>
                        )}

                        {activeTab === 'donatur' && (
                            <div className="space-y-4">
                                {campaign.donations?.length > 0 ? campaign.donations.map(don => (
                                    <div key={don.id} className={`flex gap-4 p-4 border rounded-2xl bg-white transition ${don.payment_status === 'pending_verification' ? 'border-blue-200 shadow-sm' : 'border-gray-100 hover:shadow-sm'}`}>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${don.payment_status === 'pending_verification' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                            {don.is_anonymous ? 'A' : don.donor_name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-gray-900">{don.is_anonymous ? 'Orang Baik' : don.donor_name}</h4>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-xs text-gray-400 font-medium">{don.time_label}</span>
                                                    {don.payment_status === 'pending_verification' && (
                                                        <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded uppercase mt-1">Menunggu Verifikasi</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className={`font-bold text-sm mb-2 ${don.payment_status === 'pending_verification' ? 'text-gray-500' : 'text-orange-600'}`}>
                                                Berdonasi {formatRp(don.amount)}
                                            </p>
                                            {don.message && (
                                                <div className="p-3 bg-[#EEF3F8] rounded-xl rounded-tl-none inline-block text-sm text-gray-700 italic mb-2">
                                                    "{don.message}"
                                                </div>
                                            )}

                                            {auth.user && don.payment_status === 'pending_verification' && (
                                                <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                                    <p className="text-xs text-blue-800 font-bold mb-2 uppercase tracking-widest">Verifikasi Admin</p>
                                                    {don.payment_proof && (
                                                        <div className="mb-3">
                                                            <a href={don.payment_proof} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                                Lihat Bukti Transfer
                                                            </a>
                                                        </div>
                                                    )}
                                                    <div className="flex gap-2">
                                                        <button onClick={() => router.patch(route('donations.verify-payment', don.id), { status: 'paid' })} className="flex-1 bg-green-600 text-white hover:bg-green-700 py-2 rounded-lg text-xs font-bold transition shadow-sm">Verifikasi (Valid)</button>
                                                        <button onClick={() => router.patch(route('donations.verify-payment', don.id), { status: 'failed' })} className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 py-2 rounded-lg text-xs font-bold transition">Tolak (Tidak Valid)</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 text-gray-500">Belum ada donatur. Jadilah yang pertama!</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Donation Modal */}
            <Modal show={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} maxWidth="md">
                <form onSubmit={submitDonation} className="p-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Berdonasi Sekarang</h2>
                    <p className="text-gray-500 mb-6 text-sm line-clamp-1">Untuk: {campaign.title}</p>
                    
                    <div className="space-y-6">
                        <div>
                            <InputLabel value="Nominal Donasi (Minimal Rp 10.000)" />
                            <div className="grid grid-cols-2 gap-3 mt-2 mb-3">
                                {predefinedAmounts.map(amt => (
                                    <button 
                                        type="button" 
                                        key={amt} 
                                        onClick={() => setData('amount', amt)}
                                        className={`py-2 rounded-xl border text-sm font-bold transition ${data.amount === amt ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}
                                    >
                                        {formatRp(amt)}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-gray-500 font-bold">Rp</span>
                                <input 
                                    type="number" 
                                    className="w-full pl-10 border-gray-200 focus:ring-orange-500 focus:border-orange-500 rounded-xl"
                                    value={data.amount}
                                    onChange={e => setData('amount', e.target.value ? parseInt(e.target.value) : '')}
                                    placeholder="Nominal lainnya..."
                                    min="10000"
                                    required
                                />
                            </div>
                            <InputError message={errors.amount} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel value="Nama Lengkap" />
                            <TextInput 
                                className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" 
                                value={data.donor_name} 
                                onChange={e => setData('donor_name', e.target.value)} 
                                placeholder="Nama Anda"
                                required 
                            />
                            <label className="flex items-center mt-2 gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500"
                                    checked={data.is_anonymous}
                                    onChange={e => setData('is_anonymous', e.target.checked)}
                                />
                                <span className="text-sm text-gray-600">Sembunyikan nama saya (Anonim)</span>
                            </label>
                            <InputError message={errors.donor_name} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel value="Tulis Pesan & Doa (Opsional)" />
                            <textarea 
                                className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500 rounded-xl text-sm" 
                                rows="3"
                                value={data.message} 
                                onChange={e => setData('message', e.target.value)} 
                                placeholder="Semoga berkah dan bermanfaat..."
                            ></textarea>
                            <InputError message={errors.message} className="mt-1" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button type="submit" disabled={processing || !data.amount || data.amount < 10000} className="w-full bg-orange-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-700 transition disabled:opacity-50">
                            {processing ? 'Memproses...' : `Lanjutkan Pembayaran`}
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}

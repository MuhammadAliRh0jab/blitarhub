import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

// ─── Helper Components ────────────────────────────────────────────────────────

function Avatar({ src, name, size = 'lg', ring = false }) {
    const sizes = { sm: 'w-10 h-10 text-sm', md: 'w-14 h-14 text-base', lg: 'w-24 h-24 text-2xl', xl: 'w-32 h-32 text-3xl' };
    const ringClass = ring ? 'ring-4 ring-white shadow-xl' : '';
    if (src) {
        return <img src={src} alt={name} className={`${sizes[size]} ${ringClass} rounded-full object-cover flex-shrink-0 mt-16` } />;
    }
    return (
        <div className={`${sizes[size]} ${ringClass} rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-white flex-shrink-0 mt-16`}>
            {(name || '?').charAt(0)}
        </div>
    );
}

function SectionCard({ title, icon, children, action }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span>{icon}</span> {title}
                </h3>
                {action}
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

function EmptyState({ icon, text }) {
    return (
        <div className="text-center py-6 text-gray-400">
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-sm">{text}</p>
        </div>
    );
}

function EducationItem({ id, type, institution, degree, period, gpa, activities, description, isLast, onDelete }) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <div className="flex gap-4 group">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 font-bold text-xl border border-orange-100 flex-shrink-0">
                    🏛️
                </div>
                {!isLast && <div className="w-px flex-1 bg-gray-100 my-2" />}
            </div>
            <div className="flex-1 pb-8">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 text-base leading-tight">{institution}</h4>
                    <button 
                        onClick={() => onDelete(id, type)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-gray-700 mt-0.5">{degree}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{period}</p>
                {gpa && <p className="text-sm text-gray-600 mt-2 font-medium">Grade: {gpa}</p>}
                {activities && (
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold text-gray-700">Activities and societies:</span> {activities}
                    </p>
                )}
                {description && (
                    <div className="mt-3">
                        <p className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {description}
                        </p>
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-sm text-gray-400 hover:text-gray-600 mt-1 font-bold transition-colors"
                        >
                            {isExpanded ? '... see less' : '... more'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function TimelineItem({ id, type, role, company, period, description, isLast, onDelete }) {
    return (
        <div className="flex gap-4 group">
            <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 ring-2 ring-orange-100 mt-1 flex-shrink-0" />
                {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1" />}
            </div>
            <div className={`pb-6 flex-1 ${isLast ? '' : ''}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-gray-900 text-sm">{role}</p>
                        <p className="text-orange-600 text-xs font-semibold">{company}</p>
                        {period && <p className="text-xs text-gray-400 mt-0.5">{period}</p>}
                    </div>
                    <button 
                        onClick={() => onDelete(id, type)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                {description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{description}</p>}
            </div>
        </div>
    );
}

function ProjectCard({ id, emoji, name, desc, tech, onDelete }) {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group relative">
            <button 
                onClick={() => onDelete(id)}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{emoji || '💻'}</span>
                <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
            </div>
            {desc && <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{desc}</p>}
            {tech && tech.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {tech.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] font-bold bg-orange-50 text-orange-700 rounded-full border border-orange-100">{t}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

function ProgramCard({ title, price, duration, format, enrolled }) {
    return (
        <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
            <div>
                <p className="font-bold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{duration} • {format}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                <p className="font-bold text-purple-700 text-sm">{price}</p>
                <p className="text-xs text-gray-400">{enrolled} enrolled</p>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Dashboard({ auth, userProfile }) {
    const profile = userProfile || auth.user;
    if (!profile) return <div className="flex items-center justify-center h-screen"><p className="text-gray-500">Memuat profil...</p></div>;

    const [activeModal, setActiveModal] = useState(null); // 'exp', 'edu', 'project', 'skills', 'achievement', 'session', 'review'
    const [activeTab, setActiveTab] = useState('profil'); // 'profil', 'kelola-mentorship', 'mentorship-saya'
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);

    const isTalent = !!profile.talent;
    const isMentor = !!profile.mentor;

    const talent = profile.talent;
    const mentor = profile.mentor;

    const talentExperiences = talent?.experiences ?? [];
    const talentProjects    = talent?.projects ?? [];
    const talentEducations  = talent?.educations ?? [];
    const talentAchievements = talent?.achievements ?? [];

    const mentorExperiences = mentor?.experiences ?? [];
    const mentorPrograms    = mentor?.programs ?? [];
    const mentorEducations  = mentor?.educations ?? [];
    const mentorAchievements = mentor?.achievements ?? [];

    const myRegistrations = profile.mentorship_registrations ?? [];

    const avatarUrl = profile.avatar_url;
    const coverUrl  = talent?.cover_url || mentor?.cover_url;
    const coverBg   = 'from-orange-600 via-orange-500 to-amber-600';

    // ── Forms ─────────────────────────────────────────────────────────────────

    const expForm = useForm({
        role: '',
        company: '',
        period: '',
        description: '',
    });

    const eduForm = useForm({
        institution: '',
        degree: '',
        year: '',
        gpa: '',
        type: isMentor ? 'mentor' : 'talent',
    });

    const projectForm = useForm({
        name: '',
        description: '',
        tech: '',
    });

    const skillForm = useForm({
        skills: talent?.skills?.map(s => s.name).join(', ') || '',
    });

    const achForm = useForm({
        title: '',
        issuer: '',
        year: '',
        emoji: '🏆',
        type: isMentor ? 'mentor' : 'talent',
    });

    const bioForm = useForm({
        bio: mentor?.bio || talent?.bio || '',
    });

    const bankForm = useForm({
        bank_name: mentor?.bank_name || '',
        bank_account_number: mentor?.bank_account_number || '',
        bank_account_name: mentor?.bank_account_name || '',
    });

    const sessionForm = useForm({
        title: '',
        date: '',
        start_time: '',
        end_time: '',
        meeting_link: '',
    });

    const reviewForm = useForm({
        stars: 5,
        comment: '',
        registration_id: '',
    });

    const submitExp = (e) => {
        e.preventDefault();
        const routeName = isMentor ? 'profile.mentor-experience.store' : 'profile.talent-experience.store';
        expForm.post(route(routeName), {
            onSuccess: () => { setActiveModal(null); expForm.reset(); }
        });
    };

    const submitEdu = (e) => {
        e.preventDefault();
        eduForm.post(route('profile.education.store'), {
            onSuccess: () => { setActiveModal(null); eduForm.reset(); }
        });
    };

    const submitProject = (e) => {
        e.preventDefault();
        projectForm.post(route('profile.talent-portfolio.store'), {
            onSuccess: () => { setActiveModal(null); projectForm.reset(); }
        });
    };

    const submitSkills = (e) => {
        e.preventDefault();
        skillForm.post(route('profile.skills.update'), {
            onSuccess: () => { setActiveModal(null); }
        });
    };

    const submitAch = (e) => {
        e.preventDefault();
        achForm.post(route('profile.achievement.store'), {
            onSuccess: () => { setActiveModal(null); achForm.reset(); }
        });
    };

    const submitBio = (e) => {
        e.preventDefault();
        bioForm.post(route('profile.bio.update'), {
            onSuccess: () => { setActiveModal(null); }
        });
    };

    const submitBank = (e) => {
        e.preventDefault();
        bankForm.post(route('profile.mentor-bank.update'), {
            onSuccess: () => { setActiveModal(null); }
        });
    };

    const submitSession = (e) => {
        e.preventDefault();
        if (selectedProgram) {
            sessionForm.post(route('mentor.sessions.store', selectedProgram.id), {
                onSuccess: () => { setActiveModal(null); sessionForm.reset(); }
            });
        }
    };

    const submitReview = (e) => {
        e.preventDefault();
        if (selectedRegistration) {
            reviewForm.post(route('mentors.reviews.store', selectedRegistration.program.mentor.id), {
                onSuccess: () => { setActiveModal(null); reviewForm.reset(); }
            });
        }
    };

    const handleApprove = (regId) => {
        if(confirm('Terima pendaftaran ini?')) {
            router.patch(route('mentor.registrations.approve', regId));
        }
    };

    const handleReject = (regId) => {
        if(confirm('Tolak pendaftaran ini?')) {
            router.patch(route('mentor.registrations.reject', regId));
        }
    };

    const deleteItem = (id, type) => {
        if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;

        let deleteRoute;
        if (type === 'mentor-exp') deleteRoute = route('profile.mentor-experience.destroy', id);
        if (type === 'talent-exp') deleteRoute = route('profile.talent-experience.destroy', id);
        if (type === 'mentor-edu') deleteRoute = route('profile.mentor-education.destroy', id);
        if (type === 'talent-edu') deleteRoute = route('profile.talent-education.destroy', id);
        if (type === 'project')    deleteRoute = route('profile.talent-project.destroy', id);
        if (type === 'mentor-ach') deleteRoute = route('profile.mentor-achievement.destroy', id);
        if (type === 'talent-ach') deleteRoute = route('profile.talent-achievement.destroy', id);

        router.delete(deleteRoute);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard — Profil Saya" />

            <div className="min-h-screen bg-gray-50 pb-20">

                {/* ── Cover + Profile Header ── */}
                <div className={`h-52 relative overflow-hidden`}>
                    {coverUrl ? (
                        <img src={coverUrl} alt="Cover photo" className="w-full h-full object-cover" />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-r ${coverBg}`}>
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Profile Identity Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 -mt-10 relative z-10 mb-6 overflow-hidden font-sans">
                        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end gap-5">
                            <div className="-mt-14 sm:-mt-16 flex-shrink-0">
                                <Avatar src={avatarUrl} name={profile.name} size="xl" ring={true} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{profile.name}</h1>
                                <p className="text-gray-500 text-sm mt-0.5">{profile.email}</p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {isTalent && (
                                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full ring-1 ring-orange-200">
                                            🚀 Talent  {talent.rating > 0 && <span className="ml-1">· ⭐ {talent.rating}</span>}
                                        </span>
                                    )}
                                    {isMentor && (
                                        <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full ring-1 ring-orange-100">
                                            🎓 Mentor {mentor.rating > 0 && <span className="ml-1">· ⭐ {mentor.rating}</span>}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 flex-shrink-0">
                                <Link href={route('profile.edit')} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-600 hover:shadow-sm transition">
                                    ⚙️ Pengaturan
                                </Link>
                            </div>
                        </div>

                        {/* Stats Row */}
                        {(isTalent || isMentor) && (
                            <div className="border-t border-gray-100 px-6 sm:px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-orange-50/30">
                                {isTalent && <>
                                    <div className="text-center">
                                        <p className="text-xl font-extrabold text-orange-600">{talentProjects.length}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Portofolio</p>
                                    </div>
                                    <div className="text-center border-l border-gray-100">
                                        <p className="text-xl font-extrabold text-orange-600">{talent.jobs_completed ?? 0}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Proyek Selesai</p>
                                    </div>
                                </>}
                                {isMentor && <>
                                    <div className="text-center border-l border-gray-100">
                                        <p className="text-xl font-extrabold text-orange-600">{mentor.mentees_count ?? 0}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Mentee</p>
                                    </div>
                                    <div className="text-center border-l border-gray-100">
                                        <p className="text-xl font-extrabold text-orange-600">{mentorPrograms.length}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Program</p>
                                    </div>
                                </>}
                            </div>
                        )}
                        
                        {/* ── Tabs Navigation ── */}
                        <div className="border-t border-gray-100 flex overflow-x-auto">
                            <button onClick={() => setActiveTab('profil')} className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition ${activeTab === 'profil' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>Profil Publik</button>
                            {isMentor && (
                                <button onClick={() => setActiveTab('kelola-mentorship')} className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition ${activeTab === 'kelola-mentorship' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>Kelola Mentorship</button>
                            )}
                            {myRegistrations.length > 0 && (
                                <button onClick={() => setActiveTab('mentorship-saya')} className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition ${activeTab === 'mentorship-saya' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>Mentorship Saya</button>
                            )}
                        </div>
                    </div>

                    {/* ── Main Content Area ── */}
                    {activeTab === 'profil' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">

                        {/* Left Column */}
                        <div className="space-y-6">

                            {/* Talent Skills */}
                            {isTalent && (
                                <SectionCard title="Keahlian" icon="🛠️" action={
                                    <button onClick={() => setActiveModal('skills')} className="text-xs text-orange-600 font-bold hover:underline">Edit</button>
                                }>
                                    {talent.skills && talent.skills.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {talent.skills.map((sk, i) => (
                                                <span key={i} className="px-3 py-1 text-xs font-bold bg-orange-50 text-orange-700 border border-orange-100 rounded-full">
                                                    {sk.name}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <EmptyState icon="🛠️" text="Belum ada keahlian." />
                                    )}
                                </SectionCard>
                            )}

                            {/* Achievements */}
                            <SectionCard title="Pencapaian" icon="🏆" action={
                                <button onClick={() => setActiveModal('achievement')} className="text-gray-400 hover:text-orange-600 transition p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            }>
                                <div className="space-y-3">
                                    {mentorAchievements.map((a, i) => (
                                        <div key={`m-ach-${a.id}`} className="flex items-start gap-3 bg-orange-50 border border-orange-100 p-3 rounded-xl group relative">
                                            <span className="text-xl flex-shrink-0">{a.emoji || '🏆'}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 text-sm truncate">{a.title}</p>
                                                <p className="text-xs text-gray-500">{a.issuer} · {a.year}</p>
                                            </div>
                                            <button onClick={() => deleteItem(a.id, 'mentor-ach')} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    {talentAchievements.map((a, i) => (
                                        <div key={`t-ach-${a.id}`} className="flex items-start gap-3 bg-orange-50 border border-orange-100 p-3 rounded-xl group relative">
                                            <span className="text-xl flex-shrink-0">{a.emoji || '🏆'}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 text-sm truncate">{a.title}</p>
                                                <p className="text-xs text-gray-500">{a.issuer} · {a.year}</p>
                                            </div>
                                            <button onClick={() => deleteItem(a.id, 'talent-ach')} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    {talentAchievements.length === 0 && mentorAchievements.length === 0 && (
                                        <EmptyState icon="🏆" text="Belum ada pencapaian." />
                                    )}
                                </div>
                            </SectionCard>

                            {/* Education */}
                            {(talentEducations.length > 0 || mentorEducations.length > 0) && (
                                <SectionCard 
                                    title="Pendidikan" 
                                    icon="🏛️"
                                    action={
                                        <button onClick={() => setActiveModal('edu')} className="text-gray-400 hover:text-orange-600 transition p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    }
                                >
                                    <div className="space-y-2">
                                        {mentorEducations.map((edu, i) => (
                                            <EducationItem key={`m-edu-${edu.id}`} id={edu.id} type="mentor-edu" institution={edu.institution} degree={edu.degree} period={edu.start_year && edu.end_year ? `${edu.start_year} – ${edu.end_year}` : (edu.year || '')} gpa={edu.gpa} activities={edu.activities} description={edu.description} isLast={i === mentorEducations.length - 1 && talentEducations.length === 0} onDelete={deleteItem} />
                                        ))}
                                        {talentEducations.map((edu, i) => (
                                            <EducationItem key={`t-edu-${edu.id}`} id={edu.id} type="talent-edu" institution={edu.institution} degree={edu.degree} period={edu.start_year && edu.end_year ? `${edu.start_year} – ${edu.end_year}` : (edu.year || '')} gpa={edu.gpa} activities={edu.activities} description={edu.description} isLast={i === talentEducations.length - 1} onDelete={deleteItem} />
                                        ))}
                                    </div>
                                </SectionCard>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* About / Bio */}
                            <SectionCard title="Tentang Saya" icon="👤" action={
                                <button onClick={() => setActiveModal('bio')} className="text-xs text-orange-600 font-bold hover:underline">Edit</button>
                            }>
                                {mentor?.bio || talent?.bio ? (
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                        {mentor?.bio || talent?.bio}
                                    </p>
                                ) : (
                                    <EmptyState icon="👤" text="Ceritakan sedikit tentang siapa Anda." />
                                )}
                            </SectionCard>

                            {/* Experience Timeline */}
                            <SectionCard title="Pengalaman Karir" icon="💼" action={
                                <button onClick={() => setActiveModal('exp')} className="text-xs text-orange-600 font-bold hover:underline transition">+ Tambah</button>
                            }>
                                <div className="space-y-1">
                                    {mentorExperiences.map((exp, i) => (
                                        <TimelineItem key={`m-exp-${exp.id}`} id={exp.id} type="mentor-exp" role={exp.role} company={exp.company} period={exp.period} description={exp.description} isLast={i === mentorExperiences.length - 1 && talentExperiences.length === 0} onDelete={deleteItem} />
                                    ))}
                                    {talentExperiences.map((exp, i) => (
                                        <TimelineItem key={`t-exp-${exp.id}`} id={exp.id} type="talent-exp" role={exp.role} company={exp.company} period={exp.period} description={exp.description} isLast={i === talentExperiences.length - 1} onDelete={deleteItem} />
                                    ))}
                                    {talentExperiences.length === 0 && mentorExperiences.length === 0 && (
                                        <EmptyState icon="💼" text="Belum ada pengalaman. Tambahkan pengalaman terbaik Anda." />
                                    )}
                                </div>
                            </SectionCard>

                            {/* Portfolio / Projects */}
                            {isTalent && (
                                <SectionCard title="Portofolio Proyek" icon="🗂️" action={
                                    <button onClick={() => setActiveModal('project')} className="text-xs text-orange-600 font-bold hover:underline transition">+ Tambah</button>
                                }>
                                    {talentProjects.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {talentProjects.map((p, i) => (
                                                <ProjectCard key={p.id} id={p.id} emoji={p.emoji} name={p.name} desc={p.description} tech={typeof p.tech === 'string' ? JSON.parse(p.tech) : (p.tech ?? [])} onDelete={(id) => deleteItem(id, 'project')} />
                                            ))}
                                        </div>
                                    ) : (
                                        <EmptyState icon="🗂️" text="Belum ada portofolio proyek." />
                                    )}
                                </SectionCard>
                            )}
                        </div>
                    </div>
                    )}

                    {activeTab === 'kelola-mentorship' && isMentor && (
                        <div className="space-y-6 pb-12">
                            {mentorPrograms.map(program => (
                                <div key={program.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{program.title}</h2>
                                            <p className="text-sm text-gray-500">{program.price} • {program.format}</p>
                                        </div>
                                        <button onClick={() => { setSelectedProgram(program); setActiveModal('session'); }} className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-200 transition">
                                            + Buat Jadwal Sesi
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Pendaftar */}
                                        <div>
                                            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><span className="text-lg">👥</span> Pendaftar</h3>
                                            {program.registrations?.length > 0 ? (
                                                <div className="space-y-3">
                                                    {program.registrations.map(reg => (
                                                        <div key={reg.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
                                                            <div className="flex items-center gap-3 mb-3">
                                                                {reg.user?.talent ? (
                                                                    <Link href={route('talents.show', reg.user.talent.id)} className="flex items-center gap-3 group">
                                                                        <Avatar src={reg.user?.avatar_url} name={reg.user?.name} size="sm" />
                                                                        <div>
                                                                            <p className="font-bold text-sm text-gray-900 group-hover:text-orange-600 transition">{reg.user?.name}</p>
                                                                            <p className="text-xs text-gray-500">{reg.user?.email}</p>
                                                                        </div>
                                                                    </Link>
                                                                ) : (
                                                                    <div className="flex items-center gap-3">
                                                                        <Avatar src={reg.user?.avatar_url} name={reg.user?.name} size="sm" />
                                                                        <div>
                                                                            <p className="font-bold text-sm text-gray-900">{reg.user?.name}</p>
                                                                            <p className="text-xs text-gray-500">{reg.user?.email}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="ml-auto flex flex-col items-end gap-1">
                                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${reg.status === 'pending' ? 'bg-amber-100 text-amber-700' : reg.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{reg.status}</span>
                                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${reg.payment_status === 'paid' ? 'bg-green-100 text-green-700' : reg.payment_status === 'pending_verification' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{reg.payment_status.replace('_', ' ')}</span>
                                                                </div>
                                                            </div>
                                                            {reg.message && <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mb-3 italic">"{reg.message}"</p>}
                                                            
                                                            {reg.payment_proof && (
                                                                <div className="mb-3">
                                                                    <a href={reg.payment_proof} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1">
                                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                                        Lihat Bukti Transfer
                                                                    </a>
                                                                </div>
                                                            )}

                                                            {reg.status === 'pending' && reg.payment_status === 'pending_verification' && (
                                                                <div className="flex gap-2 mt-2">
                                                                    <button onClick={() => router.patch(route('mentorship-registrations.verify-payment', reg.id), { status: 'paid' })} className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 py-1.5 rounded-lg text-xs font-bold transition">Verifikasi (Valid)</button>
                                                                    <button onClick={() => router.patch(route('mentorship-registrations.verify-payment', reg.id), { status: 'rejected' })} className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 py-1.5 rounded-lg text-xs font-bold transition">Tolak (Tidak Valid)</button>
                                                                </div>
                                                            )}
                                                            {reg.status === 'pending' && reg.payment_status !== 'pending_verification' && (
                                                                <div className="flex gap-2 mt-2">
                                                                    <button onClick={() => handleApprove(reg.id)} className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 py-1.5 rounded-lg text-xs font-bold transition">Terima</button>
                                                                    <button onClick={() => handleReject(reg.id)} className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 py-1.5 rounded-lg text-xs font-bold transition">Tolak</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl text-center border border-gray-100">Belum ada pendaftar.</p>
                                            )}
                                        </div>

                                        {/* Sesi Terjadwal */}
                                        <div>
                                            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><span className="text-lg">📅</span> Sesi Terjadwal</h3>
                                            {program.sessions?.length > 0 ? (
                                                <div className="space-y-3">
                                                    {program.sessions.map(sess => (
                                                        <div key={sess.id} className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{sess.title}</h4>
                                                            <p className="text-xs text-gray-600 mb-2 font-medium">🗓️ {sess.date} • {sess.start_time} - {sess.end_time}</p>
                                                            <a href={sess.meeting_link} target="_blank" rel="noreferrer" className="inline-block text-xs font-bold text-orange-600 hover:underline">🔗 Buka Link Meeting</a>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl text-center border border-gray-100">Belum ada sesi terjadwal.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'mentorship-saya' && (
                        <div className="space-y-6 pb-12">
                            {myRegistrations.map(reg => (
                                <div key={reg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Avatar src={reg.program?.mentor?.user?.avatar_url} name={reg.program?.mentor?.user?.name} size="md" />
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900">{reg.program?.title}</h2>
                                                <p className="text-sm text-gray-500">Mentor: {reg.program?.mentor?.user?.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mb-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${reg.status === 'pending' ? 'bg-amber-100 text-amber-700' : reg.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>Status: {reg.status}</span>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${reg.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>Bayar: {reg.payment_status}</span>
                                        </div>
                                        {reg.payment_status === 'unpaid' && reg.status !== 'rejected' && (
                                            <Link href={route('mentorship-registrations.store', { mentorship_program_id: reg.program?.id })} method="post" className="inline-block bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-orange-700 transition">
                                                Lanjutkan Pembayaran
                                            </Link>
                                        )}
                                        {reg.status === 'approved' && (
                                            <button onClick={() => { setSelectedRegistration(reg); reviewForm.setData('registration_id', reg.id); setActiveModal('review'); }} className="mt-4 inline-block bg-gray-100 text-gray-700 text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                                                ⭐ Berikan Ulasan
                                            </button>
                                        )}
                                    </div>
                                    <div className="w-full md:w-1/2 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <h3 className="font-bold text-gray-700 mb-3 text-sm">Jadwal Sesi Mendatang</h3>
                                        {reg.program?.sessions?.length > 0 ? (
                                            <div className="space-y-2">
                                                {reg.program.sessions.map(sess => (
                                                    <div key={sess.id} className="bg-white border border-gray-200 rounded p-3">
                                                        <h4 className="font-bold text-gray-900 text-xs mb-1">{sess.title}</h4>
                                                        <p className="text-[10px] text-gray-500 mb-2">🗓️ {sess.date} • {sess.start_time} - {sess.end_time}</p>
                                                        {(reg.status === 'approved' && reg.payment_status === 'paid') ? (
                                                            <a href={sess.meeting_link} target="_blank" rel="noreferrer" className="text-xs font-bold text-orange-600 hover:underline">Masuk Ruangan</a>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-400 italic">Selesaikan pembayaran/persetujuan untuk masuk.</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-500 italic">Mentor belum membuat jadwal sesi.</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Modals ──────────────────────────────────────────────────────── */}

            {/* Experience Modal */}
            <Modal show={activeModal === 'exp'} onClose={() => setActiveModal(null)}>
                <form onSubmit={submitExp} className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600">💼</span> Tambah Pengalaman Karir
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Jabatan / Role" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={expForm.data.role} onChange={e => expForm.setData('role', e.target.value)} placeholder="Contoh: Senior Frontend Developer" required />
                            <InputError message={expForm.errors.role} />
                        </div>
                        <div>
                            <InputLabel value="Perusahaan" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={expForm.data.company} onChange={e => expForm.setData('company', e.target.value)} placeholder="Contoh: Google atau StartUp Blitar" required />
                            <InputError message={expForm.errors.company} />
                        </div>
                        <div>
                            <InputLabel value="Periode (Tahun)" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={expForm.data.period} onChange={e => expForm.setData('period', e.target.value)} placeholder="Contoh: 2022 - Kini" />
                            <InputError message={expForm.errors.period} />
                        </div>
                        <div>
                            <InputLabel value="Deskripsi Pekerjaan" />
                            <textarea className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500 rounded-md shadow-sm text-sm" rows="3" value={expForm.data.description} onChange={e => expForm.setData('description', e.target.value)} placeholder="Apa yang Anda kerjakan di sini?"></textarea>
                            <InputError message={expForm.errors.description} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActiveModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800" disabled={expForm.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Education Modal */}
            <Modal show={activeModal === 'edu'} onClose={() => setActiveModal(null)}>
                <form onSubmit={submitEdu} className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600">🏛️</span> Tambah Pendidikan
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Nama Institusi" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={eduForm.data.institution} onChange={e => eduForm.setData('institution', e.target.value)} placeholder="Contoh: Universitas Brawijaya" required />
                            <InputError message={eduForm.errors.institution} />
                        </div>
                        <div>
                            <InputLabel value="Gelar / Bidang Studi" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={eduForm.data.degree} onChange={e => eduForm.setData('degree', e.target.value)} placeholder="Contoh: S1 Teknik Informatika" required />
                            <InputError message={eduForm.errors.degree} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Tahun" />
                                <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={eduForm.data.year} onChange={e => eduForm.setData('year', e.target.value)} placeholder="2015 - 2019" />
                            </div>
                            <div>
                                <InputLabel value="IPK / Grade" />
                                <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={eduForm.data.gpa} onChange={e => eduForm.setData('gpa', e.target.value)} placeholder="3.80" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActiveModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800" disabled={eduForm.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Achievement Modal */}
            <Modal show={activeModal === 'achievement'} onClose={() => setActiveModal(null)}>
                <form onSubmit={submitAch} className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600">🏆</span> Tambah Pencapaian
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Judul Pencapaian" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={achForm.data.title} onChange={e => achForm.setData('title', e.target.value)} placeholder="Contoh: Juara 1 UI/UX Design Competition" required />
                            <InputError message={achForm.errors.title} />
                        </div>
                        <div>
                            <InputLabel value="Penyelenggara / Penerbit" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={achForm.data.issuer} onChange={e => achForm.setData('issuer', e.target.value)} placeholder="Contoh: Google Indonesia" required />
                            <InputError message={achForm.errors.issuer} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Tahun" />
                                <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={achForm.data.year} onChange={e => achForm.setData('year', e.target.value)} placeholder="2023" />
                                <InputError message={achForm.errors.year} />
                            </div>
                            <div>
                                <InputLabel value="Ikon (Emoji)" />
                                <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={achForm.data.emoji} onChange={e => achForm.setData('emoji', e.target.value)} placeholder="🏆" />
                                <InputError message={achForm.errors.emoji} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActiveModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800" disabled={achForm.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Project Modal */}
            <Modal show={activeModal === 'project'} onClose={() => setActiveModal(null)}>
                <form onSubmit={submitProject} className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600">🗂️</span> Tambah Portofolio Proyek
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Nama Proyek" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={projectForm.data.name} onChange={e => projectForm.setData('name', e.target.value)} placeholder="Contoh: E-Commerce Mobile App" required />
                            <InputError message={projectForm.errors.name} />
                        </div>
                        <div>
                            <InputLabel value="Deskripsi Proyek" />
                            <textarea className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500 rounded-md shadow-sm text-sm" rows="3" value={projectForm.data.description} onChange={e => projectForm.setData('description', e.target.value)} placeholder="Ceritakan tentang proyek ini..."></textarea>
                            <InputError message={projectForm.errors.description} />
                        </div>
                        <div>
                            <InputLabel value="Teknologi (Pisahkan dengan koma)" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={projectForm.data.tech} onChange={e => projectForm.setData('tech', e.target.value)} placeholder="React, Node.js, Tailwind" />
                            <InputError message={projectForm.errors.tech} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActiveModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800" disabled={projectForm.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Skills Modal */}
            <Modal show={activeModal === 'skills'} onClose={() => setActiveModal(null)}>
                <form onSubmit={submitSkills} className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600">🛠️</span> Edit Keahlian
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Daftar Keahlian (Pisahkan dengan koma)" />
                            <textarea className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500 rounded-md shadow-sm text-sm font-bold text-gray-700" rows="5" value={skillForm.data.skills} onChange={e => skillForm.setData('skills', e.target.value)} placeholder="Contoh: React, Laravel, UI/UX, Node.js"></textarea>
                            <p className="text-[10px] text-gray-400 mt-2 font-medium">Hapus nama keahlian dari daftar di atas untuk menghapusnya dari profil Anda.</p>
                            <InputError message={skillForm.errors.skills} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActiveModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800" disabled={skillForm.processing}>Perbarui</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Bio Modal */}
            <Modal show={activeModal === 'bio'} onClose={() => setActiveModal(null)}>
                <form onSubmit={submitBio} className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600">👤</span> Edit Tentang Saya
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Ringkasan Profil" />
                            <textarea 
                                className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500 rounded-md shadow-sm text-sm font-medium text-gray-700" 
                                rows="8" 
                                value={bioForm.data.bio} 
                                onChange={e => bioForm.setData('bio', e.target.value)} 
                                placeholder="Ceritakan pengalaman, minat, atau apa yang sedang Anda kerjakan..."
                                required
                            ></textarea>
                            <InputError message={bioForm.errors.bio} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActiveModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800" disabled={bioForm.processing}>Perbarui</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Create Session Modal */}
            <Modal show={activeModal === 'session'} onClose={() => setActiveModal(null)}>
                <form onSubmit={submitSession} className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600">📅</span> Buat Jadwal Sesi
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Topik Sesi" />
                            <TextInput className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={sessionForm.data.title} onChange={e => sessionForm.setData('title', e.target.value)} placeholder="Contoh: Sesi 1 - Review Portofolio" required />
                            <InputError message={sessionForm.errors.title} />
                        </div>
                        <div>
                            <InputLabel value="Tanggal" />
                            <TextInput type="date" className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={sessionForm.data.date} onChange={e => sessionForm.setData('date', e.target.value)} required />
                            <InputError message={sessionForm.errors.date} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Jam Mulai" />
                                <TextInput type="time" className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={sessionForm.data.start_time} onChange={e => sessionForm.setData('start_time', e.target.value)} required />
                                <InputError message={sessionForm.errors.start_time} />
                            </div>
                            <div>
                                <InputLabel value="Jam Selesai" />
                                <TextInput type="time" className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={sessionForm.data.end_time} onChange={e => sessionForm.setData('end_time', e.target.value)} required />
                                <InputError message={sessionForm.errors.end_time} />
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Tautan Meeting (Zoom/GMeet)" />
                            <TextInput type="url" className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500" value={sessionForm.data.meeting_link} onChange={e => sessionForm.setData('meeting_link', e.target.value)} placeholder="https://meet.google.com/..." required />
                            <InputError message={sessionForm.errors.meeting_link} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActiveModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800" disabled={sessionForm.processing}>Buat Sesi</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Give Review Modal */}
            <Modal show={activeModal === 'review'} onClose={() => setActiveModal(null)}>
                <form onSubmit={submitReview} className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600">⭐</span> Berikan Ulasan Mentor
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Penilaian (Bintang 1-5)" />
                            <select className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500 rounded-xl" value={reviewForm.data.stars} onChange={e => reviewForm.setData('stars', e.target.value)} required>
                                <option value="5">⭐⭐⭐⭐⭐ (5) Sangat Baik</option>
                                <option value="4">⭐⭐⭐⭐ (4) Baik</option>
                                <option value="3">⭐⭐⭐ (3) Cukup</option>
                                <option value="2">⭐⭐ (2) Kurang</option>
                                <option value="1">⭐ (1) Sangat Kurang</option>
                            </select>
                            <InputError message={reviewForm.errors.stars} />
                        </div>
                        <div>
                            <InputLabel value="Ulasan & Pengalaman" />
                            <textarea className="w-full mt-1 border-gray-200 focus:ring-orange-500 focus:border-orange-500 rounded-xl" rows="4" value={reviewForm.data.comment} onChange={e => reviewForm.setData('comment', e.target.value)} placeholder="Bagaimana pengalaman bimbingan Anda?" required></textarea>
                            <InputError message={reviewForm.errors.comment} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActiveModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800" disabled={reviewForm.processing}>Kirim Ulasan</PrimaryButton>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
}

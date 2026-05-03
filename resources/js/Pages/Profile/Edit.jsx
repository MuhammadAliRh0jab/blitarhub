import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AvatarUpload from './Partials/AvatarUpload';
import CoverPhotoUpload from './Partials/CoverPhotoUpload';
import ManageMentorExperience from './Partials/ManageMentorExperience';
import ManageTalentExperience from './Partials/ManageTalentExperience';
import ManageTalentPortfolio from './Partials/ManageTalentPortfolio';
import ManageEducation from './Partials/ManageEducation';
import ManageSkills from './Partials/ManageSkills';

export default function Edit({ mustVerifyEmail, status, isMentor, isTalent }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profil Saya
                </h2>
            }
        >
            <Head title="Profil" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">

                    {/* Foto Sampul — hanya untuk Mentor atau Talent */}
                    {(isMentor || isTalent) && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <CoverPhotoUpload
                                type={isMentor ? 'mentor' : 'talent'}
                                className="max-w-2xl"
                            />
                        </div>
                    )}

                    {/* Foto Profil */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <AvatarUpload className="max-w-xl" />
                    </div>

                    {/* Informasi Profil */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {isMentor && (
                        <>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <ManageSkills type="mentor" className="max-w-xl" />
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <ManageMentorExperience isMentor={isMentor} className="max-w-xl" />
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <ManageEducation type="mentor" className="max-w-xl" />
                            </div>
                        </>
                    )}

                    {isTalent && (
                        <>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <ManageSkills type="talent" className="max-w-xl" />
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <ManageTalentExperience isTalent={isTalent} className="max-w-xl" />
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <ManageEducation type="talent" className="max-w-xl" />
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <ManageTalentPortfolio isTalent={isTalent} className="max-w-xl" />
                            </div>
                        </>
                    )}

                    {/* Ubah Password */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Hapus Akun */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}


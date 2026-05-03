import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function ManageSkills({ type, className = '' }) {
    const user = usePage().props.auth.user;
    const initialSkills = type === 'talent' 
        ? (user.talent?.skills?.map(s => s.name).join(', ') || '') 
        : (user.mentor?.expertise || '');

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        skills: type === 'talent' ? initialSkills : '',
        expertise: type === 'mentor' ? initialSkills : '',
    });

    const submitTalent = (e) => {
        e.preventDefault();
        post(route('profile.skills.update'), {
            preserveScroll: true,
        });
    };

    const submitMentor = (e) => {
        e.preventDefault();
        post(route('profile.mentor-expertise.update'), {
            preserveScroll: true,
        });
    };

    if (type === 'talent') {
        return (
            <section className={className}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Keahlian (Talent)</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Masukkan keahlian Anda, dipisahkan dengan koma (Cth: React, Node.js, Design).
                    </p>
                </header>

                <form onSubmit={submitTalent} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="skills" value="Keahlian" />
                        <TextInput
                            id="skills"
                            value={data.skills}
                            onChange={(e) => setData('skills', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.skills} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Simpan Keahlian</PrimaryButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Tersimpan.</p>
                        </Transition>
                    </div>
                </form>
            </section>
        );
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Bidang Keahlian (Mentor)</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Sebutkan bidang keahlian utama Anda sebagai Mentor.
                </p>
            </header>

            <form onSubmit={submitMentor} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="expertise" value="Keahlian Utama" />
                    <TextInput
                        id="expertise"
                        value={data.expertise}
                        onChange={(e) => setData('expertise', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.expertise} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan Keahlian</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

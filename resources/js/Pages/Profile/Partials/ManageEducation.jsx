import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function ManageEducation({ type, className = '' }) {
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        institution: '',
        degree: '',
        year: '',
        gpa: '',
        type: type, // 'mentor' or 'talent'
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.education.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Pendidikan ({type === 'mentor' ? 'Mentor' : 'Talent'})
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Tambahkan riwayat pendidikan Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="institution" value="Institusi / Universitas" />

                    <TextInput
                        id="institution"
                        value={data.institution}
                        onChange={(e) => setData('institution', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.institution} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="degree" value="Gelar / Jurusan" />

                    <TextInput
                        id="degree"
                        value={data.degree}
                        onChange={(e) => setData('degree', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.degree} className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="year" value="Tahun (Cth: 2018 - 2022)" />

                        <TextInput
                            id="year"
                            value={data.year}
                            onChange={(e) => setData('year', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.year} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="gpa" value="IPK (Opsional)" />

                        <TextInput
                            id="gpa"
                            value={data.gpa}
                            onChange={(e) => setData('gpa', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.gpa} className="mt-2" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Tambah Pendidikan</PrimaryButton>

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

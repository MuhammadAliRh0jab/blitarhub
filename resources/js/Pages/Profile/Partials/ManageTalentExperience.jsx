import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function ManageTalentExperience({ isTalent, className = '' }) {
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        role: '',
        company: '',
        period: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.talent-experience.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    if (!isTalent) {
        return null;
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Pengalaman Kerja (Talent)
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Tambahkan riwayat karir Anda sebagai Talent.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="role" value="Posisi / Peran" />

                    <TextInput
                        id="role"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="company" value="Perusahaan" />

                    <TextInput
                        id="company"
                        value={data.company}
                        onChange={(e) => setData('company', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.company} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="period" value="Periode (Cth: Jan 2020 - Sekarang)" />

                    <TextInput
                        id="period"
                        value={data.period}
                        onChange={(e) => setData('period', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.period} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Deskripsi Tugas" />

                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        rows="3"
                    ></textarea>

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Tambah Pengalaman</PrimaryButton>

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

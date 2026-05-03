import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function ManageTalentPortfolio({ isTalent, className = '' }) {
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        name: '',
        description: '',
        tech: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.talent-portfolio.store'), {
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
                    Portofolio Talent
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Tambahkan portofolio proyek yang pernah Anda kerjakan.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama Proyek" />

                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="tech" value="Teknologi yang Digunakan (Pisahkan dengan koma)" />

                    <TextInput
                        id="tech"
                        value={data.tech}
                        onChange={(e) => setData('tech', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder="React, Laravel, Tailwind"
                    />

                    <InputError message={errors.tech} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Deskripsi Proyek" />

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
                    <PrimaryButton disabled={processing}>Tambah Portofolio</PrimaryButton>

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

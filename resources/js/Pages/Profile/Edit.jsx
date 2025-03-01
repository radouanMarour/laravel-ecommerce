import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import OrderHistory from './Partials/OrderHistory';


export default function Edit({ auth, mustVerifyEmail, status, orders }) {
    const tabs = [
        { name: 'Profile', component: <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} /> },
        { name: 'Security', component: <UpdatePasswordForm /> },
        { name: 'Orders', component: <OrderHistory orders={orders} /> },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.name}
                                    className={({ selected }) =>
                                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                                        ${selected
                                            ? 'bg-white shadow text-blue-700'
                                            : 'text-gray-700 hover:bg-white/[0.12] hover:text-blue-600'
                                        }`
                                    }
                                >
                                    {tab.name}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className="mt-6">
                            {tabs.map((tab, idx) => (
                                <Tab.Panel
                                    key={idx}
                                    className="rounded-xl bg-white p-6 shadow"
                                >
                                    {tab.component}
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

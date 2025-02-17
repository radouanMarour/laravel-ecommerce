import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";
import { useState } from 'react';
import { HiViewGrid, HiShoppingCart, HiUsers, HiShoppingBag, HiMenu, HiX } from 'react-icons/hi';

function Dashboard({ auth, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Dashboard" />
            <div className="flex bg-gray-900 text-white">
                {/* Sidebar */}
                <aside className={`fixed h-full w-64 bg-gray-800 transition-width duration-300 ease-in-out ${isSidebarOpen ? 'visible' : 'w-0 hidden'}`}>
                    <div className="p-4">
                        <nav>
                            <ul>
                                <li>
                                    <Link href={route('admin.dashboard')} className="flex items-center w-full p-2 text-gray-300 hover:bg-gray-700">
                                        <HiViewGrid className="w-5 h-5 mr-2" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('admin.products')} className="flex items-center w-full p-2 text-gray-300 hover:bg-gray-700">
                                        <HiShoppingBag className="w-5 h-5 mr-2" />
                                        Manage Products
                                    </Link>
                                </li>

                                <li>
                                    <Link href={route('admin.categories')} className="flex items-center w-full p-2 text-gray-300 hover:bg-gray-700">
                                        <HiShoppingCart className="w-5 h-5 mr-2" />
                                        Manage Categories
                                    </Link>
                                </li>
                                {/*
                                <li>
                                    <Link href={route('admin.customers.index')} className="flex items-center w-full p-2 text-gray-300 hover:bg-gray-700">
                                        <HiUsers className="w-5 h-5 mr-2" />
                                        Customers
                                    </Link>
                                </li> */}
                            </ul>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={`flex-1 p-4 ${isSidebarOpen ? 'ml-64' : ''}`}>
                    <div className="flex justify-between items-center">
                        <button onClick={toggleSidebar} className="text-gray-300 hover:text-white focus:outline-none">
                            {isSidebarOpen ? (
                                <HiX className="h-6 w-6" />
                            ) : (
                                <HiMenu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Dynamic Content */}
                    <div className="min-h-screen mt-4">{children}</div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;

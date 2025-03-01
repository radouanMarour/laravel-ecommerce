import { useEffect, useState } from 'react';
import { FiShoppingBag } from "react-icons/fi";
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { FaShoppingBag, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from '@/Context/CartContext';
import Logo from '../../assets/logo.png'

export default function Authenticated({ user, header, children }) {
    const { categories } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { cart } = useCart()

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 fixed w-full top-0 left-0 bg-gray-800 z-10 px-6">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="h-12 w-auto rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-125 animate-pulse"
                                    style={{
                                        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                                        animation: 'lightning 2s infinite'
                                    }}
                                />
                            </Link>
                            <style jsx>{`
                                @keyframes lightning {
                                    0% {
                                        filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
                                    }
                                    50% {
                                        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
                                    }
                                    100% {
                                        filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
                                    }
                                }
                            `}</style>
                        </div>
                        <div className="flex">
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink className="text-white" href={route('home')} active={route().current('home')}>
                                    Home
                                </NavLink>
                                {categories?.map(category => (
                                    <NavLink
                                        key={category.id}
                                        className="text-white"
                                        href={route('products.index', [category.id, category.slug])}
                                        active={route().current('products.index', [category.id, category.slug])}
                                    >
                                        {category.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative flex justify-center items-center space-x-4">
                                <Link href={route('cart.index')} className='relative'>
                                    <span className='font-bold absolute flex justify-center items-center h-4 w-4 -top-1 -right-1 bg-white rounded-full'>
                                        {cart && Object.keys(cart).length}
                                    </span>
                                    <FaShoppingCart className='w-6 h-6 text-white' />
                                </Link>
                                {
                                    !user ? (
                                        <>
                                            <NavLink
                                                className="text-white bg-blue-600 hover:bg-blue-700 hover:text-white px-4 py-2 pt-2 rounded-md transition duration-300 ease-in-out"
                                                href={route('register')}
                                                active={route().current('register')}
                                            >
                                                Register
                                            </NavLink>
                                            <NavLink
                                                className="text-white bg-green-600 hover:bg-green-700 hover:text-white px-4 py-2 pt-2 rounded-md transition duration-300 ease-in-out"
                                                href={route('login')}
                                                active={route().current('login')}
                                            >
                                                Login
                                            </NavLink>
                                        </>
                                    ) : (
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        <FaUserCircle className="w-6 h-6 text-white" />
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                {user?.role === 'admin' && (
                                                    <Dropdown.Link href={route('admin.dashboard')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        Dashboard
                                                    </Dropdown.Link>
                                                )}
                                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    )
                                }
                            </div>
                        </div>
                        <div className="-me-2 flex items-center sm:hidden space-x-2">
                            <Link href={route('cart.index')} className='relative'>
                                <span className='font-bold absolute flex justify-center items-center h-4 w-4 -top-1 -right-1 bg-gray-400 text-white hover:text-gray-500 rounded-full'>
                                    {cart && Object.keys(cart).length}
                                </span>
                                <FaShoppingCart className='w-6 h-6 text-gray-400 hover:text-gray-500' />
                            </Link>
                            <button
                                onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden fixed top-16 left-0 w-full bg-gray-800 z-10'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink className="hover:bg-gray-700" href={route('home')} active={route().current('home')}>
                            Home
                        </ResponsiveNavLink>
                        {categories?.map(category => (
                            <ResponsiveNavLink
                                key={category.id}
                                className=" hover:bg-gray-700"
                                href={route('products.index', [category.id, category.slug])}
                                active={route().current('products.index', [category.id, category.slug])}
                            >
                                {category.name}
                            </ResponsiveNavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-600">
                        {!user ? (<div className="flex space-x-4 my-4">
                            <NavLink
                                className="text-white bg-blue-600 hover:bg-blue-700 hover:text-white px-4 py-2 pt-2 rounded-md transition duration-300 ease-in-out"
                                href={route('register')}
                                active={route().current('register')}
                            >
                                Register
                            </NavLink>
                            <NavLink
                                className="text-white bg-green-600 hover:bg-green-700 hover:text-white px-4 py-2 pt-2 rounded-md transition duration-300 ease-in-out"
                                href={route('login')}
                                active={route().current('login')}
                            >
                                Login
                            </NavLink>
                        </div>) :
                            <div className="mt-3 space-y-1">
                                {user?.role === 'admin' && (
                                    <ResponsiveNavLink
                                        className=" hover:bg-gray-700"
                                        href={route('admin.dashboard')}
                                        active={route().current('admin.dashboard')}
                                    >
                                        Dashboard
                                    </ResponsiveNavLink>
                                )}
                                <ResponsiveNavLink className=" hover:bg-gray-700" href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink className=" hover:bg-gray-700" method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>}
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            <main className='pt-16'>{children}</main>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12 pt-12 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">About Us</h3>
                            <p className="text-gray-400">Your trusted source for quality products at competitive prices.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link href="/products" className="text-gray-400 hover:text-white">Products</Link></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                            <div className="text-gray-400">
                                <p>Email: info@store.com</p>
                                <p>Phone: (555) 123-4567</p>
                                <p>Address: 123 Store St, City, State</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

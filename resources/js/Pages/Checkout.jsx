import { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { useCart } from '@/Context/CartContext';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Checkout({ auth }) {
    const { cart } = useCart();
    const { data, setData, post, processing } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        address: '',
        city: '',
        zip: '',
        payment_method: 'cod',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <Authenticated user={auth.user}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Billing Details */}
                        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Billing Details</h3>

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="City"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                value={data.city}
                                onChange={e => setData('city', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="ZIP Code"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                value={data.zip}
                                onChange={e => setData('zip', e.target.value)}
                                required
                            />

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6">Payment Method</h3>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                value={data.payment_method}
                                onChange={e => setData('payment_method', e.target.value)}
                            >
                                <option value="stripe">Stripe</option>
                                <option value="paypal">PayPal</option>
                                <option value="cod">Cash on Delivery</option>
                            </select>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                disabled={processing}
                            >
                                {processing ? "Processing..." : "Place Order"}
                            </button>
                        </form>

                        {/* Order Summary */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {cart && Object.values(cart).map((item) => (
                                    <li key={item.id} className="flex justify-between py-3">
                                        <span className="text-gray-700 dark:text-gray-300">{item.name} x {item.quantity}</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span className="text-gray-900 dark:text-white">Total:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        ${Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

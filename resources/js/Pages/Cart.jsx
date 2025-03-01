import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useCart } from '@/Context/CartContext';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

export default function Cart({ auth }) {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart()


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Cart" />

            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                {Object.keys(cart).length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <div className="space-y-4 md:space-y-0 space-x-1 flex flex-col md:flex-row justify-between">
                            <div className="flex flex-col space-y-4 md:w-2/3 w-full">
                                {Object.values(cart).map((item) => (
                                    <div key={item.id} className="flex flex-col justify-center space-y-1 md:space-y-0 md:flex-row md:items-center  md:justify-between p-4 border">
                                        <img src={`${item.image.startsWith("images") ? `/storage/${item.image}` : item.image}`} alt={item.name} className="w-20 h-20 object-cover" />
                                        <div>
                                            <h2 className="font-semibold">{item.name}</h2>
                                            <p className="text-gray-600">${item.price} x {item.quantity}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-200">-</button>
                                            <span className="px-4">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-200">+</button>
                                            <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-600">Remove</button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={clearCart} className="flex items-center justify-center mt-6 bg-red-600 text-white px-6 py-2 rounded md:w-40">
                                    <FaTrash className="inline-block mr-2 text-xl" />
                                    <span>Clear Cart</span>
                                </button>
                            </div>
                            <div className="flex flex-col w-full md:w-1/3 p-4 border">
                                <p className="mt-6 text-xl font-semibold">
                                    Total: ${Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                </p>
                                <button
                                    className="flex items-center justify-center space-x-1 mt-6 bg-blue-600 text-white px-6 py-2 rounded"
                                    onClick={() => router.get('/checkout')}
                                >
                                    <MdOutlineShoppingCartCheckout className="inline-block mr-2 text-2xl" />
                                    <span>Checkout</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
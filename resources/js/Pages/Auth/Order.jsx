import Authenticated from "@/Layouts/AuthenticatedLayout";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)


export default function Order({ auth, order, isSuccess, isCanceled }) {
    const [loading, setLoading] = useState(false);

    // Stripe payment

    const handleStripeCheckout = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`/stripe/checkout/${order.id}`);
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: response.data.id });
            setLoading(false);
        } catch (error) {
            console.error('Stripe payment failed', error);
        }
    };

    // PayPal payment

    const initialOptions = {
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        "enable-funding": "venmo",
        "buyer-country": "US",
        currency: "USD",
        components: "buttons",
    };

    const handleCreateOrder = async () => {
        try {
            const response = await axios.post(`/paypal/create/${order.id}`);
            const { id } = response.data;
            return id
        } catch (error) {
            console.error('PayPal payment failed', error);
            window.location.href = `/orders/${order.id}?canceled=true`;
        }
    }

    const handleCaptureOrder = async (data, actiobns) => {
        try {
            const response = await axios.post(`/paypal/capture/${data.orderID}`);
            if (response.data.success) {
                window.location.href = `/orders/${order.id}?success=true`;
            }

        } catch (error) {
            console.error('PayPal payment failed', error);
            window.location.href = `/orders/${order.id}?canceled=true`;

        }
    }

    return (
        <Authenticated user={auth.user}>
            <div className="max-w-7xl mx-auto py-12 px-6">
                <h1 className="text-2xl font-bold mb-6">Order ID:{order.id}</h1>
                {isSuccess && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                        Your order has been successfully paid.
                    </div>
                )}
                {isCanceled && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                        Your order has been canceled.
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Order Details */}
                    <div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Order Information</h2>
                            <div className="space-y-3">
                                <p className="text-gray-600">Status:
                                    {
                                        order.status === 'pending' ?
                                            <span className="text-yellow-500 font-semibold"> Pending</span>
                                            : <span className="text-green-500 font-semibold"> Paid</span>
                                    }
                                </p>
                                <p className="text-gray-600">Total: <span className="font-semibold">${order.total}</span></p>
                                <p className="text-gray-600">Payment Method: <span className="font-semibold">{order.payment_method}</span></p>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
                                <div className="text-gray-600">
                                    <p>{order.name}</p>
                                    <p>{order.email}</p>
                                    <p>{`${order.address}, ${order.city}, ${order.zip}`}</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                {
                                    order.status === 'pending' && order.payment_method === 'stripe' && (
                                        <button
                                            onClick={handleStripeCheckout}
                                            className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-md ${loading && 'opacity-50 cursor-not-allowed'}`}
                                        >
                                            {loading ? 'Processing...' : 'Pay with Stripe'}
                                        </button>
                                    )
                                }
                                {
                                    order.status === 'pending' && order.payment_method === 'paypal' && (
                                        <PayPalScriptProvider options={initialOptions}>
                                            <PayPalButtons
                                                createOrder={handleCreateOrder}
                                                onApprove={handleCaptureOrder}
                                                onCancel={() => {
                                                    window.location.href = `/orders/${order.id}?canceled=true`;
                                                }}
                                                onError={(error) => {
                                                    console.error('PayPal error', error);
                                                    window.location.href = `/orders/${order.id}?canceled=true`;
                                                }}
                                                style={{
                                                    shape: "rect",
                                                    layout: "vertical",
                                                    color: "gold",
                                                    label: "paypal",
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                        <ul className="space-y-6">
                            {order.items.map(item => (
                                <li key={item.id} className="flex space-x-4">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img
                                            src={item.product.main_image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium">{item.product.name}</h3>
                                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                                        <p className="text-gray-900 font-medium">${item.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

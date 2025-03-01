import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useCart } from '@/Context/CartContext';

export default function ProductDetails({ auth, product, relatedProducts }) {
    const [quantity, setQuantity] = useState(1);
    const [index, setIndex] = useState(0);
    const { addToCart } = useCart();
    const { post } = useForm();

    const handleFeaturedToggle = () => {
        post(route('admin.products.toggleFeatured', product.id), {
            preserveScroll: true,
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title={product.name} />
            <div className="bg-[#1e272e] text-white min-h-screen p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {/* Left Column - Image */}
                        <div className="flex flex-col md:flex-row items-center md:items-start space-x-1 space-y-4">
                            <div className="w-20 flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-4 order-2 md:order-1 mt-1">
                                {product.thumbnail_images.map((image, index) => (
                                    <img
                                        key={index}
                                        onClick={() => setIndex(index)}
                                        src={`${image.startsWith("images") ? `/storage/${image}` : image}`}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                                    />
                                ))}
                            </div>
                            <img
                                src={`${product.thumbnail_images[index].startsWith("images") ? `/storage/${product.thumbnail_images[index]}` : product.thumbnail_images[index]}`}
                                alt={product.name}
                                className="w-4/5 h-[500px] object-cover rounded-lg order-1 md:order-2"
                            />
                        </div>

                        {/* Right Column - Product Details */}
                        <div className="bg-[#273c47] rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-3xl font-bold">{product.name}</h1>
                                {auth.user?.role === 'admin' && (
                                    <button
                                        onClick={handleFeaturedToggle}
                                        className={`px-4 py-2 rounded ${product.is_featured
                                            ? 'bg-yellow-500 hover:bg-yellow-600'
                                            : 'bg-gray-500 hover:bg-gray-600'
                                            } text-white`}
                                    >
                                        {product.is_featured ? 'Featured' : 'Set Featured'}
                                    </button>
                                )}
                            </div>

                            <div className="flex justify-between mb-4">
                                <p className="text-[#636e72]">Availability:</p>
                                <p>{product.stock} in stock</p>
                            </div>

                            <div className="flex justify-between mb-6">
                                <p className="text-[#636e72]">Price:</p>
                                <p className="text-2xl font-semibold">${product.price}</p>
                            </div>

                            {/* Quantity Selection */}
                            <div className="mb-6">
                                <label className="block text-[#636e72] mb-2">Quantity:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="w-20 px-3 py-2 bg-[#1e272e] rounded-md text-white"
                                />
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={() => addToCart(product.id, quantity)}
                                className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white font-bold py-3 px-4 rounded mb-4"
                            >
                                Add to Cart
                            </button>

                            {/* Back Button */}
                            <Link
                                href="/products"
                                className="block text-center bg-transparent border border-[#3498db] hover:bg-[#3498db] text-white font-bold py-3 px-4 rounded"
                            >
                                Back to Products
                            </Link>
                        </div>
                    </div>
                    <div className="border-t border-[#273c47] my-8"></div>
                    {/* Product Description */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Description</h2>
                        <p>{product.description}</p>
                    </div>
                    <div className="border-t border-[#273c47] my-8"></div>
                    {/* Related Products */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedProducts.map((relatedProduct) => (
                                <div key={relatedProduct.id} className="bg-[#273c47] rounded-lg shadow-md p-4">
                                    <Link href={`/products/${relatedProduct.id}`}>
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={`${relatedProduct.main_image.startsWith("images") ? `/storage/${relatedProduct.main_image}` : relatedProduct.main_image}`}
                                                alt={relatedProduct.name}
                                                className="w-full h-48 object-cover rounded-t-lg mb-2"
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-white">
                                            {relatedProduct.name}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-400">Available: {relatedProduct.stock}</p>
                                            <p className="text-green-400 font-semibold">${relatedProduct.price}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Authenticated>
    );
}
import { useCart } from '@/Context/CartContext';
import { Link, router } from '@inertiajs/react';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();


    return (
        <div className="bg-gray-200 rounded-lg shadow-md p-4 w-11/12 md:w-60">
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative overflow-hidden">
                    <img
                        src={`${product.main_image.startsWith("images") ? `/storage/${product.main_image}` : product.main_image}`}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg mb-2 transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-400 transition-colors">
                    {product.name}
                </h3>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500">Available: {product.stock}</p>
                    <p className="text-green-700 font-semibold">${product.price}</p>
                </div>
            </Link>
            <button
                onClick={() => addToCart(product.id, 1)}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
                <FaShoppingCart />
                <span>Add to Cart</span>
            </button>
        </div >
    );
}

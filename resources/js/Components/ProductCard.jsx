import React from 'react';
import { Link } from '@inertiajs/react';

export default ProductCard = ({ product }) => {
    const sampleProduct = {
        id: 1,
        name: 'Sample Product',
        price: 99.99,
        image: 'https://picsum.photos/400/300',
        description: 'This is a sample product description.'
    };
    product = product || sampleProduct;
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                </h3>
                <p className="text-gray-600 mt-1">
                    ${product.price.toFixed(2)}
                </p>
                <div className="mt-4">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';
import FilterSidebar from '@/Components/FilterSidebar';
import SortDropdown from '@/Components/SortDropdown';

export default function Products({ category, products }) {
    const initialProducts = [
        {
            id: 1,
            name: "Classic Running Shoes",
            price: 89.99,
            description: "Comfortable running shoes for daily use",
            image: "https://picsum.photos/300/300?random=1",
            colors: ["black", "white", "red"],
            sizes: ["7", "8", "9", "10", "11"],
            activity: "running"
        },
        {
            id: 2,
            name: "Pro Basketball Sneakers",
            price: 129.99,
            description: "High-performance basketball shoes",
            image: "https://picsum.photos/300/300?random=2",
            colors: ["blue", "black", "white"],
            sizes: ["8", "9", "10", "11", "12"],
            activity: "basketball"
        },
        {
            id: 3,
            name: "Hiking Boots",
            price: 149.99,
            description: "Durable hiking boots for tough trails",
            image: "https://picsum.photos/300/300?random=3",
            colors: ["brown", "green", "gray"],
            sizes: ["7", "8", "9", "10"],
            activity: "hiking"
        },
        {
            id: 4,
            name: "Tennis Shoes",
            price: 79.99,
            description: "Lightweight tennis shoes for court play",
            image: "https://picsum.photos/300/300?random=4",
            colors: ["white", "yellow", "blue"],
            sizes: ["6", "7", "8", "9", "10"],
            activity: "tennis"
        },
        {
            id: 5,
            name: "Training Shoes",
            price: 99.99,
            description: "Versatile shoes for gym workouts",
            image: "https://picsum.photos/300/300?random=5",
            colors: ["gray", "black", "red"],
            sizes: ["8", "9", "10", "11"],
            activity: "training"
        }
    ];
    const [products, setProducts] = useState(initialProducts);
    const [filters, setFilters] = useState({
        size: [],
        color: [],
        priceRange: [0, 1000],
        activity: []
    });
    const [sortBy, setSortBy] = useState('newest');

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Apply filters to products
    };

    const handleSort = (sortOption) => {
        setSortBy(sortOption);
        // Apply sorting to products
    };

    return (
        <>
            <Head title={`${category.name} - Products`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold my-8">{category.name}</h1>

                <div className="flex gap-8">
                    <FilterSidebar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />

                    <div className="flex-1">
                        <div className="flex justify-end mb-4">
                            <SortDropdown
                                value={sortBy}
                                onChange={handleSort}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductCard from '@/Components/ProductCard';
import { FaFilter, FaTimes } from 'react-icons/fa';

export default function Shop({ auth, products, categorySlug }) {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const { categories } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    useEffect(() => {
        if (categorySlug) {
            setFilter(categorySlug);
        }
    }, [products, categories, categorySlug]);

    // Sort products based on selected option
    const sortedProducts = [...products.data].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'stock':
                return b.stock - a.stock;
            default:
                return a.name.localeCompare(b.name);
        }
    });
    // console.log(products)
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Shop products" />
            <div className="w-full flex bg-gray-900 text-white">
                {/* Filter container */}
                <aside className={`fixed h-full w-64 bg-gray-800 transition-width duration-300 ease-in-out ${isSidebarOpen ? 'visible' : 'w-0 hidden'} z-0`}>
                    {/* Category filters */}
                    <div className="flex flex-col justify-center gap-x-2">
                        <FaTimes
                            className='absolute top-2 right-2 cursor-pointer'
                            onClick={() => setIsSidebarOpen(false)}
                        />
                        <h1 className='px-4 pl-8 my-4 text-2xl'>Categories</h1>
                        <Link
                            href={route('products.showAll')}
                            className={`px-4 pl-8 py-2 text-left ${filter === 'all'
                                ? 'bg-[#34495e] border-b border-blue-600 text-white'
                                : 'hover:bg-[#34495e]'
                                }`}
                        >
                            All
                        </Link>
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                href={route('products.index', [category.id, category.slug])}
                                className={`px-4 pl-8 py-2 text-left  ${filter === category.slug
                                    ? 'bg-[#34495e] border-b border-blue-600 text-white'
                                    : 'hover:bg-[#34495e]'
                                    }`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </aside>

                {/* Product grid */}
                <div className={`flex justify-center flex-wrap gap-4 p-4 ${isSidebarOpen ? 'ml-64' : ''}`}>
                    <div className='flex w-full justify-between px-7'>
                        {!isSidebarOpen && <span
                            className='flex items-center gap-x-1 bg-[#34495e] px-2 rounded cursor-pointer'
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <FaFilter className='' /> Filter
                        </span>}
                        <h1 className='capitalize hidden md:block'>{`${categorySlug && categorySlug || "All"} clothing`}</h1>
                        {/* Sort options */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-[#273c47] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#34495e] border-none"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="stock">Availability</option>
                        </select>
                    </div>
                    {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    <div className='flex w-full justify-center items-center space-x-2'>
                        {
                            products.links.map(
                                (link, index) => <Link
                                    key={index}
                                    href={link.url}
                                    className={`py-1 px-4 text-white block ${link.active ? "bg-[#273c47]" : "bg-[#222a2e]"}`}
                                >
                                    {index === 0 ? <span>&laquo;</span> : index === products.links.length - 1 ? <span>&raquo;</span> : link.label}
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
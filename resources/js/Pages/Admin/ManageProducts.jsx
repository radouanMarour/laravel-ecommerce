import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import Dashboard from "@/Pages/Admin/Dashboard";
import { FaEdit, FaTrash } from "react-icons/fa";

function ManageProducts({ auth, products, categories }) {
    const [search, setSearch] = useState("");
    const [stockStatus, setStockStatus] = useState("");
    const [category, setCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesStock = !stockStatus || product.stock > 0 === (stockStatus === "In Stock");
            const matchesCategory = !category || product.category_id === parseInt(category);

            return matchesSearch && matchesStock && matchesCategory;
        });

        setFilteredProducts(filtered);
    }, [search, stockStatus, category, products]);

    const handleDelete = (productId) => {
        if (confirm(`Are you sure you want to delete product ID ${productId}?`)) {
            router.delete(route('admin.products.destroy', productId));
        }
    };

    return (
        <Dashboard auth={auth}>
            <div className="bg-[#0D1B2A] text-white p-6 rounded-lg shadow-md">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Products Management</h2>
                    <p className="text-sm">
                        {new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
                    </p>
                </div>
                <div className="flex space-x-3 mb-4">
                    <Link href="/admin/products/create" className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 cursor-pointer">
                        + Add New Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex space-x-3 mb-4">
                    <select
                        className="bg-gray-800 p-2 text-center rounded text-white w-1/5"
                        value={stockStatus}
                        onChange={e => setStockStatus(e.target.value)}
                    >
                        <option value="">Stock Status</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                    <select
                        className="bg-gray-800 p-2 text-center rounded text-white w-1/5"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">Product Category</option>
                        {categories?.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Search Product..."
                        className="bg-gray-800 p-2 text-center rounded text-white w-2/5"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* Products Table */}
                <table className="w-full border-collapse border-gray-700">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-600 p-2 text-center">#</th>
                            <th className="border border-gray-600 p-2 text-center">Image</th>
                            <th className="border border-gray-600 p-2 text-center">Product Name</th>
                            <th className="border border-gray-600 p-2 text-center">Category</th>
                            <th className="border border-gray-600 p-2 text-center">Stock</th>
                            <th className="border border-gray-600 p-2 text-center">Price</th>
                            <th className="border border-gray-600 p-2 text-center">Date</th>
                            <th className="border border-gray-600 p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts?.map((product, index) => (
                            <tr key={product.id} className="bg-gray-800 hover:bg-gray-700">
                                <td className="border border-gray-600 p-2 text-center">{index + 1}</td>
                                <td className="border border-gray-600 p-2 text-center">

                                    <img
                                        src={`${product.main_image.startsWith("images") ? `/storage/${product.main_image}` : product.main_image}`}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />

                                </td>
                                <td className="border border-gray-600 p-2 text-center">{product.name}</td>
                                <td className="border border-gray-600 p-2 text-center">{product.category?.name || 'Uncategorized'}</td>
                                <td className="border border-gray-600 p-2 text-center text-green-400">{product.stock}</td>
                                <td className="border border-gray-600 p-2 text-center">${product.price}</td>
                                <td className="border border-gray-600 p-2 text-center">{new Date(product.created_at).toLocaleDateString()}</td>
                                <td className="border border-gray-600 p-2 text-center">
                                    <div className="flex justify-evenly">
                                        <Link
                                            href={route('admin.products.edit', product.id)}
                                            className="text-blue-400 hover:text-blue-500"
                                        >
                                            <FaEdit size={20} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-400 hover:text-red-500 cursor-pointer"
                                        >
                                            <FaTrash size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        }
                        {!filteredProducts?.length && (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
}

export default ManageProducts;

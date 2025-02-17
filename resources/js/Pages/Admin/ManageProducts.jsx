import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Dashboard from "@/Pages/Admin/Dashboard";
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";

function ManageProducts({ auth, products }) {
    // Dummy delete function
    const handleDelete = (productId) => {
        if (confirm(`Are you sure you want to delete product ID ${productId}?`)) {
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
                    <Link href="/admin/products/create" className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600">
                        + Add New Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex space-x-3 mb-4">
                    <select className="bg-gray-800 p-2 rounded text-white w-1/5">
                        <option>Stock Status</option>
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                    </select>
                    <select className="bg-gray-800 p-2 rounded text-white w-1/5">
                        <option>Product Category</option>
                        <option>Smartphones</option>
                        <option>Laptops</option>
                        <option>Accessories</option>
                    </select>
                    <input type="text" placeholder="Search Product..." className="bg-gray-800 p-2 rounded text-white w-2/5" />
                    <button className="bg-blue-600 px-4 py-2 rounded text-white">Apply</button>
                </div>

                {/* Products Table */}
                <table className="w-full border-collapse border-gray-700">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-600 p-2">#</th>
                            <th className="border border-gray-600 p-2">Image</th>
                            <th className="border border-gray-600 p-2">Product Name</th>
                            <th className="border border-gray-600 p-2">Stock</th>
                            <th className="border border-gray-600 p-2">Price</th>
                            <th className="border border-gray-600 p-2">Date</th>
                            <th className="border border-gray-600 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <tr key={product.id} className="bg-gray-800 hover:bg-gray-700">
                                <td className="border border-gray-600 p-2">{index + 1}</td>
                                <td className="border border-gray-600 p-2">
                                    {product.images && (
                                        <img
                                            src={`/storage/${product.images[0].path}`}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    )}
                                </td>
                                <td className="border border-gray-600 p-2">{product.name}</td>
                                <td className="border border-gray-600 p-2 text-green-400">{product.stock}</td>
                                <td className="border border-gray-600 p-2">${product.price}</td>
                                <td className="border border-gray-600 p-2">{new Date(product.created_at).toLocaleDateString()}</td>
                                <td className="border border-gray-600 p-2">
                                    <div className="flex justify-evenly">
                                        <Link
                                            href={route('admin.products', product.id)}
                                            className="text-blue-400 hover:text-blue-500"
                                        >
                                            <FaEdit size={20} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-400 hover:text-red-500"
                                        >
                                            <FaTrash size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
}

export default ManageProducts;

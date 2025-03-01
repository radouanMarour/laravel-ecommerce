import React from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Dashboard from "@/Pages/Admin/Dashboard";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function ManageCategories({ auth, categories }) {
    const handleDelete = (categoryId) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.categories.destroy', categoryId));
        }
    };

    return (
        <Dashboard auth={auth}>
            <div className="bg-[#0D1B2A] text-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Manage Categories</h2>
                    <Link
                        href={route('admin.categories.create')}
                        className="bg-green-500 px-4 py-2 rounded flex items-center hover:bg-green-600"
                    >
                        <FaPlus className="mr-2" />
                        Add New Category
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border-gray-700">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="border border-gray-600 p-2 text-center">ID</th>
                                <th className="border border-gray-600 p-2 text-center">Image</th>
                                <th className="border border-gray-600 p-2 text-center">Name</th>
                                <th className="border border-gray-600 p-2 text-center">Description</th>
                                <th className="border border-gray-600 p-2 text-center">Date</th>
                                <th className="border border-gray-600 p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((category) => (
                                <tr key={category.id} className="bg-gray-800 hover:bg-gray-700">
                                    <td className="border border-gray-600 p-2 text-center">{category.id}</td>
                                    <td className="border border-gray-600 p-2 text-center">
                                        {category.image && (
                                            <img
                                                src={`/storage/${category.image}`}
                                                alt={category.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        )}
                                    </td>
                                    <td className="border border-gray-600 p-2 text-center">{category.name}</td>
                                    <td className="border border-gray-600 p-2 text-center">
                                        {category.description?.length > 50
                                            ? category.description.substring(0, 50) + "..."
                                            : category.description}
                                    </td>
                                    <td className="border border-gray-600 p-2 text-center">{new Date(category.created_at).toLocaleDateString()}</td>
                                    <td className="border border-gray-600 p-2 text-center">
                                        <div className="flex justify-evenly">
                                            <Link
                                                href={route('admin.categories.edit', category.id)}
                                                className="text-blue-400 hover:text-blue-500"
                                            >
                                                <FaEdit size={20} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="text-red-400 hover:text-red-500"
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!categories?.length && (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No categories found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Dashboard>
    );
}

export default ManageCategories;

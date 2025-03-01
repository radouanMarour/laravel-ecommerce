import React from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Dashboard from "@/Pages/Admin/Dashboard";
import { FaTrash } from "react-icons/fa";

function ManageUsers({ auth, users }) {
    const handleDelete = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', userId));
        }
    };

    return (
        <Dashboard auth={auth}>
            <div className="bg-[#0D1B2A] text-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Manage Users</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border-gray-700">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="border border-gray-600 p-2 text-center">ID</th>
                                <th className="border border-gray-600 p-2 text-center">Name</th>
                                <th className="border border-gray-600 p-2 text-center">Email</th>
                                <th className="border border-gray-600 p-2 text-center">Role</th>
                                <th className="border border-gray-600 p-2 text-center">Date</th>
                                <th className="border border-gray-600 p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user.id} className="bg-gray-800 hover:bg-gray-700">
                                    <td className="border border-gray-600 p-2 text-center">{user.id}</td>

                                    <td className="border border-gray-600 p-2 text-center">{user.name}</td>
                                    <td className="border border-gray-600 p-2 text-center">{user.email}</td>
                                    <td className="border border-gray-600 p-2 text-center">{user.role}</td>

                                    <td className="border border-gray-600 p-2 text-center">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="border border-gray-600 p-2 text-center">
                                        <div className="flex justify-evenly">

                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-400 hover:text-red-500"
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!users?.length && (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No users found
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

export default ManageUsers;

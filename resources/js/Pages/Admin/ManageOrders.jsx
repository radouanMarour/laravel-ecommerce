import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import Dashboard from "@/Pages/Admin/Dashboard";
import { FaEdit, FaTrash } from "react-icons/fa";

function ManageOrders({ auth, orders, stats }) {
    console.log(stats)
    const handleDelete = (orderId) => {
        if (confirm(`Are you sure you want to delete order ID ${orderId}?`)) {
            // router.delete(route('admin.orders.destroy', orderId));
        }
    }

    return (
        <Dashboard auth={auth}>
            <div className="bg-[#0D1B2A] text-white p-6 rounded-lg shadow-md">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Orders Management</h2>
                </div>

                {/* Stats */}
                <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 justify-evenly mb-6">
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold">Total</span>
                        <span className="text-gray-400">{stats.length} Orders</span>
                    </div>
                    {
                        stats.map((stat, index) => (
                            <div key={index} className="flex flex-col">
                                <span className="text-2xl font-semibold">{stat.status}</span>
                                <span className="text-gray-400">{stat.count} Orders</span>
                            </div>
                        ))
                    }
                </div>
                {/* Orders Table */}
                <table className="w-full border-collapse border-gray-700">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-600 p-2 text-center">Order ID</th>
                            <th className="border border-gray-600 p-2 text-center">Date</th>
                            <th className="border border-gray-600 p-2 text-center">Customer</th>
                            <th className="border border-gray-600 p-2 text-center">Total</th>
                            <th className="border border-gray-600 p-2 text-center">Status</th>
                            <th className="border border-gray-600 p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (
                            <tr key={order.id} className="bg-gray-800 hover:bg-gray-700">
                                <td className="border border-gray-600 p-2 text-center">{order.id}</td>
                                <td className="border border-gray-600 p-2 text-center text-base">
                                    {new Date(order.created_at).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
                                </td>
                                <td className="border border-gray-600 p-2">
                                    {order.name}<br />
                                    <span className="text-base text-gray-500">{order.email}</span>
                                </td>
                                <td className="border border-gray-600 p-2 text-center">${order.total}</td>
                                <td className="border border-gray-600 p-2 text-center">
                                    {order.status === 'pending' ? <span className="text-yellow-500 font-semibold"> Pending</span> : <span className="text-green-500 font-semibold"> Paid</span>}
                                </td>
                                <td className="border border-gray-600 p-2 text-center">
                                    <div className="flex justify-evenly">
                                        <Link
                                            href={route('orders.show', order.id)}
                                            className="text-blue-400 hover:text-blue-500"
                                        >
                                            Details
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="text-red-400 hover:text-red-500 cursor-pointer"
                                        >
                                            <FaTrash size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        }
                        {!orders?.length && (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
}

export default ManageOrders;

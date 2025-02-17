import { useState } from "react";
import Dashboard from "@/Pages/Admin/Dashboard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BiPackage, BiCategory, BiMoney, BiListUl, BiChart } from "react-icons/bi";
import { FaShoppingCart, FaUsers } from "react-icons/fa";

function Home({ auth }) {
    // Sample data for statistics
    const stats = {
        totalProducts: 120,
        totalCategories: 10,
        totalOrders: 56,
        totalRevenue: 15600,
        totalCustomers: 78,
    };

    // Sample recent orders data
    const recentOrders = [
        { id: 101, customer: "John Doe", total: "$200", status: "Pending", date: "2025-02-07" },
        { id: 102, customer: "Jane Smith", total: "$350", status: "Shipped", date: "2025-02-06" },
        { id: 103, customer: "Alice Johnson", total: "$120", status: "Delivered", date: "2025-02-05" },
        { id: 104, customer: "Bob Brown", total: "$280", status: "Pending", date: "2025-02-04" },
    ];

    // Sample sales data for chart
    const salesData = [
        { month: "Sep", revenue: 3000 },
        { month: "Oct", revenue: 4000 },
        { month: "Nov", revenue: 5000 },
        { month: "Dec", revenue: 6000 },
        { month: "Jan", revenue: 7000 },
        { month: "Feb", revenue: 6500 },
    ];

    return (
        <Dashboard auth={auth}>
            <div className="space-y-6">
                {/* Stats Section */}
                <div className="grid grid-cols-5 gap-4">
                    <div className="p-4 bg-gray-800 text-white shadow-md rounded-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Total Products</h2>
                            <BiPackage className="h-8 w-8 text-blue-400" />
                        </div>
                        <p className="text-2xl font-bold">{stats.totalProducts}</p>
                    </div>
                    <div className="p-4 bg-gray-800 text-white shadow-md rounded-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Total Categories</h2>
                            <BiCategory className="h-8 w-8 text-blue-400" />
                        </div>
                        <p className="text-2xl font-bold">{stats.totalCategories}</p>
                    </div>
                    <div className="p-4 bg-gray-800 text-white shadow-md rounded-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Total Orders</h2>
                            <FaShoppingCart className="h-8 w-8 text-blue-400" />
                        </div>
                        <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <div className="p-4 bg-gray-800 text-white shadow-md rounded-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Total Revenue</h2>
                            <BiMoney className="h-8 w-8 text-blue-400" />
                        </div>
                        <p className="text-2xl font-bold">${stats.totalRevenue}</p>
                    </div>
                    <div className="p-4 bg-gray-800 text-white shadow-md rounded-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Total Customers</h2>
                            <FaUsers className="h-8 w-8 text-blue-400" />
                        </div>
                        <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-gray-800 text-white shadow-md rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <BiListUl className="h-6 w-6 text-blue-400" />
                        <h2 className="text-xl font-bold">Recent Orders</h2>
                    </div>
                    <table className="w-full border-collapse border-gray-700">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="border border-gray-600 p-2">Order ID</th>
                                <th className="border border-gray-600 p-2">Customer</th>
                                <th className="border border-gray-600 p-2">Total</th>
                                <th className="border border-gray-600 p-2">Status</th>
                                <th className="border border-gray-600 p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="text-center">
                                    <td className="border border-gray-600 p-2">{order.id}</td>
                                    <td className="border border-gray-600 p-2">{order.customer}</td>
                                    <td className="border border-gray-600 p-2">{order.total}</td>
                                    <td className="border border-gray-600 p-2">{order.status}</td>
                                    <td className="border border-gray-600 p-2">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Sales Chart */}
                <div className="bg-gray-800 text-white shadow-md rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <BiChart className="h-6 w-6 text-blue-400" />
                        <h2 className="text-xl font-bold">Sales Overview</h2>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Dashboard>
    );
}

export default Home;

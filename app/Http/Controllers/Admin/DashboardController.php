<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        // totalProducts
        $totalProducts = Product::count();
        // totalCategories
        $totalCategories = Category::count();
        // totalOrders
        $totalOrders = Order::count();
        // totalRevenue
        $totalRevenue = Order::where('status', 'paid')->sum('total');
        // totalCustomers
        $totalCustomers = Order::distinct('user_id')->count('user_id');
        // recentOrders
        $recentOrders = Order::orderBy('created_at', 'desc')->take(5)->get();
        // sales data  { month: "Sep", revenue: 3000 }
        $salesData = Order::selectRaw('DATE_FORMAT(created_at, "%b") as month, sum(total) as revenue')
            ->where('status', 'paid')
            ->groupBy('month')
            ->get();

        $stats = [
            'totalProducts' => $totalProducts,
            'totalCategories' => $totalCategories,
            'totalOrders' => $totalOrders,
            'totalRevenue' => $totalRevenue,
            'totalCustomers' => $totalCustomers,
        ];

        return Inertia::render('Admin/Home', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'salesData' => $salesData,
        ]);
    }
}

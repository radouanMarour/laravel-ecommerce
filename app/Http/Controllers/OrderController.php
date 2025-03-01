<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{

    public function index()
    {
        $orders = Order::where('user_id', auth()->id())->with('items.product')->get();
        $stats = Order::where('user_id', auth()->id())->selectRaw('status, count(*) as count')->groupBy('status')->get();
        return Inertia::render('Admin/ManageOrders', ['orders' => $orders, 'stats' => $stats]);
    }

    public function show(Request $request, $order_id)
    {
        $order = Order::with('items.product')->findOrFail($order_id);
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }
        if ($request->query('success') === 'true') {
            $order->update(['status' => 'paid']);
        }
        return Inertia::render(
            'Auth/Order',
            [
                'order' => $order,
                'isSuccess' => $request->query('success') === 'true',
                'isCanceled' => $request->query('canceled') === 'true',

            ]
        );
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'address' => 'required|string',
            'city' => 'required|string',
            'zip' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        // Create order in database
        $cart = session()->get('cart', []);
        $order = Order::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'email' => $validated['email'],
            'address' => $validated['address'],
            'city' => $validated['city'],
            'zip' => $validated['zip'],
            'payment_method' => $validated['payment_method'],
            'total' => collect($cart)->sum(fn($item) => $item['price'] * $item['quantity'])
        ]);

        foreach ($cart as $item) {
            $order->items()->create([
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price']
            ]);
        }

        session()->forget('cart');
        return redirect()->route('orders.show', ['order_id' => $order->id]);
    }
}

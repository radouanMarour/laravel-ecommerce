<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart') ?? [];
        return Inertia::render('Cart', [
            'cart' => $cart
        ]);
    }

    public function getCart()
    {
        return response()->json(session()->get('cart') ?? []);
    }

    public function add(Request $request)
    {
        $product = Product::findOrfail($request->product_id);
        $cart = session()->get('cart') ?? [];

        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $request->quantity;
        } else {
            $cart[$product->id] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $request->quantity,
                'image' => $product->main_image
            ];
        }
        session()->put('cart', $cart);
        return response()->json(['message' => 'Product added to cart', 'cart' => $cart]);
    }

    public function update(Request $request)
    {
        $cart = session()->get('cart') ?? [];
        if (isset($cart[$request->product_id])) {
            $cart[$request->product_id]['quantity'] = $request->quantity;
            session()->put('cart', $cart);
        }
        return response()->json(['message' => 'Cart updated', 'cart' => $cart]);
    }

    public function remove(Request $request)
    {
        $cart = session()->get('cart') ?? [];
        if (isset($cart[$request->product_id])) {
            unset($cart[$request->product_id]);
            session()->put('cart', $cart);
        }
        return response()->json(['message' => 'Cart item removed', 'cart' => $cart]);
    }

    public function clear()
    {
        session()->forget('cart');
        return response()->json(['message' => 'Cart cleared', 'cart' => []]);
    }
}

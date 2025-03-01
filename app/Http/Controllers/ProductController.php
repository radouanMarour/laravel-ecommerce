<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function __construct()
    {
        // Share categories with all views
        $categories = Category::all();
        Inertia::share('categories', $categories);
    }

    public function index($category_id, $slug)
    {
        $products = Product::where('category_id', $category_id)->paginate(8);
        return Inertia::render('Shop', [
            'products' => $products,
            'categorySlug' => $slug
        ]);
    }

    public function showAll(Request $request)
    {
        $products = Product::paginate(8);
        return Inertia::render('Shop', [
            'products' => $products
        ]);
    }

    public function show(Request $request, Product $product)
    {
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->inRandomOrder()
            ->take(4)
            ->get();
        return Inertia::render('ProductDetails', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }
}

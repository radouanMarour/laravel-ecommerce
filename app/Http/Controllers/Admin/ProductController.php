<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        $categories = Category::all();
        return Inertia::render('Admin/ManageProducts', [
            'products' => $products,
            'categories' => $categories
        ]);
    }
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/AddProduct', [
            'categories' => $categories
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required',
            'description' => 'required|string',
            'main_image.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'thumbnail_images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $product = Product::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'description' => $request->description,
        ]);

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('images/products', 'public');
            $product->update(['main_image' => $path]);
        }

        if ($request->hasFile('thumbnail_images')) {
            $thumbnail_images = [];
            foreach ($request->file('thumbnail_images') as $image) {
                $path = $image->store('images/products', 'public');
                $thumbnail_images[] = $path;
            }
            $product->update(['thumbnail_images' => $thumbnail_images]);
        }

        return redirect()->route('admin.products')
            ->with('success', 'Product created successfully');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('Admin/EditProduct', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required',
            'description' => 'required|string',
            'main_image.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'thumbnail_images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'description' => $request->description,
        ]);

        if ($request->hasFile('main_image')) {
            if ($product->main_image) {
                Storage::disk('public')->delete($product->main_image);
            }
            $path = $request->file('main_image')->store('images/products', 'public');
            $product->update(['main_image' => $path]);
        }

        if ($request->hasFile('thumbnail_images')) {
            if ($product->thumbnail_images) {
                foreach ($product->thumbnail_images as $thumbnail) {
                    Storage::disk('public')->delete($thumbnail);
                }
            }
            $thumbnail_images = [];
            foreach ($request->file('thumbnail_images') as $image) {
                $path = $image->store('images/products', 'public');
                $thumbnail_images[] = $path;
            }
            $product->update(['thumbnail_images' => $thumbnail_images]);
        }

        return redirect()->route('admin.products')
            ->with('success', 'Product updated successfully');
    }

    public function toggleFeatured(Product $product)
    {
        $product->update([
            'is_featured' => !$product->is_featured
        ]);

        return redirect()->route('products.show', $product->id)
            ->with('success', 'Product featured status updated successfully');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products')
            ->with('success', 'Product deleted successfully');
    }
}

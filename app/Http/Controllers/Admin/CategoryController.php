<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Admin/ManageCategories', [
            'categories' => $categories
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/AddCategory');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories',
            'description' => 'string',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'parent_id' => $request->parent_id,
            'slug' => str()->slug($request->name),
        ]);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images/categories', 'public');
            $category->update([
                'image' => $path
            ]);
        }
        $category->save();
        return redirect()->route('admin.categories');
    }
    public function edit(Category $category)
    {
        return Inertia::render('Admin/EditCategory', [
            'category' => $category
        ]);
    }
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|unique:categories,name,' . $category->id,
            'description' => 'string',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $category->update([
            'name' => $request->name,
            'description' => $request->description,
            'parent_id' => $request->parent_id,
            'slug' => str()->slug($request->name),
        ]);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images/categories', 'public');
            $category->update([
                'image' => $path
            ]);
        }
        $category->save();
        return redirect()->route('admin.categories');
    }
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('admin.categories');
    }
}

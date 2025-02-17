import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Dashboard from "@/Pages/Admin/Dashboard";
import { FaUpload } from "react-icons/fa";

function AddProduct({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        stock: "",
        category_id: "",
        description: "",
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData("images", files);

        // Generate previews for all selected images
        const previews = [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result);
                setImagePreviews([...previews]);
            };
            reader.readAsDataURL(file);
        });
    };

    // Modify the form submit to use FormData
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        formData.append('category', data.category_id);
        formData.append('description', data.description);

        // Append multiple images
        if (data.images) {
            Array.from(data.images).forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });
        }

        post(route("admin.products.store"), formData);
    };

    return (
        <Dashboard auth={auth}>
            <div className="bg-[#0D1B2A] text-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Add New Product</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2">Product Name</label>
                            <input
                                type="text"
                                className="w-full bg-gray-800 p-2 rounded"
                                value={data.name}
                                onChange={e => setData("name", e.target.value)}
                            />
                            {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block mb-2">Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="w-full bg-gray-800 p-2 rounded"
                                value={data.price}
                                onChange={e => setData("price", e.target.value)}
                            />
                            {errors.price && <div className="text-red-500 mt-1">{errors.price}</div>}
                        </div>

                        <div>
                            <label className="block mb-2">Stock</label>
                            <input
                                type="number"
                                className="w-full bg-gray-800 p-2 rounded"
                                value={data.stock}
                                onChange={e => setData("stock", e.target.value)}
                            />
                            {errors.stock && <div className="text-red-500 mt-1">{errors.stock}</div>}
                        </div>

                        <div>
                            <label className="block mb-2">Category</label>
                            <select
                                className="w-full bg-gray-800 p-2 rounded"
                                value={data.category}
                                onChange={e => setData("category_id", e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {
                                    categories?.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                            {errors.category && <div className="text-red-500 mt-1">{errors.category}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2">Description</label>
                        <textarea
                            className="w-full bg-gray-800 p-2 rounded h-32"
                            value={data.description}
                            onChange={e => setData("description", e.target.value)}
                        />
                        {errors.description && <div className="text-red-500 mt-1">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block mb-2">Product Images</label>
                        <div className="flex items-center space-x-4">
                            <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded flex items-center hover:bg-blue-700">
                                <FaUpload className="mr-2" />
                                Choose Images
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    multiple
                                />
                            </label>
                            {imagePreviews.length > 0 && (
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative w-24 h-24">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newPreviews = imagePreviews.filter((_, i) => i !== index);
                                                    setImagePreviews(newPreviews);
                                                    const newFiles = Array.from(data.images).filter((_, i) => i !== index);
                                                    setData("images", newFiles);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.images && <div className="text-red-500 mt-1">{errors.images}</div>}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-500 px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                        >
                            {processing ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
}

export default AddProduct;

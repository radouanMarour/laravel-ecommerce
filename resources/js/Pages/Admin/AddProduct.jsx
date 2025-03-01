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
        main_image: "",
        thumbnail_images: []
    });

    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [thumbnailPreviews, setThumbnailPreviews] = useState([]);

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setData("main_image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleThumbnailsChange = (e) => {
        const files = Array.from(e.target.files);
        setData("thumbnail_images", files);

        const previews = [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result);
                setThumbnailPreviews([...previews]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        formData.append('category_id', data.category_id);
        formData.append('description', data.description);

        // Append main image
        if (data.main_image) {
            formData.append('main_image', data.main_image);
        }

        // Append thumbnail images
        if (data.thumbnail_images) {
            Array.from(data.thumbnail_images).forEach((image, index) => {
                formData.append(`thumbnail_images[${index}]`, image);
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

                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2">Main Product Image</label>
                            <div className="flex items-center space-x-4">
                                <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded flex items-center hover:bg-blue-700">
                                    <FaUpload className="mr-2" />
                                    Choose Main Image
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleMainImageChange}
                                        accept="image/*"
                                    />
                                </label>
                                {mainImagePreview && (
                                    <div className="relative w-24 h-24">
                                        <img
                                            src={mainImagePreview}
                                            alt="Main product image"
                                            className="w-full h-full object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMainImagePreview(null);
                                                setData("main_image", null);
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>
                            {errors.main_image && <div className="text-red-500 mt-1">{errors.main_image}</div>}
                        </div>

                        <div>
                            <label className="block mb-2">Product Thumbnails</label>
                            <div className="flex items-center space-x-4">
                                <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded flex items-center hover:bg-blue-700">
                                    <FaUpload className="mr-2" />
                                    Choose Thumbnails
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleThumbnailsChange}
                                        accept="image/*"
                                        multiple
                                    />
                                </label>
                                {thumbnailPreviews.length > 0 && (
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {thumbnailPreviews.map((preview, index) => (
                                            <div key={index} className="relative w-24 h-24">
                                                <img
                                                    src={preview}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newPreviews = thumbnailPreviews.filter((_, i) => i !== index);
                                                        setThumbnailPreviews(newPreviews);
                                                        const newFiles = Array.from(data.thumbnail_images).filter((_, i) => i !== index);
                                                        setData("thumbnail_images", newFiles);
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
                            {errors.thumbnail_images && <div className="text-red-500 mt-1">{errors.thumbnail_images}</div>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="cursor-pointer bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-green-500 px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
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

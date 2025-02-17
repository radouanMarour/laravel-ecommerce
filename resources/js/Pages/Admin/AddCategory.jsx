import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Dashboard from "@/Pages/Admin/Dashboard";
import { FaUpload } from "react-icons/fa";

function AddCategory({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image);
        }

        post(route("admin.categories.store"), formData);
    };

    return (
        <Dashboard auth={auth}>
            <div className="bg-[#0D1B2A] text-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Add New Category</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2">Category Name</label>
                        <input
                            type="text"
                            className="w-full bg-gray-800 p-2 rounded"
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
                        />
                        {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
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
                        <label className="block mb-2">Category Image</label>
                        <div className="flex items-center space-x-4">
                            <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded flex items-center hover:bg-blue-700">
                                <FaUpload className="mr-2" />
                                Choose Image
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </label>
                            {imagePreview && (
                                <div className="relative w-24 h-24">
                                    <img
                                        src={imagePreview}
                                        alt="Category preview"
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setData("image", null);
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.image && <div className="text-red-500 mt-1">{errors.image}</div>}
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
                            {processing ? "Adding..." : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
}

export default AddCategory;

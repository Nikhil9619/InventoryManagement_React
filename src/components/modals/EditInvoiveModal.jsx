import React, { useEffect, useState } from "react";

export default function EditInvoiceModal({ isOpen, setIsOpen, formData, setFormData,   }) {


    const handleSave = (updatedUser) => {
        setData((prev) =>
            prev.map((item) => (item.id === updatedUser.id ? updatedUser : item))
        );
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Form edit:", name, value);
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         handleSave(formData);
        console.log("Form Submitted:", formData);
        setIsOpen(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {/* Button to open modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
                Open Form Modal
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Modal content */}
                    <div className="relative bg-white rounded-xl shadow-lg w-96 p-6 z-10">
                        <h2 className="text-xl font-bold mb-4">Contact Form</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

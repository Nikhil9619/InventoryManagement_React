import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    User,
    Building2,
    Mail,
    Phone,
    PlusCircle,
    X,
} from "lucide-react";
import {
    getAllCustomers,
    addCustomer,
    updateCustomer,
} from "../services/api/customerService";

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        company_name: "",
        contact_person: "",
        email: "",
        phone: "",
        billing_address: "",
        shipping_address: "",
        gstin: "",
        pan_no: "",
        state: "",
        pincode: "",
        created_at: new Date().toISOString(),
    });

    const fetchCustomers = async () => {
        try {
            const data = await getAllCustomers();
            setCustomers(data);
        } catch (error) {
            // Optionally handle error (e.g., show notification)
        }
    };

    // === Load customers from API ===
    useEffect(() => {
        fetchCustomers();
    }, []);

    // === KPI Calculations ===
    const totalCustomers = customers.length;
    const gstRegistered = customers.filter((c) => c.gstin).length;
    const panRegistered = customers.filter((c) => c.pan_no).length;
    const statesCovered = new Set(customers.map((c) => c.state)).size;

    // === Handle Input Change ===
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    // === Handle Input Change ===
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            console.log("Form Data:", formData);

            const newCustomer = {
                ...formData,
                created_at: new Date().toISOString(),
            };

            const added = await addCustomer(newCustomer);
            console.log("Added Customer:", added);

            // ✅ Update customers list in UI
            setCustomers((prev) => [...prev, added]);
            setFormData({
                company_name: "",
                contact_person: "",
                email: "",
                phone: "",
                billing_address: "",
                shipping_address: "",
                gstin: "",
                pan_no: "",
                state: "",
                pincode: "",
                created_at: new Date().toISOString(),
            });

            // ✅ Close modal
            setShowModal(false);
        } catch (error) {
            console.error("Error adding customer:", error);
            alert("Failed to save customer. Check console for details.");
        }
    };

    return (
        <Layout>


            {/* === KPI CARDS === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">Total Customers</h3>
                    <p className="text-3xl font-semibold text-indigo-600">{totalCustomers}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">GST Registered</h3>
                    <p className="text-3xl font-semibold text-green-600">{gstRegistered}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">PAN Available</h3>
                    <p className="text-3xl font-semibold text-yellow-600">{panRegistered}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">States Covered</h3>
                    <p className="text-3xl font-semibold text-purple-600">{statesCovered}</p>
                </div>
            </div>

            {/* === CUSTOMER TABLE === */}
            <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
                <div className="flex justify-between items-center mb-6">


                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Building2 size={18} /> Customer List
                    </h3>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        <PlusCircle size={18} /> Add Customer
                    </button>
                </div>

                {customers.length === 0 ? (
                    <p className="text-gray-500">No customers found.</p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    {/* <th className="border px-3 py-2 text-left">#</th> */}
                                    <th className="border px-3 py-2 text-left">Company</th>
                                    <th className="border px-3 py-2 text-left">Contact Person</th>
                                    <th className="border px-3 py-2 text-left">Email</th>
                                    <th className="border px-3 py-2 text-left">Phone</th>
                                    <th className="border px-3 py-2 text-left">GSTIN</th>
                                    <th className="border px-3 py-2 text-left">State</th>
                                    <th className="border px-3 py-2 text-left">Created At</th>
                                </tr>
                            </thead>

                            <tbody>
                                {customers.map((cust, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        {/* <td className="border px-3 py-2">{index + 1}</td> */}

                                        <td className="border px-3 py-2 font-semibold text-gray-800">
                                            {cust.company_name || "—"}
                                        </td>

                                        <td className="border px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <User size={14} className="text-gray-500" />
                                                <span>{cust.contact_person || "—"}</span>
                                            </div>
                                        </td>

                                        <td className="border px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-gray-500" />
                                                <span>{cust.email || "—"}</span>
                                            </div>
                                        </td>

                                        <td className="border px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} className="text-gray-500" />
                                                <span>{cust.phone || "—"}</span>
                                            </div>
                                        </td>

                                        <td className="border px-3 py-2">{cust.gstin || "—"}</td>
                                        <td className="border px-3 py-2">{cust.state || "—"}</td>
                                        <td className="border px-3 py-2 text-gray-500">
                                            {cust.created_at
                                                ? new Date(cust.created_at).toLocaleDateString()
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>

            {/* === ADD CUSTOMER MODAL === */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-semibold mb-4">Add New Customer</h3>

                        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                name="contact_person"
                                value={formData.contact_person}
                                onChange={handleChange}
                                placeholder="Contact Person"
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                type="email"
                                className="border p-2 rounded"
                            />
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                type="tel"
                                className="border p-2 rounded"
                            />
                            <input
                                name="gstin"
                                value={formData.gstin}
                                onChange={handleChange}
                                placeholder="GSTIN"
                                className="border p-2 rounded"
                            />
                            <input
                                name="pan_no"
                                value={formData.pan_no}
                                onChange={handleChange}
                                placeholder="PAN No"
                                className="border p-2 rounded"
                            />
                            <input
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                                className="border p-2 rounded"
                            />
                            <input
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Pincode"
                                className="border p-2 rounded"
                            />
                            <textarea
                                name="billing_address"
                                value={formData.billing_address}
                                onChange={handleChange}
                                placeholder="Billing Address"
                                className="border p-2 rounded col-span-2"
                            />
                            <textarea
                                name="shipping_address"
                                value={formData.shipping_address}
                                onChange={handleChange}
                                placeholder="Shipping Address"
                                className="border p-2 rounded col-span-2"
                            />

                            <div className="col-span-2 flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Save Customer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default CustomerPage;

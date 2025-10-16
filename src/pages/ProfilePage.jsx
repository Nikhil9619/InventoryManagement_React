import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/api/profileService";
import { Edit2, Save, Building2, Mail, Phone } from "lucide-react";
import Layout from "../components/Layout";

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        business_name: "",
        legal_name: "",
        gstin: "",
        pan_no: "",
        cin: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: "",
        email: "",
        phone: "",
        bank_name: "",
        account_number: "",
        ifsc_code: "",
        upi_id: "",
        logo_url: "",
        signature_url: "",
    });

    const [isEditing, setIsEditing] = useState(false); // initially form is shown

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            if (data) {
                setProfile(data);
                setIsEditing(false);
            }
        } catch (error) {
            // Optionally handle error (e.g., show notification)
            setIsEditing(true);
        }
    };

    // === Fetch profile from API on mount ===
    useEffect(() => {
        fetchProfile();
    }, []);


    // === Save to API ===
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(profile);
            setIsEditing(false);
        } catch (error) {
            // Optionally handle error (e.g., show notification)
        }
    };

    // === Handle change ===
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // === Handle file upload ===
    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile((prev) => ({ ...prev, [key]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <Layout>
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Business Profile</h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            <Edit2 size={18} /> Edit
                        </button>
                    )}
                </div>

                {/* ==================== VIEW MODE ==================== */}
                {!isEditing && (
                    <div className="bg-white shadow rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
                                {profile.logo_url  ? (
                                    <img
                                        src={profile.logo_url}
                                        alt="Logo"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Building2 className="w-8 h-8 text-gray-400 m-auto mt-4" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">{profile.business_name}</h3>
                                <p className="text-gray-500">{profile.legal_name}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="font-semibold">GSTIN:</p>
                                <p className="text-gray-600">{profile.gstin || "—"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">PAN:</p>
                                <p className="text-gray-600">{profile.pan_no || "—"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">CIN:</p>
                                <p className="text-gray-600">{profile.cin || "—"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Email:</p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Mail size={16} /> {profile.email || "—"}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold">Phone:</p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Phone size={16} /> {profile.phone || "—"}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="font-semibold">Address:</p>
                            <p className="text-gray-600">
                                {profile.address_line1}
                                {profile.address_line2 && `, ${profile.address_line2}`}
                                {profile.city && `, ${profile.city}`}
                                {profile.state && `, ${profile.state}`}
                                {profile.pincode && ` - ${profile.pincode}`}
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="font-semibold">Bank Details:</p>
                            <p className="text-gray-600">
                                {profile.bank_name || "—"} | {profile.account_number || "—"} <br />
                                IFSC: {profile.ifsc_code || "—"} | UPI: {profile.upi_id || "—"}
                            </p>
                        </div>

                        {profile.signature_url && (
                            <div>
                                <p className="font-semibold mb-1">Authorized Signature:</p>
                                <img
                                    src={profile.signature_url}
                                    alt="Signature"
                                    className="h-12 border rounded"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== EDIT MODE (FORM) ==================== */}
                {isEditing && (
                    <form
                        onSubmit={handleSave}
                        className="bg-white shadow rounded-xl p-6 space-y-6"
                    >
                        {/* === Business Info === */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                name="business_name"
                                value={profile.business_name}
                                onChange={handleChange}
                                placeholder="Business Name"
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                name="legal_name"
                                value={profile.legal_name}
                                onChange={handleChange}
                                placeholder="Legal Name"
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                name="gstin"
                                value={profile.gstin}
                                onChange={handleChange}
                                placeholder="GSTIN"
                                className="border p-2 rounded"
                            />
                            <input
                                name="pan_no"
                                value={profile.pan_no}
                                onChange={handleChange}
                                placeholder="PAN Number"
                                className="border p-2 rounded"
                            />
                            <input
                                name="cin"
                                value={profile.cin}
                                onChange={handleChange}
                                placeholder="CIN"
                                className="border p-2 rounded"
                            />
                        </div>

                        {/* === Address === */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                name="address_line1"
                                value={profile.address_line1}
                                onChange={handleChange}
                                placeholder="Address Line 1"
                                className="border p-2 rounded"
                            />
                            <input
                                name="address_line2"
                                value={profile.address_line2}
                                onChange={handleChange}
                                placeholder="Address Line 2"
                                className="border p-2 rounded"
                            />
                            <input
                                name="city"
                                value={profile.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="border p-2 rounded"
                            />
                            <input
                                name="state"
                                value={profile.state}
                                onChange={handleChange}
                                placeholder="State"
                                className="border p-2 rounded"
                            />
                            <input
                                name="pincode"
                                value={profile.pincode}
                                onChange={handleChange}
                                placeholder="Pincode"
                                className="border p-2 rounded"
                            />
                        </div>

                        {/* === Contact Info === */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                placeholder="Email"
                                type="email"
                                className="border p-2 rounded"
                            />
                            <input
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                type="tel"
                                className="border p-2 rounded"
                            />
                        </div>

                        {/* === Bank Info === */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                name="bank_name"
                                value={profile.bank_name}
                                onChange={handleChange}
                                placeholder="Bank Name"
                                className="border p-2 rounded"
                            />
                            <input
                                name="account_number"
                                value={profile.account_number}
                                onChange={handleChange}
                                placeholder="Account Number"
                                className="border p-2 rounded"
                            />
                            <input
                                name="ifsc_code"
                                value={profile.ifsc_code}
                                onChange={handleChange}
                                placeholder="IFSC Code"
                                className="border p-2 rounded"
                            />
                            <input
                                name="upi_id"
                                value={profile.upi_id}
                                onChange={handleChange}
                                placeholder="UPI ID"
                                className="border p-2 rounded"
                            />
                        </div>

                        {/* === Logo & Signature Upload === */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Upload Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "logo_url")}
                                />
                                {profile.logo_url && (
                                    <img
                                        src={profile.logo_url}
                                        alt="Logo"
                                        className="mt-2 h-16 rounded border"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Upload Signature
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "signature_url")}
                                />
                                {profile.signature_url && (
                                    <img
                                        src={profile.signature_url}
                                        alt="Signature"
                                        className="mt-2 h-16 rounded border"
                                    />
                                )}
                            </div>
                        </div>

                        {/* === Buttons === */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                <Save size={18} /> Save
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Layout>
    );
}

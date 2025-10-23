import React, { useState, useEffect } from "react";
import { getAllCustomers } from "../services/api/customerService";

export default function InvoiceModal({ show, onClose, onSave, editData }) {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    invoice_number: "",
    business_id: "BIZ001",
    customer_id: "",
    invoice_date: "",
    due_date: "",
    place_of_supply: "",
    subtotal: 0,
    cgst_amount: 0,
    sgst_amount: 0,
    igst_amount: 0,
    total_tax: 0,
    discount_amount: 0,
    total_amount: 0,
    amount_in_words: "",
    payment_mode: "",
    payment_status: "Pending",
    notes: "",
    template_id: "",
    pdf_path: "",
    created_at: new Date().toISOString(),
    is_deleted: false,
    billing_address: "",
    shipping_address: "",
    gstin: "",
    pan_no: "",
    state: "",
    pincode: "",
    products: [{ description: "", hsn: "", qty: 1, rate: 0, amount: 0 }],
  });

  const businessState = "Maharashtra"; // your registered business state

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data || []);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  // 🧠 Handle all basic field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧾 Customer selection + auto-fill
  const handleCustomerSelect = (e) => {
    const selectedId = e.target.value;
    const selectedCustomer = customers.find(
      (c) => c.id?.toString() === selectedId
    );

    if (selectedCustomer) {
      const supplyType =
        selectedCustomer.state === businessState ? "Intrastate" : "Interstate";

      setFormData((prev) => ({
        ...prev,
        customer_id: selectedCustomer.id,
        place_of_supply: supplyType,
        billing_address: selectedCustomer.billing_address || "",
        shipping_address: selectedCustomer.shipping_address || "",
        gstin: selectedCustomer.gstin || "",
        pan_no: selectedCustomer.pan_no || "",
        state: selectedCustomer.state || "",
        pincode: selectedCustomer.pincode || "",
      }));
    }
  };

  // 🧮 Product and totals logic
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.products];
    updated[index][name] = value;
    updated[index].amount = updated[index].qty * updated[index].rate;
    setFormData((prev) => ({ ...prev, products: updated }));
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { description: "", hsn: "", qty: 1, rate: 0, gst: 0, amount: 0 },
      ],
    }));
  };

  const removeProduct = (index) => {
    const updated = formData.products.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, products: updated }));
  };

  const calculateTotals = () => {
    const subtotal = formData.products.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    let cgst = 0,
      sgst = 0,
      igst = 0;

    if (formData.place_of_supply === "Intrastate") {
      cgst = subtotal * 0.09;
      sgst = subtotal * 0.09;
    } else if (formData.place_of_supply === "Interstate") {
      igst = subtotal * 0.18;
    }

    const totalTax = cgst + sgst + igst;
    const discount = Number(formData.discount_amount) || 0;
    const totalAmount = subtotal + totalTax - discount;

    setFormData((prev) => ({
      ...prev,
      subtotal,
      cgst_amount: cgst,
      sgst_amount: sgst,
      igst_amount: igst,
      total_tax: totalTax,
      total_amount: totalAmount,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!show) return null;

  const selectedCustomer = customers.find((c) => c.id === formData.customer_id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl p-8 relative">
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {editData ? "Edit Invoice" : "Create New Invoice"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* === Customer Dropdown === */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Customer
            </label>
            <select
              name="customer_id"
              value={formData.customer_id}
              onChange={handleCustomerSelect}
              className="border p-2 rounded w-full mt-1"
            >
              <option value="">Select Customer</option>
              {customers.map((cust) => (
                <option key={cust.id} value={cust.id}>
                  {cust.company_name} ({cust.state})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Invoice Date
            </label>
            <input
              type="date"
              name="invoice_date"
              value={formData.invoice_date}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
        </div>

        {/* === Billing & Shipping (Editable) === */}
        {selectedCustomer && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Billing Address
              </h3>
              <textarea
                name="billing_address"
                value={formData.billing_address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="3"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Shipping Address
              </h3>
              <textarea
                name="shipping_address"
                value={formData.shipping_address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="3"
              />
            </div>
          </div>
        )}

        {selectedCustomer && (
          <div className="bg-gray-50 border p-3 rounded mb-6 text-sm text-gray-700">
            <p>
              <strong>GSTIN:</strong> {formData.gstin || "—"} |{" "}
              <strong>PAN:</strong> {formData.pan_no || "—"} |{" "}
              <strong>State:</strong> {formData.state || "—"}
            </p>
            <p className="text-indigo-700 mt-1">
              {formData.place_of_supply === "Intrastate"
                ? "Applicable: CGST + SGST (9% each)"
                : "Applicable: IGST (18%)"}
            </p>
          </div>
        )}

        {/* === Product Table === */}
        <h3 className="text-lg font-semibold mb-2">Products</h3>
        {/* === Product Table === */}
        <h3 className="text-lg font-semibold mb-2">Products</h3>
        <div className="overflow-x-auto mb-6">
          {/* Make the table body scrollable */}
          <div className="max-h-64 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="border px-2 py-1">#</th>
                  <th className="border px-2 py-1 text-left">Description</th>
                  <th className="border px-2 py-1 text-left">HSN</th>
                  <th className="border px-2 py-1 text-left">Qty</th>
                  <th className="border px-2 py-1 text-left">Rate</th>
                  <th className="border px-2 py-1 text-left">GST</th>
                  <th className="border px-2 py-1 text-right">Amount</th>
                  <th className="border px-2 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {formData.products.map((item, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1 text-center">{i + 1}</td>
                    <td className="border px-2 py-1">
                      <input
                        name="description"
                        value={item.description}
                        onChange={(e) => handleProductChange(i, e)}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        name="hsn"
                        value={item.hsn}
                        onChange={(e) => handleProductChange(i, e)}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        name="qty"
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleProductChange(i, e)}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        name="rate"
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleProductChange(i, e)}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border px-2 py-1 text-right">
                      ₹{Number(item.amount || 0).toFixed(2)}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {formData.products.length > 1 && (
                        <button
                          onClick={() => removeProduct(i)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={addProduct}
          className="mt-3 text-sm text-blue-600 font-medium"
        >
          + Add Product
        </button>

        {/* === Totals === */}
        <div className="border-t pt-4 grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
            <p>Subtotal: ₹{formData.subtotal.toFixed(2)}</p>
            <p>CGST: ₹{formData.cgst_amount.toFixed(2)}</p>
            <p>SGST: ₹{formData.sgst_amount.toFixed(2)}</p>
            <p>IGST: ₹{formData.igst_amount.toFixed(2)}</p>
            <p>Total Tax: ₹{formData.total_tax.toFixed(2)}</p>
            <p>Discount: ₹{formData.discount_amount}</p>
            <p className="text-lg font-bold text-indigo-700 border-t pt-2">
              Total: ₹{formData.total_amount.toFixed(2)}
            </p>
            <button
              onClick={calculateTotals}
              className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
            >
              Calculate Totals
            </button>
          </div>
        </div>

        {/* === Action Buttons === */}
        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editData ? "Update Invoice" : "Save Invoice"}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function InvoiceModal({ show, onClose, onSave, editData }) {
  const [formData, setFormData] = useState({
    customerName: "",
    siteAddress: "",
    billAddress: "",
    gstNo: "",
    pan: "",
    contact: "",
    invoiceNo: "",
    date: "",
    cgst: 9,
    sgst: 9,
    totalBeforeTax: 0,
    totalAfterTax: 0,
    products: [
      { description: "", hsn: "", qty: 1, rate: 0, amount: 0 },
    ],
  });

  // Prefill if editing
  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  // Handle customer/invoice info changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product field change
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];
    updatedProducts[index][name] = value;

    // auto-calc item amount
    updatedProducts[index].amount =
      updatedProducts[index].qty * updatedProducts[index].rate;

    setFormData((prev) => ({ ...prev, products: updatedProducts }));
  };

  // Add new product row
  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { description: "", hsn: "", qty: 1, rate: 0, amount: 0 }],
    }));
  };

  // Remove product row
  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, products: updatedProducts }));
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = formData.products.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
    const tax = (subtotal * (Number(formData.cgst) + Number(formData.sgst))) / 100;
    const total = subtotal + tax;

    setFormData((prev) => ({
      ...prev,
      totalBeforeTax: subtotal,
      totalAfterTax: total,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">
          {editData ? "Edit Invoice" : "Create New Invoice"}
        </h2>

        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* === Customer Info === */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Customer Name"
            className="border p-2 rounded"
          />
          <input
            name="invoiceNo"
            value={formData.invoiceNo}
            onChange={handleChange}
            placeholder="Invoice No"
            className="border p-2 rounded"
          />
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="border p-2 rounded"
          />
          <textarea
            name="siteAddress"
            value={formData.siteAddress}
            onChange={handleChange}
            placeholder="Site Address"
            className="border p-2 rounded col-span-2"
          />
          <textarea
            name="billAddress"
            value={formData.billAddress}
            onChange={handleChange}
            placeholder="Billing Address"
            className="border p-2 rounded col-span-2"
          />
          <input
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            placeholder="GST No"
            className="border p-2 rounded"
          />
          <input
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            placeholder="PAN"
            className="border p-2 rounded"
          />
        </div>

        {/* === Product Items === */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Product Details</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-left">#</th>
                <th className="border px-2 py-1 text-left">Description</th>
                <th className="border px-2 py-1 text-left">HSN</th>
                <th className="border px-2 py-1 text-left">Qty</th>
                <th className="border px-2 py-1 text-left">Rate</th>
                <th className="border px-2 py-1 text-left">Amount</th>
                <th className="border px-2 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {formData.products.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">
                    <input
                      name="description"
                      value={item.description}
                      onChange={(e) => handleProductChange(index, e)}
                      placeholder="Description"
                      className="w-full border p-1 rounded"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="hsn"
                      value={item.hsn}
                      onChange={(e) => handleProductChange(index, e)}
                      placeholder="HSN"
                      className="w-full border p-1 rounded"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="qty"
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleProductChange(index, e)}
                      className="w-full border p-1 rounded"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="rate"
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleProductChange(index, e)}
                      className="w-full border p-1 rounded"
                    />
                  </td>
                  <td className="border px-2 py-1 text-right">
                    ₹{Number(item.amount || 0).toFixed(2)}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {formData.products.length > 1 && (
                      <button
                        onClick={() => removeProduct(index)}
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

        <button
          onClick={addProduct}
          className="mt-3 text-sm text-blue-600 font-medium"
        >
          + Add Product
        </button>

        {/* === Totals === */}
        <button
          onClick={calculateTotals}
          className="mt-4 bg-blue-500 text-white px-3 py-1.5 rounded"
        >
          Calculate Total
        </button>

        <div className="mt-3">
          <p>Total Before Tax: ₹{formData.totalBeforeTax.toFixed(2)}</p>
          <p>CGST ({formData.cgst}%): ₹{(formData.totalBeforeTax * formData.cgst) / 100}</p>
          <p>SGST ({formData.sgst}%): ₹{(formData.totalBeforeTax * formData.sgst) / 100}</p>
          <p className="font-bold">Total After Tax: ₹{formData.totalAfterTax.toFixed(2)}</p>
        </div>

        {/* === Buttons === */}
        <div className="mt-6 flex justify-end gap-3">
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

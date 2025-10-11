import React, { useState, useEffect } from "react";

export default function InvoiceForm() {
  // 🧩 Dummy invoice list (can be replaced or extended)
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      customerName: "UNIQUE INSTRUMENTS NANDANI INSTRUMENTS AND SERVICES",
      siteAddress: "34 HAJI ISMAIL GANI BLDG. BYCALLA (E) MUMBAI 27",
      billAddress: "SHOP NO.2, D-16,SAI SAYALI CHS LTD, SECTOR 9, AIROLI, NAVI MUMBAI - 400708",
      gstNo: "27NJKPS4516K1ZD",
      pan: "NJKPS4516K",
      contact: "7039968259",
      invoiceNo: "156",
      date: "2025-10-07",
      description: "FLOW TABLE 750*750",
      hsn: "9024",
      qty: 1,
      rate: 7000,
      cgst: 9,
      sgst: 9,
      totalBeforeTax: 7000,
      totalAfterTax: 8260,
      bankName: "THANE BHARAT SAHAKARI BANK LTD.",
      accountNo: "015110000000670",
      ifsc: "TBSB0000015",
      branch: "AIROLI",
    },
  ]);

  // 🧾 Form state for new invoice
  const [formData, setFormData] = useState({
    customerName: "",
    siteAddress: "",
    billAddress: "",
    gstNo: "",
    pan: "",
    contact: "",
    invoiceNo: "",
    date: "",
    description: "",
    hsn: "",
    qty: 1,
    rate: 0,
    cgst: 9,
    sgst: 9,
    totalBeforeTax: 0,
    totalAfterTax: 0,
    bankName: "",
    accountNo: "",
    ifsc: "",
    branch: "",
  });

  // Load stored invoices (if any)
  useEffect(() => {
    const saved = localStorage.getItem("invoices");
    if (saved) setInvoices(JSON.parse(saved));
  }, []);

  // Save invoices automatically
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotals = () => {
    const amount = formData.qty * formData.rate;
    const tax = (amount * (formData.cgst + formData.sgst)) / 100;
    const total = amount + tax;
    setFormData((prev) => ({
      ...prev,
      totalBeforeTax: amount,
      totalAfterTax: total,
    }));
  };

  const handleSave = () => {
    const newInvoice = { ...formData, id: Date.now() };
    setInvoices((prev) => [...prev, newInvoice]);
    setFormData({
      customerName: "",
      siteAddress: "",
      billAddress: "",
      gstNo: "",
      pan: "",
      contact: "",
      invoiceNo: "",
      date: "",
      description: "",
      hsn: "",
      qty: 1,
      rate: 0,
      cgst: 9,
      sgst: 9,
      totalBeforeTax: 0,
      totalAfterTax: 0,
      bankName: "",
      accountNo: "",
      ifsc: "",
      branch: "",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Tax Invoice Form</h1>

      {/* ==== FORM ==== */}
      <div className="grid grid-cols-2 gap-4">
        <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" className="border p-2 rounded" />
        <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="border p-2 rounded" />
        <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 rounded" />
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="border p-2 rounded" />
        <textarea name="siteAddress" value={formData.siteAddress} onChange={handleChange} placeholder="Site Address" className="border p-2 rounded col-span-2" />
        <textarea name="billAddress" value={formData.billAddress} onChange={handleChange} placeholder="Billing Address" className="border p-2 rounded col-span-2" />
        <input name="gstNo" value={formData.gstNo} onChange={handleChange} placeholder="GST No" className="border p-2 rounded" />
        <input name="pan" value={formData.pan} onChange={handleChange} placeholder="PAN" className="border p-2 rounded" />
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Item Details</h2>
      <div className="grid grid-cols-4 gap-2">
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded col-span-2" />
        <input name="hsn" value={formData.hsn} onChange={handleChange} placeholder="HSN" className="border p-2 rounded" />
        <input name="qty" type="number" value={formData.qty} onChange={handleChange} placeholder="Qty" className="border p-2 rounded" />
        <input name="rate" type="number" value={formData.rate} onChange={handleChange} placeholder="Rate" className="border p-2 rounded" />
      </div>

      <button onClick={calculateTotals} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Calculate Total
      </button>

      <div className="mt-4">
        <p>Total Before Tax: ₹{formData.totalBeforeTax}</p>
        <p>CGST ({formData.cgst}%): ₹{(formData.totalBeforeTax * formData.cgst) / 100}</p>
        <p>SGST ({formData.sgst}%): ₹{(formData.totalBeforeTax * formData.sgst) / 100}</p>
        <p className="font-bold">Total After Tax: ₹{formData.totalAfterTax}</p>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Bank Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" className="border p-2 rounded" />
        <input name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Account No" className="border p-2 rounded" />
        <input name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="IFSC Code" className="border p-2 rounded" />
        <input name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" className="border p-2 rounded" />
      </div>

      <button onClick={handleSave} className="mt-6 bg-green-600 text-white px-4 py-2 rounded">
        Save Invoice
      </button>

      <p className="text-sm mt-4 text-gray-600">All invoices are saved locally in your browser.</p>

      {/* ==== SAVED INVOICES ==== */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Saved Invoices</h2>
      <ul className="space-y-2">
        {invoices.map((inv) => (
          <li key={inv.id} className="border p-3 rounded bg-gray-50">
            <div className="font-semibold">Invoice #{inv.invoiceNo}</div>
            <div>{inv.customerName}</div>
            <div>₹{inv.totalAfterTax}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

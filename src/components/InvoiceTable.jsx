import React, { useState, useEffect } from "react";
import EditInvoiceModal from "./modals/EditInvoiveModal";
import usersData from "../data/invoices";
import InvoiceManager from "./InvoiceManager";

// const UserTable = () => {
//   const [data, setData] = useState(usersData);

//   const [showModal, setShowModal] = useState(false);
//   const [invoices, setInvoices] = useState([]);

//   const handleSaveInvoice = (invoice) => {
//     const newInvoices = [...invoices, { ...invoice, id: Date.now() }];
//     setInvoices(newInvoices);
//     localStorage.setItem("invoices", JSON.stringify(newInvoices));
//   };

//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const filteredUsers = usersData.filter(
//     (user) =>
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase()) ||
//       user.position.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleEditInVoice = (user) => {
//     setFormData(user);
//     setIsOpen(true);
//   }


//   const handleSave = (updatedUser) => {
//     setData((prev) =>
//       prev.map((item) => (item.id === updatedUser.id ? updatedUser : item))
//     );
//   };

//   return (
//     <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
//       {/* Top Controls */}
//       <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
//         {/* Action Button (for future dropdown) */}
//         <div>
//           {/* <button
//             className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
//             type="button"
//           >
//             Action
//             <svg
//               className="w-2.5 h-2.5 ml-2.5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 10 6"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 4 4 4-4"
//               />
//             </svg>
//           </button> */}
//           <button
//             className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2"
//             type="button"
//             onClick={() => setShowModal(true)}
//           >
//             Create Invoice
//             <svg
//               className="w-4 h-4 ml-2"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//           </button>
//         </div>

//         <InvoiceManager
//           show={showModal}
//           onClose={() => setShowModal(false)}
//           onSave={handleSaveInvoice}
//         />

//         <h2 className="text-xl font-semibold mt-8 mb-3">Saved Invoices</h2>
//         {invoices.length === 0 ? (
//           <p className="text-gray-500">No invoices yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {invoices.map((inv) => (
//               <li key={inv.id} className="border p-3 rounded bg-gray-50">
//                 <div className="font-semibold">Invoice #{inv.invoiceNo}</div>
//                 <div>{inv.customerName}</div>
//                 <div>₹{inv.totalAfterTax}</div>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Search Input */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <svg
//               className="w-4 h-4 text-gray-500"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             id="table-search-users"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Search for users"
//           />
//         </div>
//       </div>

//       {/* User Table */}
//       <table className="w-full text-sm text-left text-gray-500">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//           <tr>
//             <th scope="col" className="p-4">
//               <input
//                 id="checkbox-all"
//                 type="checkbox"
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
//               />
//             </th>
//             <th scope="col" className="px-6 py-3">Invoice No.</th>
//             <th scope="col" className="px-6 py-3">T0</th>
//             <th scope="col" className="px-6 py-3">Status</th>
//             <th scope="col" className="px-6 py-3">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user) => (
//             <tr
//               key={user.id}
//               className="bg-white border-b hover:bg-gray-50"
//             >
//               <td className="w-4 p-4">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
//                 />
//               </td>
//               <th
//                 scope="row"
//                 className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
//               >
//                 <img
//                   className="w-10 h-10 rounded-full"
//                   src={user.image}
//                   alt={`${user.name} avatar`}
//                 />
//                 <div className="pl-3">
//                   <div className="text-base font-semibold">{user.name}</div>
//                   <div className="font-normal text-gray-500">{user.email}</div>
//                 </div>
//               </th>
//               <td className="px-6 py-4">{user.position}</td>
//               <td className="px-6 py-4">
//                 <div className="flex items-center">
//                   <div
//                     className={`h-2.5 w-2.5 rounded-full mr-2 ${user.status === "Online" ? "bg-green-500" : "bg-red-500"
//                       }`}
//                   ></div>
//                   {user.status}
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleEditInVoice(user)}
//                   className="font-medium text-blue-600 hover:underline"
//                 >
//                   Edit user
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isOpen && <EditInvoiceModal isOpen={isOpen} setIsOpen={setIsOpen} formData={formData} setFormData={setFormData} />}
//     </div>
//   );
// };

// export default UserTable;

// import React, { useState, useEffect } from "react";
// import InvoiceModal from "./modals/InvoiceModal"; // your modal file (with multiple product support)

// export default function InvoiceTable(onInvoicesChange) {
//   const [invoices, setInvoices] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editInvoice, setEditInvoice] = useState(null);
//   const [search, setSearch] = useState("");

//   // Load invoices from localStorage on mount
//   useEffect(() => {
//     const saved = localStorage.getItem("invoices");
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setInvoices(parsed);
//       if (onInvoicesChange) onInvoicesChange(parsed);
//     }

//   }, []);

//   const saveInvoices = (updated) => {
//     saveInvoices(updatedInvoices);
//     localStorage.setItem("invoices", JSON.stringify(updated));
//     if (onInvoicesChange) onInvoicesChange(updated);
//   };

//   // Save invoices whenever changed
//   useEffect(() => {
//     localStorage.setItem("invoices", JSON.stringify(invoices));
//   }, [invoices]);

//   const handleSaveInvoice = (invoice) => {
//     if (editInvoice) {
//       // Update existing
//       const updated = invoices.map((inv) =>
//         inv.id === editInvoice.id ? { ...invoice, id: editInvoice.id } : inv
//       );
//       saveInvoices(updatedInvoices);
//       setEditInvoice(null);
//     } else {
//       // Add new
//       const newInvoice = { ...invoice, id: Date.now(), status: "Pending" };
//       saveInvoices([...invoices, newInvoice]);
//     }
//     setShowModal(false);
//   };

//   const handleEdit = (invoice) => {
//     setEditInvoice(invoice);
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this invoice?")) {
//       setInvoices(invoices.filter((inv) => inv.id !== id));
//     }
//   };

//   const filteredInvoices = invoices.filter(
//     (inv) =>
//       inv.customerName?.toLowerCase().includes(search.toLowerCase()) ||
//       inv.invoiceNo?.toString().includes(search)
//   );

//   return (
//     <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
//       {/* Header controls */}
//       <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-white border-b">
//         {/* Create Button */}
//         <button
//           className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2"
//           type="button"
//           onClick={() => {
//             setEditInvoice(null);
//             setShowModal(true);
//           }}
//         >
//           Create Invoice
//           <svg
//             className="w-4 h-4 ml-2"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//         </button>

//         {/* Search */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <svg
//               className="w-4 h-4 text-gray-500"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-72 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Search invoices..."
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <table className="w-full text-sm text-left text-gray-500">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//           <tr>
//             <th className="p-4">#</th>
//             <th className="px-6 py-3">Invoice No.</th>
//             <th className="px-6 py-3">Customer</th>
//             <th className="px-6 py-3">Date</th>
//             <th className="px-6 py-3">Total (₹)</th>
//             <th className="px-6 py-3">Status</th>
//             <th className="px-6 py-3 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredInvoices.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="text-center py-6 text-gray-500">
//                 No invoices found.
//               </td>
//             </tr>
//           ) : (
//             filteredInvoices.map((inv, idx) => (
//               <tr
//                 key={inv.id}
//                 className="bg-white border-b hover:bg-gray-50"
//               >
//                 <td className="p-4 text-gray-700">{idx + 1}</td>
//                 <td className="px-6 py-4 font-semibold text-gray-900">{inv.invoiceNo}</td>
//                 <td className="px-6 py-4 flex items-center gap-3">
//                   <img
//                     className="w-8 h-8 rounded-full object-cover"
//                     src={`https://ui-avatars.com/api/?name=${encodeURIComponent(inv.customerName)}&background=random`}
//                     alt={inv.customerName}
//                   />
//                   <span>{inv.customerName}</span>
//                 </td>
//                 <td className="px-6 py-4">{inv.date || "-"}</td>
//                 <td className="px-6 py-4 font-medium text-gray-900">
//                   ₹{Number(inv.totalAfterTax || 0).toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full font-medium ${inv.status === "Paid"
//                       ? "bg-green-100 text-green-700"
//                       : inv.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-gray-100 text-gray-700"
//                       }`}
//                   >
//                     {inv.status || "Pending"}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   <div className="flex justify-center gap-2">
//                     <button
//                       onClick={() => handleEdit(inv)}
//                       className="text-blue-600 hover:text-blue-800 text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(inv.id)}
//                       className="text-red-600 hover:text-red-800 text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Modal for Create/Edit */}
//       <InvoiceManager
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onSave={handleSaveInvoice}
//         editData={editInvoice}
//       />
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import InvoiceModal from "./modals/InvoiceModal"; // your form modal

export default function InvoiceTable({ onInvoicesChange }) {
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [search, setSearch] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("invoices");
    if (saved) {
      const parsed = JSON.parse(saved);
      setInvoices(parsed);
      if (onInvoicesChange) onInvoicesChange(parsed);
    }
  }, []);

  // Save to localStorage + inform parent
  const saveInvoices = (updated) => {
    setInvoices(updated);
    localStorage.setItem("invoices", JSON.stringify(updated));
    if (onInvoicesChange) onInvoicesChange(updated);
  };

  const handleSaveInvoice = (invoice) => {
    if (editInvoice) {
      // Update existing
      const updated = invoices.map((inv) =>
        inv.id === editInvoice.id ? { ...invoice, id: editInvoice.id } : inv
      );
      saveInvoices(updated);
      setEditInvoice(null);
    } else {
      // Add new
      const newInvoice = {
        ...invoice,
        id: Date.now(),
        status: "Pending",
      };
      saveInvoices([...invoices, newInvoice]);
    }
    setShowModal(false);
  };

  const handleEdit = (invoice) => {
    setEditInvoice(invoice);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      const updated = invoices.filter((inv) => inv.id !== id);
      saveInvoices(updated);
    }
  };

  const handleMarkAsPaid = (id) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, status: "Paid" } : inv
    );
    saveInvoices(updated);
  };

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNo?.toString().includes(search)
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-white border-b">
        <button
          className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2"
          type="button"
          onClick={() => {
            setEditInvoice(null);
            setShowModal(true);
          }}
        >
          Create Invoice
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-72 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search invoices..."
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="p-4">#</th>
            <th className="px-6 py-3">Invoice No.</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Total (₹)</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No invoices found.
              </td>
            </tr>
          ) : (
            filteredInvoices.map((inv, idx) => (
              <tr key={inv.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4 text-gray-700">{idx + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {inv.invoiceNo}
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      inv.customerName
                    )}&background=random`}
                    alt={inv.customerName}
                  />
                  <span>{inv.customerName}</span>
                </td>
                <td className="px-6 py-4">{inv.date || "-"}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ₹{Number(inv.totalAfterTax || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${inv.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : inv.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {inv.status || "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(inv)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    {inv.status !== "Paid" && (
                      <button
                        onClick={() => handleMarkAsPaid(inv.id)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Mark as Paid
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(inv.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Create/Edit */}
      <InvoiceManager
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveInvoice}
        editData={editInvoice}
      />
    </div>
  );
}

// import React from "react";
// import Layout from "../components/Layout";
// import invoices from "../data/invoices";
// import InvoiceTable from "../components/InvoiceTable";

// const Dashboard = () => {
//   const totalAmount = invoices.reduce((sum, inv) => sum + inv.total, 0);
//   const paid = invoices.filter((i) => i.status === "Paid").length;
//   const unpaid = invoices.filter((i) => i.status === "Unpaid").length;
//   const overdue = invoices.filter((i) => i.status === "Overdue").length;

//   return (
//     <Layout>
//       <h2 className="text-2xl font-bold mb-6">Overview</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white shadow rounded-xl p-6">
//           <h3 className="text-gray-500">Total Invoices</h3>
//           <p className="text-2xl font-semibold text-indigo-600">
//             {invoices.length}
//           </p>
//           <p className="text-gray-400 text-sm">${totalAmount}</p>
//         </div>
//         <div className="bg-white shadow rounded-xl p-6">
//           <h3 className="text-gray-500">Paid</h3>
//           <p className="text-2xl font-semibold text-green-600">{paid}</p>
//         </div>
//         <div className="bg-white shadow rounded-xl p-6">
//           <h3 className="text-gray-500">Unpaid</h3>
//           <p className="text-2xl font-semibold text-yellow-600">{unpaid}</p>
//         </div>
//         <div className="bg-white shadow rounded-xl p-6">
//           <h3 className="text-gray-500">Overdue</h3>
//           <p className="text-2xl font-semibold text-red-600">{overdue}</p>
//         </div>
//       </div>
      
//       <InvoiceTable/>
      
//     </Layout>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import InvoiceTable from "../components/InvoiceTable";



const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);

  // ✅ Load invoices from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("invoices");
    if (saved) setInvoices(JSON.parse(saved));
  }, []);

  // ✅ Calculate KPI metrics
  const totalAmount = invoices.reduce(
    (sum, inv) => sum + (Number(inv.totalAfterTax) || 0),
    0
  );
  const totalInvoices = invoices.length;
  const paid = invoices.filter((i) => i.status === "Paid").length;
  const unpaid = invoices.filter((i) => i.status === "Pending" || i.status === "Unpaid").length;
  const overdue = invoices.filter((i) => i.status === "Overdue").length;

  // ✅ Listen for invoice updates (e.g., from InvoiceTable)
  // This ensures that when you add/edit/delete an invoice, Dashboard KPIs update automatically.
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("invoices");
      if (saved) setInvoices(JSON.parse(saved));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      {/* === KPI CARDS === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Total Invoices</h3>
          <p className="text-2xl font-semibold text-indigo-600">{totalInvoices}</p>
          <p className="text-gray-400 text-sm">
            ₹{totalAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Paid</h3>
          <p className="text-2xl font-semibold text-green-600">{paid}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Unpaid</h3>
          <p className="text-2xl font-semibold text-yellow-600">{unpaid}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Overdue</h3>
          <p className="text-2xl font-semibold text-red-600">{overdue}</p>
        </div>
      </div>

      {/* === INVOICE TABLE === */}
      <InvoiceTable onInvoicesChange={setInvoices} />
    </Layout>
  );
};

export default Dashboard;

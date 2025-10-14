// import { Layout } from "lucide-react";
import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
// import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [stats, setStats] = useState({
    totalSales: 0,
    totalTax: 0,
    avgInvoice: 0,
    totalInvoices: 0,
  });

  // === Load data from localStorage ===
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(stored);
    setFilteredInvoices(stored);
  }, []);

  // === Handle filter by month ===
  useEffect(() => {
    if (selectedMonth === "All") {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter((inv) => {
        const month = new Date(inv.date).toLocaleString("default", {
          month: "long",
        });
        return month === selectedMonth;
      });
      setFilteredInvoices(filtered);
    }
  }, [selectedMonth, invoices]);

  // === Recalculate stats ===
  useEffect(() => {
    if (!filteredInvoices.length) {
      setStats({
        totalSales: 0,
        totalTax: 0,
        avgInvoice: 0,
        totalInvoices: 0,
      });
      return;
    }

    const totalSales = filteredInvoices.reduce(
      (sum, inv) => sum + (inv.totalAfterTax || 0),
      0
    );
    const totalTax = filteredInvoices.reduce(
      (sum, inv) =>
        sum +
        ((inv.totalBeforeTax * (Number(inv.cgst) + Number(inv.sgst))) / 100 || 0),
      0
    );
    const avgInvoice = totalSales / filteredInvoices.length;

    setStats({
      totalSales,
      totalTax,
      avgInvoice,
      totalInvoices: filteredInvoices.length,
    });
  }, [filteredInvoices]);

  // === Extract month names for dropdown ===
  const uniqueMonths = [
    "All",
    ...new Set(
      invoices.map((inv) =>
        new Date(inv.date).toLocaleString("default", { month: "long" })
      )
    ),
  ];

  // === Build monthly data for charts ===
  const monthlyData = Object.values(
    filteredInvoices.reduce((acc, inv) => {
      const month = new Date(inv.date).toLocaleString("default", {
        month: "short",
      });
      if (!acc[month]) acc[month] = { month, sales: 0, tax: 0 };
      acc[month].sales += inv.totalAfterTax || 0;
      acc[month].tax +=
        (inv.totalBeforeTax * (Number(inv.cgst) + Number(inv.sgst))) / 100 || 0;
      return acc;
    }, {})
  );

  // === Customer-wise sales data ===
  const customerSales = Object.values(
    filteredInvoices.reduce((acc, inv) => {
      const name = inv.customerName || "Unknown";
      if (!acc[name]) acc[name] = { name, value: 0 };
      acc[name].value += inv.totalAfterTax || 0;
      return acc;
    }, {})
  );

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <Layout>

      <div className="p-8 bg-gray-50 min-h-screen">
        {/* === Header + Filter === */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          {/* <h2 className="text-3xl font-bold">Dashboard</h2> */}

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none"
          >
            {uniqueMonths.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* === KPI CARDS === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Total Sales</h3>
            <p className="text-3xl font-semibold text-indigo-600">
              ₹{stats.totalSales.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Total Tax Collected</h3>
            <p className="text-3xl font-semibold text-blue-600">
              ₹{stats.totalTax.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Average Invoice</h3>
            <p className="text-3xl font-semibold text-green-600">
              ₹{stats.avgInvoice.toFixed(2)}
            </p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Total Invoices</h3>
            <p className="text-3xl font-semibold text-purple-600">
              {stats.totalInvoices}
            </p>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row gap-6 h-[350px]">
          {/* Line Chart */}
          <div className="bg-white shadow rounded-xl p-6 w-full lg:w-[700px]">
            <h3 className="text-lg font-semibold mb-4">
              Monthly Sales & Tax Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#6366F1" strokeWidth={2} name="Sales" />
                <Line type="monotone" dataKey="tax" stroke="#10B981" strokeWidth={2} name="Tax" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow rounded-xl p-6 w-full lg:w-[450px]">
            <h3 className="text-lg font-semibold mb-4">Sales by Customer</h3>
            {customerSales.length ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={customerSales} dataKey="value" nameKey="name" outerRadius={120} label>
                    {customerSales.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">No data available</p>
            )}
          </div>
        </div>


        {/* === BAR CHART: Monthly Comparison === */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Monthly Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#6366F1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="tax" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>


      </div>
    </Layout>
  );
}

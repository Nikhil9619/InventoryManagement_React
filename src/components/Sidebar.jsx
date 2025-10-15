import { Home, FileText, Settings, UserCircle2, User } from "lucide-react";
import { Link } from "react-router-dom";
import React, { Profiler } from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-200 text-indigo-600">
        MyApp
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link
          to="/AnalyticsDashboard"
          className="flex items-center gap-3 p-2 text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Home size={18} />  Dashboard
        </Link>
        <Link
          to="/"
          className="flex items-center gap-3 p-2 text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600"
        >
          <FileText size={18} /> Invoices
        </Link>

        <Link
          to="/CustomerPage"
          className="flex items-center gap-3 p-2 text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600"
        >
          <User size={18} /> Customers
        </Link>



        <Link
          to="/settings"
          className="flex items-center gap-3 p-2 text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Settings size={18} /> Settings
        </Link>


        <Link
          to="/ProfilePage"
          className="flex items-center gap-3 p-2 text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600"
        >
          <UserCircle2 size={18} /> Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

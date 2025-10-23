
import React from "react";
import {
  Home,
  FileText,
  Settings,
  UserCircle2,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/AnalyticsDashboard", icon: Home },
    { name: "Invoices", path: "/Dashboard", icon: FileText },
    { name: "Customers", path: "/CustomerPage", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Profile", path: "/ProfilePage", icon: UserCircle2 },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-white shadow-lg fixed left-0 top-0 flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <span className="text-xl font-bold text-indigo-600">MyApp</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-indigo-50 text-gray-600"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        {navItems.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

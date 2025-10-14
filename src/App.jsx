import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import { Import } from "lucide-react";
Import

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Routes>
      {/* Default route redirects based on login status */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
      />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

     <Route
        path="/AnalyticsDashboard"
        element={
          <PrivateRoute>
            <AnalyticsDashboard />
          </PrivateRoute>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<h1 className="text-center mt-10 text-xl font-semibold">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;

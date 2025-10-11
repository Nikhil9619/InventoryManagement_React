import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginIllustration from "../assets/login-illustration.svg";
import React from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password123") {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen font-[Segoe_UI]">
      {/* Left section */}
      <div className="flex-1 bg-[#f4f9fd] flex justify-center items-center p-10">
        <img
          src={loginIllustration}
          alt="Login Illustration"
          className="max-w-full h-auto"
        />
      </div>

      {/* Right section */}
      <div className="flex-1 flex justify-center items-center p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-black m-0">Hello,</h2>
          <h3 className="text-2xl font-medium text-black mb-8">Welcome back</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center justify-between text-sm mb-5">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
                <span>Keep me logged in</span>
              </label>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Forgot Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don’t have an account yet?{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Sign-up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm p-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        {/* <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-1 text-sm"
        /> */}
        <div className="w-9 h-9 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full font-semibold">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;

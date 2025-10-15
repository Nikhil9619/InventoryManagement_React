// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import React from "react";

// const Layout = ({ children }) => {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content */}
//       <div className="flex-1 ml-64 min-h-screen bg-gray-50">
//         <Header />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main content */}
      <div
        className={`flex-1 min-h-screen bg-gray-50 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

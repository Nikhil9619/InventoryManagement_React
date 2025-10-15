// // import React from "react";

// // const Header = () => {
// //   return (
// //     <header className="w-full bg-white shadow-sm p-4 flex items-center justify-between">
// //       <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
// //       <div className="flex items-center gap-4">
// //         {/* <input
// //           type="text"
// //           placeholder="Search..."
// //           className="border rounded-lg px-3 py-1 text-sm"
// //         /> */}
// //         <div className="w-9 h-9 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full font-semibold">
// //           JD
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;



// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import { ChevronRight } from "lucide-react";

// const Header = () => {
//   const location = useLocation();

//   // Split path and filter out empty strings
//   const pathSegments = location.pathname.split("/").filter(Boolean);

//   // Map route segments to display names (optional cleanup)
//   const nameMap = {
//     AnalyticsDashboard: "Dashboard",
//     Dashboard: "Invoices",
//     CustomerPage: "Customers",
//     settings: "Settings",
//     ProfilePage: "Profile",
//   };

//   const breadcrumbs = pathSegments.map((segment, index) => {
//     const path = "/" + pathSegments.slice(0, index + 1).join("/");
//     const label = nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
//     const isLast = index === pathSegments.length - 1;

//     return (
//       <span key={path} className="flex items-center">
//         {!isLast ? (
//           <>
//             <Link
//               to={path}
//               className="text-indigo-600 hover:underline font-medium"
//             >
//               {label}
//             </Link>
//             <ChevronRight size={16} className="mx-2 text-gray-400" />
//           </>
//         ) : (
//           <span className="text-gray-600 font-semibold">{label}</span>
//         )}
//       </span>
//     );
//   });

//   return (
//     <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
//       <nav className="flex items-center text-sm">{breadcrumbs}</nav>
//     </header>
//   );
// };

// export default Header;




import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Header = () => {
  const location = useLocation();

  // Split current path and filter empty segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Optional: route names mapping
  const nameMap = {
    AnalyticsDashboard: "Dashboard",
    Dashboard: "Invoices",
    CustomerPage: "Customers",
    settings: "Settings",
    ProfilePage: "Profile",
  };

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label =
      nameMap[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === pathSegments.length - 1;

    return (
      <span key={path} className="flex items-center">
        {!isLast ? (
          <>
            <Link
              to={path}
              className="text-indigo-600 hover:underline font-semibold text-base"
            >
              {label}
            </Link>
            <ChevronRight size={18} className="mx-2 text-gray-400" />
          </>
        ) : (
          <span className="text-gray-700 font-bold text-base">{label}</span>
        )}
      </span>
    );
  });

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <nav className="flex items-center">{breadcrumbs}</nav>
    </header>
  );
};

export default Header;

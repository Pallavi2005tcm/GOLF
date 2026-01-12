// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { FaNewspaper } from "react-icons/fa";
// import { 
//   FiBarChart2, 
//   FiMap, 
//   FiHeart, 
//   FiChevronLeft, 
//   FiChevronRight,
//   FiUsers,
//   FiUser
// } from "react-icons/fi";

// export default function Sidebar() {
//   const location = useLocation();
//   const [role, setRole] = useState("user"); 
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // ✅ User role fetch function
//   async function fetchUserRole() {
//     try {
//       const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
//         withCredentials: true,
//       });
//       return res.data.role;
//     } catch (err) {
//       console.error("Error fetching user data:", err.response?.data || err.message);
//       return "user"; // default role
//     }
//   }

//   useEffect(() => {
//     const initialize = async () => {
//       const userRole = await fetchUserRole();
//       setRole(userRole);
//     };
//     initialize();
//   }, []);

//   const navItems = [
//     { path: "/analytics", label: "Analytics Dashboard", icon: <FiBarChart2 className="w-5 h-5" /> },
//     { path: "/Evacuation", label: "Evacuation Map", icon: <FiMap className="w-5 h-5" /> },
//     { path: "/services", label: "Services", icon: <FiHeart className="w-5 h-5" /> },
//     { path: "/user_request", label: "User Dashboard", icon: <FiUser className="w-5 h-5" /> },
//     { path: "/news", label: "Latest News", icon: <FaNewspaper className="w-5 h-5" /> },
//   ];

//  // 🎨 Theme colors
//   // const bgStart = "from-white";
//   // const bgEnd = "to-[rgb(209,230,190)]";
//   // const activeBg = "bg-[rgb(129,154,145)]";
//   // const inactiveText = "text-[rgb(167,193,168)]";
//   // const hoverBg = "hover:bg-[rgb(129,154,145)] hover:text-white";


// // const bgStart = "from-white";
// // // const bgEnd = "to-[rgb(195,200,220)]";     
// // const bgEnd = "to-[rgb(70,100,140)]";        // light background shade of rgb(27,60,83)
// // const activeBg = "bg-[rgb(87,130,153)]";        // medium-light teal
// // const inactiveText = "text-[rgb(137,170,190)]"; // soft muted teal-gray
// // const hoverBg = "hover:bg-gray-400 hover:text-black";


// const bgStart = "bg-[#01497c]";     // main background (Steel Blue)
// const bgEnd = "bg-[#012a4a]"
// const activeBg = "bg-gray-300";        // थोड़ा dark shade for active
// const inactiveText = "text-black";  // light steel blue-gray for inactive
// const hoverBg = "hover:bg-gray-300 hover:text-black hover:font-semibold"; // hover पर dark + white text



// // const bgStart = "from-white";
// // const bgEnd = "to-[rgb(200,210,225)]";         // header background (light)
// // const activeBg = "bg-[rgb(87,130,153)]";       // active/hover state
// // const inactiveText = "text-[rgb(137,170,190)]"; // muted text tone
// // const hoverBg = "hover:bg-gray-300 hover:text-[rgb(27,60,83)]";




//   return (
//     <>
//       {/* Mobile Overlay */}
//       {/* {!isCollapsed && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-20 z-20 "
//           onClick={() => setIsCollapsed(true)}
//         />
//       )} */}
      
//       <aside
// // bg-gradient-to-b ${bgStart} ${bgEnd}
//   className={`h-screen bg-gray-100 text-black flex-shrink-0
//   overflow-y-auto transition-all duration-300 shadow-lg
//   ${isCollapsed ? "w-16" : "w-64"}`}
// >
//   {/* Top Bar with Button */}
//   <div className="flex items-center justify-end p-2">
//     <button
//       onClick={() => setIsCollapsed(!isCollapsed)}
//       className="bg-[rgb(246,243,243)] hover:bg-[rgb(212,218,212)] text-black rounded-full w-6 h-6 
//       flex items-center justify-center shadow-md transition-all duration-300"
//     >
//       {isCollapsed ? <FiChevronRight size={12} /> : <FiChevronLeft size={14} />}
//     </button>
//   </div>


//         <div className="px-3  flex flex-col h-full">
//           {/* Main Navigation */}
//           <nav className="flex-1">
//             <div className="mb-8 ">
//               {!isCollapsed && <h3 className="px-4 text-lg font-bold uppercase tracking-wider text-black mb-3">SIDEBAR</h3>}
//               <ul className="space-y-2">
//                 {navItems.map((item) => {
//                   const isActive = location.pathname === item.path;
//                   return (
//                     <li key={item.path}>
//                       <Link to={item.path}>
//                         <div
//                           className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl mx-2 transition-all duration-200 group
//                             ${isActive ? activeBg + " text-white shadow-inner" : inactiveText + " " + hoverBg}`}
//                         >
//                           <div className={`${isActive ? "text-black" : "text-black group-hover:text-black"}`}>
//                             {item.icon}
//                           </div>
//                           {!isCollapsed && <span className="text-sm font-medium text-black">{item.label}</span>}
//                           {isCollapsed && (
//                             <div className="absolute left-full ml-1 mr-1 mt-5 px-2 pr-3 bg-[rgb(129,154,145)] text-black text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap">
//                               {item.label}
//                             </div>
//                           )}
//                         </div>
//                       </Link>
//                     </li>
//                   );
//                 })}

//                 {/* ✅ Volunteer Panel only for volunteer role */}
//                 {role === "volunteer" && (
//                   <li>
//                     <Link to="/volunteer">
//                       <div className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl mx-2 transition-all duration-200 group bg-[rgb(129,154,145)] text-white shadow-inner">
//                         <FiUsers className="w-5 h-5" />
//                         {!isCollapsed && <span className="text-sm font-medium">Volunteer Panel</span>}
//                       </div>
//                     </Link>
//                   </li>
//                 )}
//                  {role === "admin" && (
//                   <li>
//                     <Link to="/admin/volunteer-requests">
//                       <div className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl mx-2 transition-all duration-200 group bg-[rgb(129,154,145)] text-white shadow-inner">
//                         <FiUsers className="w-5 h-5" />
//                         {!isCollapsed && <span className="text-sm font-medium">Admin Panel</span>}
//                       </div>
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </nav>

          
//         </div>
//       </aside>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaNewspaper } from "react-icons/fa";
import {
  FiBarChart2,
  FiMap,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiUser,
} from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();
  const [role, setRole] = useState("user");
  const [isCollapsed, setIsCollapsed] = useState(false);

  async function fetchUserRole() {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
        withCredentials: true,
      });
      return res.data.role;
    } catch (err) {
      console.error(
        "Error fetching user data:",
        err.response?.data || err.message
      );
      return "user";
    }
  }

  useEffect(() => {
    const initialize = async () => {
      const userRole = await fetchUserRole();
      setRole(userRole);
    };
    initialize();
  }, []);

  const navItems = [
    {
      path: "/analytics",
      label: "Analytics Dashboard",
      icon: <FiBarChart2 className="w-5 h-5" />,
    },
    {
      path: "/Evacuation",
      label: "Evacuation Map",
      icon: <FiMap className="w-5 h-5" />,
    },
    {
      path: "/services",
      label: "Services",
      icon: <FiHeart className="w-5 h-5" />,
    },
    {
      path: "/user_request",
      label: "User Dashboard",
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      path: "/news",
      label: "Latest News",
      icon: <FaNewspaper className="w-5 h-5" />,
    },
  ];

  if (role === "volunteer") {
    navItems.push({
      path: "/volunteer",
      label: "Volunteer Panel",
      icon: <FiUsers className="w-5 h-5" />,
    });
  }

  if (role === "admin") {
    navItems.push({
      path: "/admin/volunteer-requests",
      label: "Admin Panel",
      icon: <FiUsers className="w-5 h-5" />,
    });
  }

  const activeBg = "bg-gray-300";
  const inactiveText = "text-black";
  const hoverBg =
    "hover:bg-gray-300 hover:text-black hover:font-semibold transition-all";

  return (
    <aside
      className={`h-full bg-gray-100 text-black flex-shrink-0
      overflow-y-auto transition-all duration-300 shadow-lg
      ${isCollapsed ? "w-22" : "w-64"}`}
    >
      {/* Collapse Button */}
      <div className="flex items-center justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-[rgb(246,243,243)] hover:bg-[rgb(212,218,212)] text-black rounded-full w-6 h-6 
          flex items-center justify-center shadow-md transition-all duration-300"
        >
          {isCollapsed ? <FiChevronRight size={12} /> : <FiChevronLeft size={14} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="px-3 flex flex-col h-full">
        <nav className="flex-1">
          <div className="mb-8">
          
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                  <Link to={item.path}>
                    <div
                      className={`group relative flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl mx-2
                        ${isActive ? activeBg + " text-black shadow-inner" : inactiveText + " " + hoverBg}`}
                    >
                      <div className="text-black">{item.icon}</div>
                      
                      {/* Show text only if not collapsed */}
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                
                      {/* Tooltip on hover when collapsed */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.label}
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
                
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
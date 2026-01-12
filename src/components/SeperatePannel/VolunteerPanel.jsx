// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:4000", { withCredentials: true });

// async function fetchUserRole() {
//   try {
//     const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
//       withCredentials: true,
//     });
// console.log(res.data)
// console.log(res.data.role);
//     if (!res.data || !res.data.role) return null;

//     return res.data.role; // सिर्फ role return कर रहे हैं
//   } catch (err) {
//     console.error("Error fetching user data:", err.response?.data || err.message);
//     return null;
//   }
// }

// function VolunteerPanel() {
//   const [requests, setRequests] = useState([]);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initialize = async () => {
//       const userRole = await fetchUserRole();
//       setRole(userRole);
//       setLoading(false);

//       if (userRole === "volunteer") {
//         try {
//           const res = await axios.get("http://localhost:4000/api/request/get_request", {
//             withCredentials: true,
//           });
//           if (res.data.requests) setRequests(res.data.requests);
//         } catch (err) {
//           console.error("Error fetching requests:", err.response?.data || err.message);
//         }

//         socket.on("new_request", (data) => {
//           setRequests((prev) => [data, ...prev]);
//         });
//       }
//     };

//     initialize();

//     return () => socket.off("new_request");
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (role !== "volunteer") return <p>Access denied: Volunteers only</p>;

//   return (
//     <div>
//       <h1>Volunteer Panel</h1>
//       {requests.map((req) => (
//         <div key={req._id}>
//           <h3>{req.category}</h3>
//           <p>{req.details}</p>
//           <p>
//             {req.userId?.name} | {req.userId?.phone} | {req.userId?.address}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default VolunteerPanel;





// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:4000", { withCredentials: true });

// async function fetchUserRole() {
//   try {
//     const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
//       withCredentials: true,
//     });
//     return res.data.role;
//   } catch (err) {
//     console.error("Error fetching user data:", err.response?.data || err.message);
//     return null;
//   }
// }

// function VolunteerPanel() {
//   const [requests, setRequests] = useState([]);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [activeStatus, setActiveStatus] = useState("all");

//   useEffect(() => {
//     const initialize = async () => {
//       const userRole = await fetchUserRole();
//       setRole(userRole);
//       setLoading(false);

//       if (userRole === "volunteer") {
//         try {
//           const res = await axios.get("http://localhost:4000/api/request/get_request", {
//             withCredentials: true,
//           });
//           if (res.data.requests) setRequests(res.data.requests);
//         } catch (err) {
//           console.error("Error fetching requests:", err.response?.data || err.message);
//         }

//         socket.on("new_request", (data) => {
//           setRequests((prev) => [data, ...prev]);
//         });
//       }
//     };

//     initialize();

//     return () => socket.off("new_request");
//   }, []);

//   // Filter requests based on selected category and status
//   const filteredRequests = requests.filter(request => {
//     const categoryMatch = activeCategory === "all" || request.category === activeCategory;
//     const statusMatch = activeStatus === "all" || request.status === activeStatus;
//     return categoryMatch && statusMatch;
//   });

//   // Count requests by category
//   const requestCounts = {
//     all: requests.length,
//     Food: requests.filter(req => req.category === "Food").length,
//     Medical: requests.filter(req => req.category === "Medical").length,
//     Shelter: requests.filter(req => req.category === "Shelter").length,
//   };

//   // Count requests by status
//   const statusCounts = {
//     all: requests.length,
//     Pending: requests.filter(req => req.status === "Pending").length,
//     Accepted: requests.filter(req => req.status === "Accepted").length,
//     Completed: requests.filter(req => req.status === "Completed").length,
//     Rejected: requests.filter(req => req.status === "Rejected").length,
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (role !== "volunteer") {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
//           <p className="text-gray-600">This area is for volunteers only.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Dashboard</h1>
//           <p className="text-gray-600">Manage and respond to assistance requests</p>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="text-sm font-medium text-gray-500">Total Requests</div>
//             <div className="text-2xl font-bold text-gray-900">{requests.length}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="text-sm font-medium text-gray-500">Pending</div>
//             <div className="text-2xl font-bold text-yellow-600">{statusCounts.Pending}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="text-sm font-medium text-gray-500">Accepted</div>
//             <div className="text-2xl font-bold text-blue-600">{statusCounts.Accepted}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="text-sm font-medium text-gray-500">Completed</div>
//             <div className="text-2xl font-bold text-green-600">{statusCounts.Completed}</div>
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter by Category</h2>
//           <div className="flex flex-wrap gap-2">
//             {["all", "Food", "Medical", "Shelter"].map(category => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   activeCategory === category
//                     ? category === "all"
//                       ? "bg-gray-800 text-white"
//                       : category === "Food"
//                       ? "bg-green-100 text-green-800"
//                       : category === "Medical"
//                       ? "bg-red-100 text-red-800"
//                       : "bg-blue-100 text-blue-800"
//                     : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {category} ({requestCounts[category]})
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Status Filter */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter by Status</h2>
//           <div className="flex flex-wrap gap-2">
//             {["all", "Pending", "Accepted", "Completed", "Rejected"].map(status => (
//               <button
//                 key={status}
//                 onClick={() => setActiveStatus(status)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   activeStatus === status
//                     ? status === "all"
//                       ? "bg-gray-800 text-white"
//                       : status === "Pending"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : status === "Accepted"
//                       ? "bg-blue-100 text-blue-800"
//                       : status === "Completed"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800"
//                     : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {status} ({statusCounts[status]})
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Requests Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredRequests.length > 0 ? (
//             filteredRequests.map((request) => (
//               <div
//                 key={request._id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className={`p-4 ${
//                   request.category === "Food" ? "bg-green-50" : 
//                   request.category === "Medical" ? "bg-red-50" : "bg-blue-50"
//                 }`}>
//                   <div className="flex justify-between items-start">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                       request.category === "Food" ? "bg-green-100 text-green-800" : 
//                       request.category === "Medical" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
//                     }`}>
//                       {request.category}
//                     </span>
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                       request.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
//                       request.status === "Accepted" ? "bg-blue-100 text-blue-800" : 
//                       request.status === "Completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                     }`}>
//                       {request.status}
//                     </span>
//                   </div>
//                   <h3 className="mt-3 text-lg font-semibold text-gray-900">
//                     {request.details || "No details provided"}
//                   </h3>
//                 </div>

//                 <div className="p-4">
//                   <div className="flex items-center mb-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
//                         {request.userId?.name?.charAt(0) || "U"}
//                       </div>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm font-medium text-gray-900">{request.userId?.name || "Unknown User"}</p>
//                       <p className="text-xs text-gray-500">{request.userId?.email || "No email"}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     {request.userId?.phone && (
//                       <div className="flex items-center text-sm text-gray-600">
//                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
//                         </svg>
//                         {request.userId.phone}
//                       </div>
//                     )}

//                     {request.userId?.address && (
//                       <div className="flex items-start text-sm text-gray-600">
//                         <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                         </svg>
//                         <span>{request.userId.address}</span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mt-4 flex space-x-2">
//                     <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium py-2 px-4 rounded-lg transition-colors">
//                       Accept
//                     </button>
//                     <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 px-4 rounded-lg transition-colors">
//                       Details
//                     </button>
//                   </div>
//                 </div>

//                 <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
//                   Created {new Date(request.createdAt).toLocaleDateString()}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-gray-900">No requests found</h3>
//               <p className="mt-1 text-gray-500">Try changing your filters or check back later.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VolunteerPanel;





import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaHome } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";

import { FaBed } from "react-icons/fa";
import axios from "axios";

const socket = io("http://localhost:4000", { withCredentials: true });

async function fetchUserData() {
  try {
    const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data; // ✅ full user object (id + role)
  } catch (err) {
    console.error("Error fetching user data:", err.response?.data || err.message);
    return null;
  }
}

function VolunteerPanel() {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");

  const navigate = useNavigate();

  const handleSOSRedirect = () => {
    navigate("/sos-panel");
  };

  useEffect(() => {
    const initialize = async () => {
      const userData = await fetchUserData();
      setUser(userData);
      setLoading(false);

      if (userData?.role === "volunteer") {
        try {
          const res = await axios.get("http://localhost:4000/api/request/get_request", {
            withCredentials: true,
          });
          if (res.data.requests) setRequests(res.data.requests);
        } catch (err) {
          console.error("Error fetching requests:", err.response?.data || err.message);
        }

        // ✅ Socket listeners
        socket.on("new_request", (data) => {
          setRequests((prev) => [data, ...prev]);
        });

        socket.on("request_updated", (data) => {
          setRequests((prev) =>
            prev.map((req) => (req._id === data._id ? data : req))
          );
        });
      }
    };

    initialize();
    return () => {
      socket.off("new_request");
      socket.off("request_updated");
    };
  }, []);

  // ✅ Accept handler
  const handleAccept = async (requestId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/request/accept/${requestId}`,
        {},
        { withCredentials: true }
      );
      const updatedRequest = res.data;
      setRequests((prev) =>
        prev.map((req) => (req._id === requestId ? updatedRequest : req))
      );
    } catch (err) {
      console.error("Error accepting request:", err.response?.data || err.message);
      alert("Failed to accept request");
    }
  };

  // ✅ Mark complete handler
  const handleComplete = async (requestId) => {
    try {
      console.log("Called")
      const res = await axios.put(
        `http://localhost:4000/api/request/complete/${requestId}`,
        {},
        { withCredentials: true }
      );
      const updatedRequest = res.data;
      setRequests((prev) =>
        prev.map((req) => (req._id === requestId ? updatedRequest : req))
      );
    } catch (err) {
      console.error("Error completing request:", err.response?.data || err.message);
      alert("Failed to complete request");
    }
  };

  // Filters
  const filteredRequests = requests.filter((request) => {
    const categoryMatch =
      activeCategory === "all" || request.category === activeCategory;
    const statusMatch =
      activeStatus === "all" || request.status === activeStatus;
    return categoryMatch && statusMatch;
  });



  // Counts
  const requestCounts = {
    all: requests.length,
    Food: requests.filter((req) => req.category === "Food").length,
    Medical: requests.filter((req) => req.category === "Medical").length,
    Shelter: requests.filter((req) => req.category === "Shelter").length,
  };
  const statusCounts = {
    all: requests.length,
    Pending: requests.filter((req) => req.status === "Pending").length,
    Accepted: requests.filter((req) => req.status === "Accepted").length,
    Completed: requests.filter((req) => req.status === "Completed").length,
    Rejected: requests.filter((req) => req.status === "Rejected").length,
  };

  // Helper function to get status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Accepted":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get category icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FaUtensils />;
      case "Medical":
        return <FaHeartbeat />;
      case "Shelter":
        return <FaHome />;
      default:
        return "📋";
    }
  };

  // Helper function to format address
  const formatAddress = (request) => {
    if (request.address) return request.address;

    // Fallback to user address if available
    if (request.userId?.address) return request.userId.address;

    return "Address not provided";
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );

  if (user?.role !== "volunteer") return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Access Denied</h2>
          <p className="text-gray-600 mt-2">This area is for volunteers only.</p>
        </div>
      </div>
    </div>
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between ">
            <div className="mb-20">
              <h1 className="text-3xl font-bold text-gray-900 ">Volunteer Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'Volunteer'}!</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <button
                onClick={handleSOSRedirect}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
              >
                🚨 SOS Requests
              </button>
              
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                {requests.length} total requests
              </div>
              <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                {statusCounts.Completed} completed
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Requests</h2>

          <div className="mb-5">
            <h3 className="text-sm font-medium text-gray-700 mb-3">By Category</h3>
            <div className="flex flex-wrap gap-2">
              {["all", "Food", "Medical", "Shelter"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm transition-colors ${activeCategory === category
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category !== "all" && (
                    <span className="mr-2">{getCategoryIcon(category)}</span>
                  )}
                  <span>{category === "all" ? "All Categories" : category}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeCategory === category ? "bg-white/20" : "bg-gray-200"
                    }`}>
                    {requestCounts[category]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">By Status</h3>
            <div className="flex flex-wrap gap-2">
              {["all", "Pending", "Accepted", "Completed", "Rejected"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setActiveStatus(status)}
                    className={`px-4 py-2 rounded-xl text-sm transition-colors ${activeStatus === status
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {status === "all" ? "All Statuses" : status}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeStatus === status ? "bg-white/20" : "bg-gray-200"
                      }`}>
                      {statusCounts[status]}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredRequests.length} Request{filteredRequests.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredRequests.length} of {requests.length} requests
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">No requests found</h3>
              <p className="text-gray-500 mt-2">Try changing your filters to see more requests.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRequests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getCategoryIcon(req.category)}</span>
                        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                          {req.category}
                        </span>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </div>

                    <p className="text-gray-800 mb-4 line-clamp-3">
                      {req.details || "No details provided"}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-medium">{req.userId?.name || 'Unknown User'}</span>
                      </div>
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{req.userId?.phone || 'No phone provided'}</span>
                      </div>
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="break-words">{formatAddress(req)}</span>
                      </div>
                    </div>

                    {/* ✅ Conditional Buttons */}
                    <div className="mt-4">
                      {req.status === "Pending" && (
                        <button
                          onClick={() => handleAccept(req._id)}
                          className="w-full bg-blue-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Accept Request
                        </button>
                      )}

                      {req.status === "Accepted" &&
                        req.volunteerId === user._id && (
                          <button
                            onClick={() => handleComplete(req._id)}
                            className="w-full bg-green-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Mark Complete
                          </button>
                        )}

                      {req.status === "Accepted" &&
                        req.volunteerId !== user._id && (
                          <div className="w-full bg-yellow-50 text-yellow-700 py-2.5 rounded-xl text-sm font-medium text-center flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Already Accepted
                          </div>
                        )}

                      {req.status === "Completed" && (
                        <div className="w-full bg-green-50 text-green-700 py-2.5 rounded-xl text-sm font-medium text-center flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VolunteerPanel;



// import React from "react";

// const AlertBanner = ({ visible, onViewPlan }) => {
//   if (!visible) return null;

//   return (
//     <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
//       {/* Left Content */}
//       <div className="flex items-center">
//         <div className="text-3xl mr-4 text-white">
//           <i className="fas fa-exclamation-triangle"></i>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white">
//             Flood Warning: High Risk Area
//           </h3>
//           <p className="text-sm text-gray-100 opacity-90">
//             Immediate evacuation recommended. View evacuation routes and shelters.
//           </p>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={onViewPlan}
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;









// css ka code


// import React from 'react';

// const AlertBanner = ({ visible, onViewPlan }) => {
//   if (!visible) return null;

//   return (
//     <div className="alert-banner">
//       <div className="alert-content">
//         <div className="alert-icon"><i className="fas fa-exclamation-triangle"></i></div>
//         <div>
//           <h3>Flood Warning: High Risk Area</h3>
//           <p>Immediate evacuation recommended. View evacuation routes and shelters.</p>
//         </div>
//       </div>
//       <button className="alert-button" onClick={onViewPlan}>
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;











//buzzle ka code

// import React, { useEffect } from "react";

// const AlertBanner = ({ visible, onViewPlan }) => {
//   useEffect(() => {
//     if (visible) {
//       const siren = new Audio("/siren.mp3"); // public folder me rakho
//       siren.loop = true;
//       siren.play().catch((err) => console.log("Audio play error:", err));

//       return () => siren.pause();
//     }
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
//       {/* Left Content */}
//       <div className="flex items-center">
//         <div className="text-3xl mr-4 text-white">
//           <i className="fas fa-exclamation-triangle"></i>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white">
//             Flood Warning: High Risk Area
//           </h3>
//           <p className="text-sm text-gray-100 opacity-90">
//             Immediate evacuation recommended. View evacuation routes and shelters.
//           </p>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={onViewPlan}
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;






// siren code bina restriction


// import React, { useEffect, useState } from "react";

// const AlertBanner = ({ visible, onViewPlan, soundEnabled, audioRef }) => {
//     const { sendSOS, loading } = useSendSOS(); 
//   useEffect(() => {
//     if (soundEnabled && audioRef?.current) {
//       if (visible) {
//         audioRef.current.play().catch((err) => {
//           console.warn("Sound play failed:", err);
//         });
//       } else {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//       }
//     }
//   }, [visible, soundEnabled, audioRef]);

//   if (!visible) return null;

//   return (
//     <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
//       <div className="flex items-center">
//         <div className="text-3xl mr-4 text-white">
//           <i className="fas fa-exclamation-triangle"></i>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white">
//             Flood Warning: High Risk Area
//           </h3>
//           <p className="text-sm text-gray-100 opacity-90">
//             Immediate evacuation recommended. View evacuation routes and shelters.
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={sendSOS}
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         🚨 Send SOS
//       </button>

//       <button
//         onClick={onViewPlan}
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;



// function useSendSOS() {
//   const [loading, setLoading] = useState(false);

//   const sendSOS = async () => {
//     setLoading(true);

//     if (!navigator.geolocation) {
//       alert("Geolocation not supported by your browser");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude } = position.coords;

//       try {
//         const res = await fetch("http://localhost:4000/api/sos", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: "66fa7c12345abcd67890efg", // Replace with actual DB user
//             location: `Lat: ${latitude}, Lng: ${longitude}`,
//           }),
//         });

//         const data = await res.json();
//         if (data.success) {
//           alert("🚨 SOS Sent Successfully!");
//         } else {
//           alert("❌ Failed to send SOS");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         alert("⚠️ Server not responding");
//       } finally {
//         setLoading(false);
//       }
//     });
//   };

//   return { sendSOS, loading };
// }






// import React, { useEffect, useState } from "react";

// // ✅ Updated: SOS logic hook merged inside AlertBanner file
// function useSendSOS() {
//   const [loading, setLoading] = useState(false);

//   const sendSOS = async () => {
//     setLoading(true);

//     if (!navigator.geolocation) {
//       alert("Geolocation not supported by your browser");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude } = position.coords;

//       try {
//         const res = await fetch("http://localhost:4000/api/sos", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: "66fa7c12345abcd67890efg", // Replace with actual DB user
//             location: `Lat: ${latitude}, Lng: ${longitude}`,
//           }),
//         });

//         const data = await res.json();
//         if (data.success) {
//           alert("🚨 SOS Sent Successfully!");
//         } else {
//           alert("❌ Failed to send SOS");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         alert("⚠️ Server not responding");
//       } finally {
//         setLoading(false);
//       }
//     });
//   };

//   return { sendSOS, loading };
// }

// // ✅ Updated: AlertBanner with SOS feature integrated
// const AlertBanner = ({ visible, onViewPlan, soundEnabled, audioRef }) => {
//   const { sendSOS, loading } = useSendSOS(); // ✅ Use SOS hook

//   useEffect(() => {
//     if (soundEnabled && audioRef?.current) {
//       if (visible) {
//         audioRef.current.play().catch((err) => {
//           console.warn("Sound play failed:", err);
//         });
//       } else {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//       }
//     }
//   }, [visible, soundEnabled, audioRef]);

//   if (!visible) return null;

//   return (
//     <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
//       <div className="flex items-center">
//         <div className="text-3xl mr-4 text-white">
//           <i className="fas fa-exclamation-triangle"></i>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white">
//             Flood Warning: High Risk Area
//           </h3>
//           <p className="text-sm text-gray-100 opacity-90">
//             Immediate evacuation recommended. View evacuation routes and shelters.
//           </p>
//         </div>
//       </div>

//       {/* ✅ Updated: SOS button integrated */}
//       <button
//         onClick={sendSOS}
//         disabled={loading} // disable while sending
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         {loading ? "Sending..." : "🚨 Send SOS"}
//       </button>

//       <button
//         onClick={onViewPlan}
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;


import React, { useEffect, useState } from "react";
import socket from "../utils/socket";
import { useSendSOS } from "../hooks/useSendSOS";
import { Link } from "react-router-dom";

const AlertBanner = ({ visible, onViewPlan, soundEnabled, audioRef }) => {
  const { sendSOS, loading } = useSendSOS();
  const [latestSOS, setLatestSOS] = useState(null);

  // 🔔 Listen for real-time SOS notifications
  useEffect(() => {
    socket.on("newSOS", (sos) => {
      console.log("Received new SOS:", sos);
      setLatestSOS(sos);
    });

    return () => {
      socket.off("newSOS");
    };
  }, []);

  // 🎵 Handle sound play/pause
  useEffect(() => {
    if (soundEnabled && audioRef?.current) {
      if (visible) {
        audioRef.current.play().catch((err) =>
          console.warn("Sound play failed:", err)
        );
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [visible, soundEnabled, audioRef]);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
      <div className="flex items-center">
        <div className="text-3xl mr-4 text-white">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Flood Warning: High Risk Area
          </h3>
          <p className="text-sm text-gray-100 opacity-90">
            Immediate evacuation recommended. View evacuation routes and
            shelters.
          </p>


        
        </div>
      </div>

      <div className="flex gap-3">
        {/* SOS Button */}
        <button
          onClick={sendSOS}
          disabled={loading}
          className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
        >
          {loading ? "Sending..." : "🚨 Send SOS"}
        </button>

        {/* Evacuation Link Button */}
        <Link to="/Evacuation">
          <button
            onClick={onViewPlan}
            className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
          >
            View Evacuation Plan
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AlertBanner;






//  siren 2 min tak bajega

// import React, { useEffect } from "react";

// const AlertBanner = ({ visible, onViewPlan, soundEnabled, audioRef }) => {
//   useEffect(() => {
//     if (!audioRef?.current || !soundEnabled) return;

//     if (visible) {
//       audioRef.current
//         .play()
//         .catch((err) => console.warn("Autoplay blocked:", err));
//     } else {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   }, [visible, soundEnabled, audioRef]);

//   if (!visible) return null;

//   return (
//     <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-400 px-6 py-4 rounded-xl mb-6 shadow-lg border border-white/10 animate-pulse">
//       {/* Left Content */}
//       <div className="flex items-center">
//         <div className="text-3xl mr-4 text-white">
//           <i className="fas fa-exclamation-triangle"></i>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white">
//             Flood Warning: High Risk Area
//           </h3>
//           <p className="text-sm text-gray-100 opacity-90">
//             Immediate evacuation recommended. View evacuation routes and shelters.
//           </p>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={onViewPlan}
//         className="bg-white text-red-600 font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
//       >
//         View Evacuation Plan
//       </button>
//     </div>
//   );
// };

// export default AlertBanner;

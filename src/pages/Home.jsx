

// import React, { useState, useEffect, useRef } from 'react';
// import Header from '../components/Header';
// import AlertBanner from '../components/Alerts';
// import WaterLevelCard from '../components/WaterLevel';
// import RainfallCard from '../components/RainfallCard';
// import FloodMapCard from '../components/MapBox';
// import StatisticsCard from '../components/StatisticsCard';
// import ConnectionStatus from '../components/ConnectionStatus';
// import Footer from '../components/Footer';
// import EvacuationModal from '../components/EvacuationModel';
// import './Home.css'

// function Home() {
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('connected');
//   const [data, setData] = useState({
//     waterLevel: 3.2,
//     rainfall: 42,
//     affectedAreas: 5,
//     status: 'low',
//     waterLevelData: Array(24).fill(0).map(() => Math.random() * 4 + 1),
//     rainfallData: Array(24).fill(0).map(() => Math.random() * 60)
//   });

//   // Use refs to store the latest data to avoid dependency issues in useEffect
//   const dataRef = useRef(data);
//   const alertVisibleRef = useRef(alertVisible);

//   // Update refs when state changes
//   useEffect(() => {
//     dataRef.current = data;
//     alertVisibleRef.current = alertVisible;
//   }, [data, alertVisible]);

//   const showEvacuationMap = () => setModalVisible(true);
//   const closeEvacuationMap = () => setModalVisible(false);

//   // Simulate WebSocket data updates every 5-6 seconds
//   useEffect(() => {
//     let intervalId;

//     const simulateWebSocket = () => {
//       const updateData = () => {
//         const currentData = dataRef.current;
//         const currentAlertVisible = alertVisibleRef.current;
        
//         // Generate more realistic water level data (tends to change gradually)
//         const waterLevelChange = (Math.random() - 0.5) * 0.8; // -0.4 to +0.4
//         const newWaterLevel = Math.max(0.5, Math.min(6, parseFloat(currentData.waterLevel) + waterLevelChange)).toFixed(1);
        
//         // Generate more realistic rainfall data
//         const rainfallChange = (Math.random() - 0.3) * 20; // -6 to +14
//         const newRainfall = Math.max(0, Math.min(100, parseInt(currentData.rainfall) + rainfallChange));
        
//         // Affected areas change more slowly
//         const areaChange = Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
//         const newAffectedAreas = Math.max(1, Math.min(15, currentData.affectedAreas + areaChange));
        
//         // Update data arrays (shift out oldest, add newest)
//         const newWaterLevelData = [...currentData.waterLevelData.slice(1), parseFloat(newWaterLevel)];
//         const newRainfallData = [...currentData.rainfallData.slice(1), newRainfall];
        
//         // Determine status based on water level
//         let newStatus = 'low';
//         if (newWaterLevel > 4.5) newStatus = 'high';
//         else if (newWaterLevel > 3.2) newStatus = 'medium';
        
//         setData({
//           waterLevel: newWaterLevel,
//           rainfall: newRainfall,
//           affectedAreas: newAffectedAreas,
//           status: newStatus,
//           waterLevelData: newWaterLevelData,
//           rainfallData: newRainfallData
//         });

//         // Show alert if water level becomes high and alert isn't already visible
//         if (newWaterLevel > 4.5 && !currentAlertVisible) {
//           setAlertVisible(true);
//         }
        
//         // Hide alert if water level drops to medium or low and alert is visible
//         if (newWaterLevel <= 4.5 && currentAlertVisible) {
//           setAlertVisible(false);
//         }
//       };

//       // Initial call
//       updateData();
      
//       // Set interval with random time between 5-6 seconds (5000-6000ms)
//       const intervalTime = 5000 + Math.random() * 1000;
//       intervalId = setInterval(updateData, intervalTime);
//     };

//     simulateWebSocket();
    
//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, []); // Empty dependency array since we're using refs

//   // Simulate connection issues
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (Math.random() < 0.1) {
//         setConnectionStatus('disconnected');
//         setTimeout(() => setConnectionStatus('connected'), 3000);
//       }
//     }, 10000);
    
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="App">
//       <div className="container">
        
        
//         <AlertBanner 
//           visible={alertVisible} 
//           onViewPlan={showEvacuationMap} 
//         />
        
//         <div className="dashboard">
//           <WaterLevelCard data={data} />
//           <RainfallCard data={data} />
//           <FloodMapCard data={data} />
//           <StatisticsCard data={data} />
//         </div>
        
//         <ConnectionStatus status={connectionStatus} />
//         <Footer />
//       </div>
      
//       <EvacuationModal 
//         visible={modalVisible} 
//         onClose={closeEvacuationMap} 
//       />
//     </div>
//   );
// }

// export default Home;




// siren 2 min tak bajne wala code

// import React, { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import AlertBanner from "../components/Alerts";
// import WaterLevelCard from "../components/WaterLevel";
// import RainfallCard from "../components/RainfallCard";
// import FloodMapCard from "../components/MapBox";
// import StatisticsCard from "../components/StatisticsCard";
// import ConnectionStatus from "../components/ConnectionStatus";
// import Footer from "../components/Footer";
// import EvacuationModal from "../components/EvacuationModel";

// function Home() {
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("connected");

//   // 🔊 sound unlock
//   const [soundEnabled, setSoundEnabled] = useState(false);
//   const audioRef = useRef(null);

//   // ⚡ Pause state
//   const [isPaused, setIsPaused] = useState(false);

//   // ⚡ Track alert state
//   const [minDurationActive, setMinDurationActive] = useState(false);
//   const alertTimerRef = useRef(null);

//   useEffect(() => {
//     if (!audioRef.current) {
//       audioRef.current = new Audio("/siren.mp3");
//       audioRef.current.loop = true;
//       audioRef.current.preload = "auto";
//     }
//   }, []);

//   const enableSound = () => {
//     audioRef.current
//       .play()
//       .then(() => {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//         setSoundEnabled(true);
//         console.log("🔊 Sound permission granted");
//       })
//       .catch((err) => console.warn("Sound unlock failed:", err));
//   };

//   const [data, setData] = useState({
//     waterLevel: 3.2,
//     rainfall: 42,
//     affectedAreas: 5,
//     status: "low",
//     waterLevelData: Array(24)
//       .fill(0)
//       .map(() => Math.random() * 4 + 1),
//     rainfallData: Array(24)
//       .fill(0)
//       .map(() => Math.random() * 60),
//   });

//   const dataRef = useRef(data);

//   useEffect(() => {
//     dataRef.current = data;
//   }, [data]);

//   const showEvacuationMap = () => setModalVisible(true);
//   const closeEvacuationMap = () => setModalVisible(false);

//   useEffect(() => {
//     let intervalId;
//     const simulateWebSocket = () => {
//       const updateData = () => {
//         if (isPaused) return; // ⚡ Skip update if paused

//         const currentData = dataRef.current;

//         const waterLevelChange = (Math.random() - 0.5) * 0.8;
//         const newWaterLevel = Math.max(
//           0.5,
//           Math.min(6, parseFloat(currentData.waterLevel) + waterLevelChange)
//         ).toFixed(1);

//         const rainfallChange = (Math.random() - 0.3) * 20;
//         const newRainfall = Math.max(
//           0,
//           Math.min(100, parseInt(currentData.rainfall) + rainfallChange)
//         );

//         const areaChange =
//           Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
//         const newAffectedAreas = Math.max(
//           1,
//           Math.min(15, currentData.affectedAreas + areaChange)
//         );

//         const newWaterLevelData = [
//           ...currentData.waterLevelData.slice(1),
//           parseFloat(newWaterLevel),
//         ];
//         const newRainfallData = [
//           ...currentData.rainfallData.slice(1),
//           newRainfall,
//         ];

//         let newStatus = "low";
//         if (newWaterLevel > 4.5) newStatus = "high";
//         else if (newWaterLevel > 3.2) newStatus = "medium";

//         setData({
//           waterLevel: newWaterLevel,
//           rainfall: newRainfall,
//           affectedAreas: newAffectedAreas,
//           status: newStatus,
//           waterLevelData: newWaterLevelData,
//           rainfallData: newRainfallData,
//         });

//         // ⚡ Trigger Alert with min 2 min duration
//         if (newWaterLevel > 4.5 && !alertVisible) {
//           setAlertVisible(true);
//           setIsPaused(true);
//           setMinDurationActive(true);

//           if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
//           alertTimerRef.current = setTimeout(() => {
//             setMinDurationActive(false);
//           }, 2 * 60 * 1000); // minimum 2 minutes
//         }

//         // ⚡ After min duration, check if risk ended
//         if (alertVisible && !minDurationActive && newWaterLevel <= 4.5) {
//           setAlertVisible(false);
//           setIsPaused(false);
//         }
//       };

//       updateData();
//       const intervalTime = 5000 + Math.random() * 1000;
//       intervalId = setInterval(updateData, intervalTime);
//     };

//     simulateWebSocket();

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//       if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
//     };
//   }, [isPaused, alertVisible, minDurationActive]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (Math.random() < 0.1) {
//         setConnectionStatus("disconnected");
//         setTimeout(() => setConnectionStatus("connected"), 3000);
//       }
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f0f3f3] text-white font-sans p-5">
//       {/* 🔊 Permission Overlay */}
//       {!soundEnabled && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center">
//             <h2 className="text-lg font-bold mb-4 text-black">
//               Enable Sound Alerts
//             </h2>
//             <p className="mb-4 text-black">
//               Click below to allow siren sound for flood alerts.
//             </p>
//             <button
//               onClick={enableSound}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//             >
//               Enable Sound
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="max-w-[2400px] mx-auto">
//         {/* ✅ Alert Banner */}
//         <AlertBanner
//           visible={alertVisible}
//           onViewPlan={showEvacuationMap}
//           soundEnabled={soundEnabled}
//           audioRef={audioRef}
//         />

//         {/* ✅ Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
//           <WaterLevelCard data={data} />
//           <RainfallCard data={data} />
//           <FloodMapCard data={data} />
//           <StatisticsCard data={data} />
//         </div>

//         {/* ✅ Connection + Footer */}
//         <ConnectionStatus status={connectionStatus} />
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Home;











// siren code bina restriction 


import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import AlertBanner from "../components/Alerts";
import WaterLevelCard from "../components/WaterLevel";
import RainfallCard from "../components/RainfallCard";
import FloodMapCard from "../components/MapBox";
import StatisticsCard from "../components/StatisticsCard";
import ConnectionStatus from "../components/ConnectionStatus";
import Footer from "../components/Footer";
import EvacuationModal from "../components/EvacuationModel";

function Home() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connected");



  // 🔊 sound unlock
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/siren.mp3");
      audioRef.current.loop = true;
      audioRef.current.preload = "auto";
    }
  }, []);

  const enableSound = () => {
    audioRef.current
      .play()
      .then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setSoundEnabled(true);
        console.log("🔊 Sound permission granted");
      })
      .catch((err) => console.warn("Sound unlock failed:", err));
  };


  const [metrics, setMetrics] = useState({
  lake_area: 2,
  water_level: 50,
  rainfall: 10,
  snow_melt: 0.5,
  timestamp: new Date().toISOString()
});

  const [data, setData] = useState({
    waterLevel: 3.2,
    rainfall: 42,
    affectedAreas: 5,
    status: "low",
    waterLevelData: Array(24)
      .fill(0)
      .map(() => Math.random() * 4 + 1),
    rainfallData: Array(24)
      .fill(0)
      .map(() => Math.random() * 60),
  });

  const dataRef = useRef(data);
  const alertVisibleRef = useRef(alertVisible);

  useEffect(() => {
    dataRef.current = data;
    alertVisibleRef.current = alertVisible;
  }, [data, alertVisible]);

  const showEvacuationMap = () => setModalVisible(true);
  const closeEvacuationMap = () => setModalVisible(false);

  useEffect(() => {
    let intervalId;
    const simulateWebSocket = () => {
      const updateData = () => {
        const currentData = dataRef.current;
        const currentAlertVisible = alertVisibleRef.current;
  
        const waterLevelChange = (Math.random() - 0.5) * 0.8;
        const newWaterLevel = Math.max(
          0.5,
          Math.min(6, parseFloat(currentData.waterLevel) + waterLevelChange)
        ).toFixed(1);
  
        const rainfallChange = (Math.random() - 0.3) * 20;
        const newRainfall = Math.max(
          0,
          Math.min(100, parseInt(currentData.rainfall) + rainfallChange)
        );
  
        const areaChange =
          Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
        const newAffectedAreas = Math.max(
          1,
          Math.min(15, currentData.affectedAreas + areaChange)
        );
  
        const newWaterLevelData = [
          ...currentData.waterLevelData.slice(1),
          parseFloat(newWaterLevel),
        ];
        const newRainfallData = [
          ...currentData.rainfallData.slice(1),
          newRainfall,
        ];
  
        // Calculate risk score based on both water level and rainfall
        const waterLevelRisk = (parseFloat(newWaterLevel) / 6) * 100; // Max water level is 6
        const rainfallRisk = (newRainfall / 100) * 100; // Max rainfall is 100
        
        // Weighted risk calculation (water level has higher weight)
        const riskScore = (waterLevelRisk * 4) + (rainfallRisk * 0.4);
        console.log(riskScore)
        // Determine status based on risk score
        let newStatus = "low";
        if (riskScore > 72) {newStatus = "high";clearInterval(intervalId);
          setTimeout(() => {
            intervalId = setInterval(updateData, 4000); // resume after 2 min
          }, 20000); }
        else if (riskScore > 40) newStatus = "medium";
  
        setData({
          waterLevel: newWaterLevel,
          rainfall: newRainfall,
          affectedAreas: newAffectedAreas,
          status: newStatus,
          waterLevelData: newWaterLevelData,
          rainfallData: newRainfallData,
        });
  
        // Alert based on risk score, not just water level
        if (riskScore > 70 && !currentAlertVisible) {
          setAlertVisible(true);
        }
        if (riskScore <= 70 && currentAlertVisible) {
          setAlertVisible(false);
        }
      };
  
      updateData();
      const intervalTime = 5000 + Math.random() * 1000;
      intervalId = setInterval(updateData, intervalTime);
    };
  
    simulateWebSocket();
  
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setConnectionStatus("disconnected");
        setTimeout(() => setConnectionStatus("connected"), 3000);
      }
    }, 10000);
  
    return () => clearInterval(interval);
  }, []);

  return (

    <div className="min-h-screen bg-[#f0f3f3] text-white font-sans p-5">
      {/* 🔊 Permission Overlay */}
      {!soundEnabled && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4 text-black">Enable Sound Alerts</h2>
            <p className="mb-4 text-black">Click below to allow siren sound for flood alerts.</p>
            <button
              onClick={enableSound}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Enable Sound
            </button>
          </div>
        </div>
      )}


    <div className="min-h-screen  bg-[#f0f3f3] text-white font-sans p-5">
{data.status !== "high" && (
  <div className={`rounded-lg p-4 mb-4 text-center font-semibold text-lg
    ${data.status === "low" ? "bg-green-100 border border-black text-green-800 shadow-sm" : 
      "bg-yellow-100 border border-yellow-400 text-yellow-800 shadow-sm"}`}>
    Current Risk Status: {data.status.toUpperCase()}
  </div>
)}





      <div className="max-w-[2400px] mx-auto">
        {/* ✅ Alert Banner */}
        <AlertBanner
          visible={alertVisible}
          onViewPlan={showEvacuationMap}
          soundEnabled={soundEnabled}
          audioRef={audioRef}
        />

        {/* ✅ Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
          <WaterLevelCard data={data} />
          <RainfallCard data={data} />
          <FloodMapCard data={data} />
          <StatisticsCard data={data} />
        </div>

        {/* ✅ Connection + Footer */}
        <ConnectionStatus status={connectionStatus} />
        <Footer />
      </div>
    </div> </div>
     );

}
export default Home;












// main home ka code

// import React, { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import AlertBanner from "../components/Alerts";
// import WaterLevelCard from "../components/WaterLevel";
// import RainfallCard from "../components/RainfallCard";
// import FloodMapCard from "../components/MapBox";
// import StatisticsCard from "../components/StatisticsCard";
// import ConnectionStatus from "../components/ConnectionStatus";
// import Footer from "../components/Footer";
// import EvacuationModal from "../components/EvacuationModel";

// function Home() {
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("connected");
//   const [data, setData] = useState({
//     waterLevel: 3.2,
//     rainfall: 42,
//     affectedAreas: 5,
//     status: "low",
//     waterLevelData: Array(24)
//       .fill(0)
//       .map(() => Math.random() * 4 + 1),
//     rainfallData: Array(24)
//       .fill(0)
//       .map(() => Math.random() * 60),
//   });

//   const dataRef = useRef(data);
//   const alertVisibleRef = useRef(alertVisible);

//   useEffect(() => {
//     dataRef.current = data;
//     alertVisibleRef.current = alertVisible;
//   }, [data, alertVisible]);

//   const showEvacuationMap = () => setModalVisible(true);
//   const closeEvacuationMap = () => setModalVisible(false);

//   useEffect(() => {
//     let intervalId;
//     const simulateWebSocket = () => {
//       const updateData = () => {
//         const currentData = dataRef.current;
//         const currentAlertVisible = alertVisibleRef.current;

//         const waterLevelChange = (Math.random() - 0.5) * 0.8;
//         const newWaterLevel = Math.max(
//           0.5,
//           Math.min(6, parseFloat(currentData.waterLevel) + waterLevelChange)
//         ).toFixed(1);

//         const rainfallChange = (Math.random() - 0.3) * 20;
//         const newRainfall = Math.max(
//           0,
//           Math.min(100, parseInt(currentData.rainfall) + rainfallChange)
//         );

//         const areaChange =
//           Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
//         const newAffectedAreas = Math.max(
//           1,
//           Math.min(15, currentData.affectedAreas + areaChange)
//         );

//         const newWaterLevelData = [
//           ...currentData.waterLevelData.slice(1),
//           parseFloat(newWaterLevel),
//         ];
//         const newRainfallData = [
//           ...currentData.rainfallData.slice(1),
//           newRainfall,
//         ];

//         let newStatus = "low";
//         if (newWaterLevel > 4.5) newStatus = "high";
//         else if (newWaterLevel > 3.2) newStatus = "medium";

//         setData({
//           waterLevel: newWaterLevel,
//           rainfall: newRainfall,
//           affectedAreas: newAffectedAreas,
//           status: newStatus,
//           waterLevelData: newWaterLevelData,
//           rainfallData: newRainfallData,
//         });

//         if (newWaterLevel > 4.5 && !currentAlertVisible) {
//           setAlertVisible(true);
//         }
//         if (newWaterLevel <= 4.5 && currentAlertVisible) {
//           setAlertVisible(false);
//         }
//       };

//       updateData();
//       const intervalTime = 5000 + Math.random() * 1000;
//       intervalId = setInterval(updateData, intervalTime);
//     };

//     simulateWebSocket();

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (Math.random() < 0.1) {
//         setConnectionStatus("disconnected");
//         setTimeout(() => setConnectionStatus("connected"), 3000);
//       }
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return (

//     <div className="min-h-screen  bg-[#f0f3f3] text-white font-sans p-5">

//       <div className="max-w-[2400px] mx-auto">
//         {/* ✅ Alert Banner */}
//         <AlertBanner visible={alertVisible} onViewPlan={showEvacuationMap} />

//         {/* ✅ Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
//           <WaterLevelCard data={data} />
//           <RainfallCard data={data} />
//           <FloodMapCard data={data} />
//           <StatisticsCard data={data} />
//         </div>

//         {/* ✅ Connection + Footer */}
//         <ConnectionStatus status={connectionStatus} />
//         <Footer />
//       </div>


//       {/* ✅ Evacuation Modal */}
//       {/* <EvacuationModal visible={modalVisible} onClose={closeEvacuationMap} /> */}

//     </div>
//   );
// }

// export default Home;





// siren code

// import React, { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import AlertBanner from "../components/Alerts";
// import WaterLevelCard from "../components/WaterLevel";
// import RainfallCard from "../components/RainfallCard";
// import FloodMapCard from "../components/MapBox";
// import StatisticsCard from "../components/StatisticsCard";
// import ConnectionStatus from "../components/ConnectionStatus";
// import Footer from "../components/Footer";
// import EvacuationModal from "../components/EvacuationModel";

// function Home() {
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("connected");
//   const [data, setData] = useState({
//     waterLevel: 3.2,
//     rainfall: 42,
//     affectedAreas: 5,
//     status: "low",
//     waterLevelData: Array(24)
//       .fill(0)
//       .map(() => Math.random() * 4 + 1),
//     rainfallData: Array(24)
//       .fill(0)
//       .map(() => Math.random() * 60),
//   });

//   const dataRef = useRef(data);
//   const alertVisibleRef = useRef(alertVisible);

//   // ADD THIS 🔔 Siren ke liye audioRef
//   const audioRef = useRef(null);

//   useEffect(() => {
//     dataRef.current = data;
//     alertVisibleRef.current = alertVisible;
//   }, [data, alertVisible]);

//   const showEvacuationMap = () => setModalVisible(true);
//   const closeEvacuationMap = () => setModalVisible(false);

//   useEffect(() => {
//     let intervalId;
//     const simulateWebSocket = () => {
//       const updateData = () => {
//         const currentData = dataRef.current;
//         const currentAlertVisible = alertVisibleRef.current;

//         const waterLevelChange = (Math.random() - 0.5) * 0.8;
//         const newWaterLevel = Math.max(
//           0.5,
//           Math.min(6, parseFloat(currentData.waterLevel) + waterLevelChange)
//         ).toFixed(1);

//         const rainfallChange = (Math.random() - 0.3) * 20;
//         const newRainfall = Math.max(
//           0,
//           Math.min(100, parseInt(currentData.rainfall) + rainfallChange)
//         );

//         const areaChange =
//           Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
//         const newAffectedAreas = Math.max(
//           1,
//           Math.min(15, currentData.affectedAreas + areaChange)
//         );

//         const newWaterLevelData = [
//           ...currentData.waterLevelData.slice(1),
//           parseFloat(newWaterLevel),
//         ];
//         const newRainfallData = [
//           ...currentData.rainfallData.slice(1),
//           newRainfall,
//         ];

//         let newStatus = "low";
//         if (newWaterLevel > 4.5) newStatus = "high";
//         else if (newWaterLevel > 3.2) newStatus = "medium";

//         setData({
//           waterLevel: newWaterLevel,
//           rainfall: newRainfall,
//           affectedAreas: newAffectedAreas,
//           status: newStatus,
//           waterLevelData: newWaterLevelData,
//           rainfallData: newRainfallData,
//         });

//         if (newWaterLevel > 4.5 && !currentAlertVisible) {
//           setAlertVisible(true);
//         }
//         if (newWaterLevel <= 4.5 && currentAlertVisible) {
//           setAlertVisible(false);
//         }
//       };

//       updateData();
//       const intervalTime = 5000 + Math.random() * 1000;
//       intervalId = setInterval(updateData, intervalTime);
//     };

//     simulateWebSocket();

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (Math.random() < 0.1) {
//         setConnectionStatus("disconnected");
//         setTimeout(() => setConnectionStatus("connected"), 3000);
//       }
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   // ADD THIS 🔔 Alert ke hisaab se siren bajao
//   useEffect(() => {
//     if (alertVisible && audioRef.current) {
//       audioRef.current.play().catch(err => {
//         console.log("Autoplay blocked until user interacts:", err);
//       });
//     } else if (!alertVisible && audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   }, [alertVisible]);

//   return (
//     <div className="min-h-screen bg-[#f0f3f3] text-white font-sans p-5">
      
//       {/* ADD THIS 🔔 Hidden siren audio */}
//       <audio ref={audioRef} src="/siren.mp3" loop preload="auto" />

//       <div className="max-w-[2400px] mx-auto">
//         {/* ✅ Alert Banner */}
//         <AlertBanner visible={alertVisible} onViewPlan={showEvacuationMap} />

//         {/* ✅ Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
//           <WaterLevelCard data={data} />
//           <RainfallCard data={data} />
//           <FloodMapCard data={data} />
//           <StatisticsCard data={data} />
//         </div>

//         {/* ✅ Connection + Footer */}
//         <ConnectionStatus status={connectionStatus} />
//         <Footer />
//       </div>

//       {/* ✅ Evacuation Modal */}
//       {/* <EvacuationModal visible={modalVisible} onClose={closeEvacuationMap} /> */}
//     </div>
//   );
// }

// export default Home;

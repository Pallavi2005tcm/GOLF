// import React, { useEffect, useState, useRef } from "react";

// // Main coordinates - MMMUT Gorakhpur
// const MMMUT_COORDS = [26.7606, 83.3732];

// // Hardcoded data for medical facilities
// const medicalFacilities = [
//   {
//     name: "Gorakhpur Medical College",
//     coords: [26.759, 83.3827],
//     distance: "2.1 km",
//     address: "Kunraghat, Gorakhpur",
//     contact: "0551-2200877",
//     capacity: "24/7 Emergency",
//   },
//   {
//     name: "AIIMS Gorakhpur",
//     coords: [26.7445, 83.3847],
//     distance: "3.5 km",
//     address: "Kunraghat, Gorakhpur",
//     contact: "0551-250001",
//     capacity: "Multi-specialty",
//   },
//   {
//     name: "Shiva Hospital",
//     coords: [26.7678, 83.3671],
//     distance: "1.2 km",
//     address: "Shivpur Road, Gorakhpur",
//     contact: "0551-2201234",
//     capacity: "24/7 Emergency",
//   },
//   {
//     name: "Shanti Hospital",
//     coords: [26.7523, 83.3618],
//     distance: "2.8 km",
//     address: "University Road, Gorakhpur",
//     contact: "0551-2205678",
//     capacity: "General Medicine",
//   },
// ];

// // Hardcoded data for food distribution centers
// const foodCenters = [
//   {
//     name: "Annapurna Food Center",
//     coords: [26.7632, 83.3698],
//     distance: "0.8 km",
//     address: "Near MMMUT Gate",
//     contact: "9876543210",
//     capacity: "500 meals/day",
//   },
//   {
//     name: "Flood Relief Food Camp",
//     coords: [26.7567, 83.3792],
//     distance: "1.5 km",
//     address: "Kunraghat Crossing",
//     contact: "0551-2209999",
//     capacity: "1000 meals/day",
//   },
//   {
//     name: "Community Kitchen",
//     coords: [26.7689, 83.3624],
//     distance: "1.7 km",
//     address: "Shivpur Chauraha",
//     contact: "8765432109",
//     capacity: "800 meals/day",
//   },
// ];

// // Hardcoded data for shelter facilities
// const shelterFacilities = [
//   {
//     name: "MMMUT Emergency Shelter",
//     coords: [26.7612, 83.3728],
//     distance: "On Campus",
//     address: "MMMUT Campus",
//     contact: "0551-2273958",
//     capacity: "200 people",
//   },
//   {
//     name: "Government Flood Shelter",
//     coords: [26.7543, 83.3816],
//     distance: "1.8 km",
//     address: "Kunraghat",
//     contact: "0551-2205050",
//     capacity: "500 people",
//   },
//   {
//     name: "Community Center Shelter",
//     coords: [26.7654, 83.3652],
//     distance: "1.2 km",
//     address: "Shivpur",
//     contact: "7654321098",
//     capacity: "300 people",
//   },
//   {
//     name: "School Temporary Shelter",
//     coords: [26.7581, 83.3587],
//     distance: "2.3 km",
//     address: "University Road",
//     contact: "6543210987",
//     capacity: "400 people",
//   },
// ];

// function Services() {
//   const [activeTab, setActiveTab] = useState("medical");
//   const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
//   const mapsInitialized = useRef({ medical: false, food: false, shelter: false });
//   const maps = useRef({ medical: null, food: null, shelter: null });

//   useEffect(() => {
//     // Load Leaflet CSS dynamically
//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
//     link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
//     link.crossOrigin = "";
//     document.head.appendChild(link);

//     // Load Leaflet JS dynamically
//     const script = document.createElement("script");
//     script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
//     script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
//     script.crossOrigin = "";
//     script.onload = () => setIsLeafletLoaded(true);
//     document.body.appendChild(script);

//     return () => {
//       document.head.removeChild(link);
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     if (isLeafletLoaded) {
//       if (activeTab === "medical" && !mapsInitialized.current.medical) {
//         initMedicalMap();
//         mapsInitialized.current.medical = true;
//       } else if (activeTab === "food" && !mapsInitialized.current.food) {
//         initFoodMap();
//         mapsInitialized.current.food = true;
//       } else if (activeTab === "shelter" && !mapsInitialized.current.shelter) {
//         initShelterMap();
//         mapsInitialized.current.shelter = true;
//       } else {
//         setTimeout(() => {
//           if (maps.current[activeTab]) {
//             maps.current[activeTab].invalidateSize();
//           }
//         }, 100);
//       }
//     }
//   }, [activeTab, isLeafletLoaded]);

//   // Custom icon creation
//   const createCustomIcon = (iconColor) => {
//     return window.L.divIcon({
//       className: "custom-marker",
//       html: `<div style="background-color: ${iconColor}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
//       iconSize: [24, 24],
//       iconAnchor: [12, 12],
//     });
//   };

//   // Map init functions (same as before, no change)
//   const initMedicalMap = () => { /* ...same logic... */ };
//   const initFoodMap = () => { /* ...same logic... */ };
//   const initShelterMap = () => { /* ...same logic... */ };

//   const handleTabClick = (tabId) => setActiveTab(tabId);

//   return (
//     <div className="p-6 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen text-white font-sans">
//       <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
//         Emergency Services During Floods - MMMUT Gorakhpur
//       </h1>

//       {/* Tabs */}
//       <div className="flex justify-center space-x-3 mb-6">
//         {["medical", "food", "shelter"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => handleTabClick(tab)}
//             className={`px-5 py-2 rounded-md transition-colors ${
//               activeTab === tab
//                 ? "bg-[#203a43] text-white"
//                 : "bg-[#2c5364] hover:bg-[#345d6e]"
//             }`}
//           >
//             {tab === "medical"
//               ? "Medical Help"
//               : tab === "food"
//               ? "Food Help"
//               : "Shelter Help"}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div
//         id="medical"
//         className={`${activeTab === "medical" ? "block" : "hidden"} bg-[#1a2a33] rounded-lg shadow-md p-4 mb-6`}
//       >
//         <h2 className="text-lg font-semibold mb-4">Nearby Medical Facilities</h2>
//         <div className="flex flex-col md:flex-row gap-4">
//           <div id="medical-map" className="flex-1 h-80 rounded-md shadow-md"></div>
//           <div className="w-full md:w-1/3 bg-[#203a43] rounded-md shadow-md p-3">
//             <div className="font-semibold mb-2">Medical Facilities (4)</div>
//             <div id="medical-list" className="space-y-3"></div>
//           </div>
//         </div>
//       </div>

//       <div
//         id="food"
//         className={`${activeTab === "food" ? "block" : "hidden"} bg-[#1a2a33] rounded-lg shadow-md p-4 mb-6`}
//       >
//         <h2 className="text-lg font-semibold mb-4">Nearby Food Distribution Centers</h2>
//         <div className="flex flex-col md:flex-row gap-4">
//           <div id="food-map" className="flex-1 h-80 rounded-md shadow-md"></div>
//           <div className="w-full md:w-1/3 bg-[#203a43] rounded-md shadow-md p-3">
//             <div className="font-semibold mb-2">Food Centers (3)</div>
//             <div id="food-list" className="space-y-3"></div>
//           </div>
//         </div>
//       </div>

//       <div
//         id="shelter"
//         className={`${activeTab === "shelter" ? "block" : "hidden"} bg-[#1a2a33] rounded-lg shadow-md p-4`}
//       >
//         <h2 className="text-lg font-semibold mb-4">Nearby Shelter Facilities</h2>
//         <div className="flex flex-col md:flex-row gap-4">
//           <div id="shelter-map" className="flex-1 h-80 rounded-md shadow-md"></div>
//           <div className="w-full md:w-1/3 bg-[#203a43] rounded-md shadow-md p-3">
//             <div className="font-semibold mb-2">Shelters (4)</div>
//             <div id="shelter-list" className="space-y-3"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Services;






//tailwind ka code



import React, { useEffect, useState, useRef } from "react";

// Main coordinates - MMMUT Gorakhpur
const MMMUT_COORDS = [26.7606, 83.3732];

// ----------------- Data Arrays -----------------
// Nearby Medical Facilities
const medicalFacilities = [
  {
    name: "Gorakhpur District Hospital",
    coords: [26.7609, 83.3735],
    distance: "1.2 km",
    address: "Civil Lines, Gorakhpur",
    contact: "0551-2200180",
    capacity: "24/7 Emergency, OPD, Beds: 200",
  },
  {
    name: "MMMUT Medical Center",
    coords: [26.7595, 83.3740],
    distance: "500 m",
    address: "MMMUT Campus",
    contact: "0551-2273958",
    capacity: "First Aid, Ambulance",
  },
];

// Food Distribution Centers
const foodCenters = [
  {
    name: "Relief Camp - Civil Lines",
    coords: [26.7615, 83.3728],
    distance: "1.5 km",
    address: "Civil Lines Ground, Gorakhpur",
    contact: "9876543210",
    capacity: "Meals/day: 1000",
  },
  {
    name: "Community Kitchen - MMMUT",
    coords: [26.7590, 83.3748],
    distance: "800 m",
    address: "MMMUT Campus",
    contact: "9876501234",
    capacity: "Meals/day: 500",
  },
];

// Shelter Facilities
const shelterFacilities = [
  {
    name: "Government School Shelter",
    coords: [26.7620, 83.3750],
    distance: "2 km",
    address: "Railway Colony, Gorakhpur",
    contact: "9123456789",
    capacity: "200 People",
  },
  {
    name: "MMMUT Indoor Stadium Shelter",
    coords: [26.7592, 83.3725],
    distance: "1 km",
    address: "MMMUT Campus",
    contact: "9988776655",
    capacity: "150 People",
  },
];

// ----------------- Component -----------------
function Services() {
  const [activeTab, setActiveTab] = useState("medical");
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const mapsInitialized = useRef({ medical: false, food: false, shelter: false });
  const maps = useRef({ medical: null, food: null, shelter: null });

  // Load Leaflet JS + CSS
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setIsLeafletLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isLeafletLoaded) {
      if (activeTab === "medical" && !mapsInitialized.current.medical) {
        initMedicalMap();
        mapsInitialized.current.medical = true;
      } else if (activeTab === "food" && !mapsInitialized.current.food) {
        initFoodMap();
        mapsInitialized.current.food = true;
      } else if (activeTab === "shelter" && !mapsInitialized.current.shelter) {
        initShelterMap();
        mapsInitialized.current.shelter = true;
      } else {
        setTimeout(() => {
          if (maps.current[activeTab]) {
            maps.current[activeTab].invalidateSize();
          }
        }, 100);
      }
    }
  }, [activeTab, isLeafletLoaded]);

  const createCustomIcon = (iconColor) => {
    return window.L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: ${iconColor}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const handleTabClick = (tabId) => setActiveTab(tabId);

  // ---------------- MAP FUNCTIONS ----------------
  const initMedicalMap = () => {
    if (!window.L) return;
    const medicalMap = window.L.map("medical-map").setView(MMMUT_COORDS, 14);
    maps.current.medical = medicalMap;
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(medicalMap);

    window.L.marker(MMMUT_COORDS)
      .addTo(medicalMap)
      .bindPopup("<b>MMMUT Gorakhpur</b><br>Central Location");

    const medicalList = document.getElementById("medical-list");
    medicalFacilities.forEach((facility) => {
      const marker = window.L.marker(facility.coords, {
        icon: createCustomIcon("#e74c3c"),
      }).addTo(medicalMap);
      marker.bindPopup(`
        <b>${facility.name}</b><br>
        Distance: ${facility.distance}<br>
        Address: ${facility.address}<br>
        Contact: ${facility.contact}<br>
        Services: ${facility.capacity}
      `);

      window.L.polyline([MMMUT_COORDS, facility.coords], {
        color: "#e74c3c",
        weight: 3,
        opacity: 0.7,
        dashArray: "5, 10",
      }).addTo(medicalMap);

      const listItem = document.createElement("div");
listItem.className =
  "p-4 border-l-4 border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-md shadow-sm transition";

listItem.innerHTML = `
  <h3 class="font-semibold text-black-900 mb-1">${facility.name}</h3>
  <p class="text-sm text-black-800"><strong>Distance:</strong> ${facility.distance}</p>
  <p class="text-sm text-black-800"><strong>Address:</strong> ${facility.address}</p>
  <p class="text-sm text-black-800"><strong>Contact:</strong> ${facility.contact}</p>
  <p class="text-sm text-black-800"><strong>Capacity:</strong> ${facility.capacity}</p>
`;

      listItem.addEventListener("click", () => {
        medicalMap.setView(facility.coords, 16);
        marker.openPopup();
      });
      medicalList.appendChild(listItem);
    });
  };

  const initFoodMap = () => {
    if (!window.L) return;
    const foodMap = window.L.map("food-map").setView(MMMUT_COORDS, 14);
    maps.current.food = foodMap;
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(foodMap);

    window.L.marker(MMMUT_COORDS)
      .addTo(foodMap)
      .bindPopup("<b>MMMUT Gorakhpur</b><br>Central Location");

    const foodList = document.getElementById("food-list");
    foodCenters.forEach((center) => {
      const marker = window.L.marker(center.coords, {
        icon: createCustomIcon("#2ecc71"),
      }).addTo(foodMap);
      marker.bindPopup(`
        <b>${center.name}</b><br>
        Distance: ${center.distance}<br>
        Address: ${center.address}<br>
        Contact: ${center.contact}<br>
        Capacity: ${center.capacity}
      `);

      window.L.polyline([MMMUT_COORDS, center.coords], {
        color: "#2ecc71",
        weight: 3,
        opacity: 0.7,
        dashArray: "5, 10",
      }).addTo(foodMap);

      const listItem = document.createElement("div");
      listItem.className =
  "p-4 border-l-4 border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-md shadow-sm transition";

listItem.innerHTML = `
  <h3 class="font-semibold text-black mb-1">${center.name}</h3>
  <p class="text-sm text-black"><strong>Distance:</strong> ${center.distance}</p>
  <p class="text-sm text-black"><strong>Address:</strong> ${center.address}</p>
  <p class="text-sm text-black"><strong>Contact:</strong> ${center.contact}</p>
  <p class="text-sm text-black"><strong>Capacity:</strong> ${center.capacity}</p>
`;

      listItem.addEventListener("click", () => {
        foodMap.setView(center.coords, 16);
        marker.openPopup();
      });
      foodList.appendChild(listItem);
    });
  };

  const initShelterMap = () => {
    if (!window.L) return;
    const shelterMap = window.L.map("shelter-map").setView(MMMUT_COORDS, 14);
    maps.current.shelter = shelterMap;
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(shelterMap);

    window.L.marker(MMMUT_COORDS)
      .addTo(shelterMap)
      .bindPopup("<b>MMMUT Gorakhpur</b><br>Central Location");

    const shelterList = document.getElementById("shelter-list");
    shelterFacilities.forEach((shelter) => {
      const marker = window.L.marker(shelter.coords, {
        icon: createCustomIcon("#f39c12"),
      }).addTo(shelterMap);
      marker.bindPopup(`
        <b>${shelter.name}</b><br>
        Distance: ${shelter.distance}<br>
        Address: ${shelter.address}<br>
        Contact: ${shelter.contact}<br>
        Capacity: ${shelter.capacity}
      `);

      window.L.polyline([MMMUT_COORDS, shelter.coords], {
        color: "#f39c12",
        weight: 3,
        opacity: 0.7,
        dashArray: "5, 10",
      }).addTo(shelterMap);

      const listItem = document.createElement("div");
      listItem.className =
  "p-4 border-l-4 border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-md shadow-sm transition";

listItem.innerHTML = `
  <h3 class="font-semibold text-black mb-1">${shelter.name}</h3>
  <p class="text-sm text-black"><strong>Distance:</strong> ${shelter.distance}</p>
  <p class="text-sm text-black"><strong>Address:</strong> ${shelter.address}</p>
  <p class="text-sm text-black"><strong>Contact:</strong> ${shelter.contact}</p>
  <p class="text-sm text-black"><strong>Capacity:</strong> ${shelter.capacity}</p>
`;

      listItem.addEventListener("click", () => {
        shelterMap.setView(shelter.coords, 16);
        marker.openPopup();
      });
      shelterList.appendChild(listItem);
    });
  };

  // ---------------- JSX ----------------
  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-100 rounded-2xl shadow-xl border border-1">
  <h1 className="text-center text-4xl font-extrabold text-[#30465c] pb-2 mb-12">
    Emergency Services During Floods - MMMUT Gorakhpur
  </h1>

  {/* Tabs */}
  <div className="flex mb-8 rounded-lg overflow-hidden  border-1 bg-[#618ab5]">
    {["medical", "food", "shelter"].map((tab) => (
  <button
  key={tab}
  onClick={() => handleTabClick(tab)}
  className={`flex-1 py-3 text-center font-bold text-sm transition duration-200 relative tracking-wide text-white ${
    activeTab === tab
      ? "bg-[#618ab5] border-b-4 border-blue-950"
      : "hover:bg-[#436a94]"
  }`}
>
  {tab === "medical" && "Medical Help"}
  {tab === "food" && "Food Help"}
  {tab === "shelter" && "Shelter Help"}
</button>


    ))}
  </div>

  {/* Tab Sections */}
  {["medical", "food", "shelter"].map((tab) => (
    <div
      key={tab}
      id={tab}
      className={`${
        activeTab === tab ? "flex flex-col" : "hidden"
      } bg-white rounded-xl  border-1 shadow-lg p-6 mb-10 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4">
        <h2 className="text-2xl font-semibold text-black tracking-tight inline-block">
          {tab === "medical" && "Nearby Medical Facilities"}
          {tab === "food" && "Nearby Food Distribution Centers"}
          {tab === "shelter" && "Nearby Shelter Facilities"}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:h-[500px]">
        {/* Map Section */}
        <div
          id={`${tab}-map`}
          className="flex-1 h-[400px] md:h-full rounded-xl shadow-md border-2 border-black"
        ></div>

        {/* List Section */}
        <div className="w-full md:w-[320px] h-[400px] md:h-full overflow-y-auto border-2  rounded-xl bg-[#e3eef9] ">
          <div className="bg-[#8eb9e6] text-black font-semibold text-sm p-4 sticky top-0 z-10 rounded-t-xl">
            {tab === "medical" && `Medical Facilities (${medicalFacilities.length})`}
            {tab === "food" && `Food Centers (${foodCenters.length})`}
            {tab === "shelter" && `Shelters (${shelterFacilities.length})`}
          </div>
          <div
            id={`${tab}-list`}
            className="divide-y divide-blue-300 px-4 py-2 space-y-2"
          ></div>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

export default Services;

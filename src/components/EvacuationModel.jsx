

// css ka code

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Helper function for custom marker icons
const createCustomIcon = (className, html) => {
  return L.divIcon({
    className: `custom-marker ${className}`,
    html,
    iconSize: [className === 'mmmut-marker' ? 28 : 24, className === 'mmmut-marker' ? 28 : 24]
  });
};

const EvacuationPage = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  const shelters = [
    { lat: 26.7606, lng: 83.3732, name: "MMMUT Main Building", capacity: "High", distance: "0 km" },
    { lat: 26.7640, lng: 83.3780, name: "Public Library", capacity: "Low", distance: "3.5 km" },
    { lat: 26.7550, lng: 83.3650, name: "City Convention Center", capacity: "High", distance: "5.8 km" },
    { lat: 26.7500, lng: 83.3800, name: "Gorakhpur Railway Station", capacity: "Medium", distance: "7.2 km" }
  ];

  const routes = [
    [[26.7606, 83.3732], [26.7640, 83.3780]],
    [[26.7606, 83.3732], [26.7550, 83.3650]],
    [[26.7606, 83.3732], [26.7500, 83.3800]]
  ];

  return (
    <div className="min-h-screen bg-white p-6 border-1">
  <div className="max-w-6xl mx-auto ">
    {/* Header */}
    <div className="bg-[#8db4db]  rounded-xl p-6 mb-6 shadow-lg border-1">
      <h2 className="text-2xl font-extrabold text-[#33373b] text-center">Flood Evacuation Plan for High-Risk Areas</h2>
      <p className="text-black text-center mt-2">Safe routes and shelter locations for emergency evacuation</p>
    </div>

    {/* Map Container */}
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-[#d1e0e0]">
      <div className="h-[500px] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[26.7606, 83.3732]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Starting Point */}
          <Marker
            position={[26.7606, 83.3732]}
            icon={createCustomIcon('mmmut-marker', `
              <div class="w-7 h-7 rounded-full bg-[#004e92] flex items-center justify-center text-white border-2 border-white shadow-md">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
              </div>
            `)}
          >
            <Popup><b>MMMUT Gorakhpur</b><br />Starting Point</Popup>
          </Marker>

          {/* Shelter Markers */}
          {shelters.map((shelter, index) => (
            <Marker
              key={index}
              position={[shelter.lat, shelter.lng]}
              icon={createCustomIcon('shelter-marker', `
                <div class="w-6 h-6 rounded-full ${shelter.capacity === 'High' ? 'bg-[#ff6b6b]' : shelter.capacity === 'Medium' ? 'bg-[#ffd93d]' : 'bg-[#6bcb77]'} flex items-center justify-center text-white border-2 border-white shadow-md">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5z"/>
                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6z"/>
                  </svg>
                </div>
              `)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-black">{shelter.name}</h3>
                  <p className="mt-1 text-black">Capacity: <span className={`font-semibold ${shelter.capacity === 'High' ? 'text-[#ff6b6b]' : shelter.capacity === 'Medium' ? 'text-[#ffd93d]' : 'text-[#6bcb77]'}`}>{shelter.capacity}</span></p>
                  <p className="mt-1 text-black">Distance: {shelter.distance}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Danger Zones */}
          <Circle
            center={[26.7620, 83.3750]}
            color="#ff6b6b"
            fillColor="#ff6b6b"
            fillOpacity={0.2}
            radius={300}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-black">Danger Zone</h3>
                <p className="mt-1 text-black">High flood risk area - Avoid completely</p>
              </div>
            </Popup>
          </Circle>

          <Circle
            center={[26.7580, 83.3700]}
            color="#ff6b6b"
            fillColor="#ff6b6b"
            fillOpacity={0.2}
            radius={200}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-black">Danger Zone</h3>
                <p className="mt-1 text-black">High flood risk area - Avoid completely</p>
              </div>
            </Popup>
          </Circle>

          {/* Evacuation Routes */}
          {routes.map((route, index) => (
            <Polyline
              key={index}
              positions={route}
              color="#004e92"
              weight={4}
              dashArray="5, 10"
            />
          ))}
        </MapContainer>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Shelter List */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-[#d1e0e0]">
        <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b border-[#d1e0e0]">Nearest Shelters</h3>
        <div className="space-y-4">
          {shelters.map((shelter, index) => (
            <div key={index} className="p-4 rounded-lg border border-[#d1e0e0] hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-black">{shelter.name}</h4>
                  <p className="text-sm text-gray-800 mt-1">Deoria Road, Gorakhpur</p>
                  <div className="flex items-center mt-2">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${shelter.capacity === 'High' ? 'bg-[#ff6b6b]' : shelter.capacity === 'Medium' ? 'bg-[#ffd93d]' : 'bg-[#6bcb77]'}`}></span>
                    <span className="text-sm text-black">
                      Capacity: {shelter.capacity} ({shelter.capacity === 'High' ? '500' : shelter.capacity === 'Medium' ? '300' : '150'} people)
                    </span>
                  </div>
                </div>
                <div className="bg-[#e6f2ff] px-3 py-1 rounded-lg text-[#004e92] font-semibold">
                  {shelter.distance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-[#d1e0e0]">
        <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b border-[#d1e0e0]">Evacuation Instructions</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-[#004e92] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
              <span className="text-xs font-bold">1</span>
            </div>
            <span className="text-black">Follow the marked evacuation routes (blue dashed lines)</span>
          </li>
          <li className="flex items-start">
            <div className="bg-[#004e92] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
              <span className="text-xs font-bold">2</span>
            </div>
            <span className="text-black">Avoid areas marked in red (flood danger zones)</span>
          </li>
          <li className="flex items-start">
            <div className="bg-[#004e92] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
              <span className="text-xs font-bold">3</span>
            </div>
            <span className="text-black">Bring essential items only: documents, medicines, water</span>
          </li>
          <li className="flex items-start">
            <div className="bg-[#004e92] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
              <span className="text-xs font-bold">4</span>
            </div>
            <span className="text-black">Assist children, elderly, and people with disabilities</span>
          </li>
          <li className="flex items-start">
            <div className="bg-[#004e92] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
              <span className="text-xs font-bold">5</span>
            </div>
            <span className="text-black">Listen to emergency broadcasts for updates</span>
          </li>
        </ul>
        
        <div className="mt-6 p-4 bg-[#e6f2ff] rounded-lg border border-[#004e92]">
          <h4 className="font-semibold text-[#004e92] flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
            Emergency Contact
          </h4>
          <p className="text-sm mt-2 text-black">Flood Helpline: <span className="font-semibold">1078</span> or <span className="font-semibold">9911443636</span></p>
        </div>
      </div>
    </div>
  </div>

  {/* Custom Styles */}
  <style jsx>{`
    .leaflet-popup-content-wrapper {
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .leaflet-popup-tip {
      background: white;
    }
  `}</style>
</div>
  );
};

export default EvacuationPage;
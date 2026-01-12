import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const SOSPanel = () => {
  const [sosRequests, setSosRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Filters
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");

  // ✅ Socket.IO for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      reconnectionAttempts: 5,
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("✅ Connected to SOS socket server"));

    socket.on("newSOS", (newRequest) => {
      console.log("🚨 New SOS received:", newRequest);

      setSosRequests((prevRequests) => {
        const exists = prevRequests.some((req) => req._id === newRequest._id);
        return exists ? prevRequests : [newRequest, ...prevRequests];
      });
    });

    socket.on("connect_error", (err) => console.error("❌ Socket error:", err.message));

    return () => socket.disconnect();
  }, []);

  // ✅ Fetch initial SOS requests
  useEffect(() => {
    const fetchSOSRequests = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/sos");

        if (response.data && Array.isArray(response.data.sosList)) {
          setSosRequests(response.data.sosList);
        } else {
          console.error("❌ Invalid API response:", response.data);
          setError("Received invalid data from the server.");
        }
      } catch (err) {
        console.error("❌ Error fetching SOS requests:", err);
        setError("Failed to fetch SOS requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchSOSRequests();
  }, []);

  // ✅ Filtered requests based on activeCategory & activeStatus
  const filteredRequests = sosRequests.filter((request) => {
    const categoryMatch =
      activeCategory === "all" || request.category === activeCategory;
    const statusMatch =
      activeStatus === "all" || request.status === activeStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 pb-2">
        Active SOS Requests
      </h2>

  

      {/* ✅ Loading / Error / Empty states */}
      {loading && <p className="text-center text-gray-500">Loading SOS requests...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && filteredRequests.length === 0 && (
        <p className="text-center text-gray-600">No SOS requests match the filters.</p>
      )}

      {/* ✅ SOS Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <div
            key={request._id}
            className="bg-white p-6 rounded-lg shadow-md border border-red-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <span className="text-red-500 mr-2">🚨</span>
              <h3 className="text-xl font-semibold">SOS Request</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong className="text-gray-800">User ID:</strong> {request.userId || "N/A"}
              </p>

              <p className="text-gray-700">
                <strong className="text-gray-800">Location:</strong>{" "}
                {request.location?.lat && request.location?.lng ? (
                  <span>
                    {request.location.lat}, {request.location.lng}
                  </span>
                ) : (
                  <span>Location not available</span>
                )}
              </p>

              <p className="text-gray-700">
                <strong className="text-gray-800">Timestamp:</strong>{" "}
                {request.createdAt
                  ? new Date(request.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              <p className="text-gray-700">
                <strong className="text-gray-800">Category:</strong>{" "}
                {request.category || "N/A"}
              </p>

              <p className="text-gray-700">
                <strong className="text-gray-800">Status:</strong>{" "}
                {request.status || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SOSPanel;

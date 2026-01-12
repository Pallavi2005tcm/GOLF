import React from "react";

export default function SOSPage() {
  const sendSOS = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch("http://localhost:4000/api/sos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: "12345", // ✅ login ke baad actual user ID use karna
            location: { lat: latitude, lng: longitude },
          }),
        });

        const data = await res.json();
        alert(data.message || "🚨 SOS Sent!");
      } catch (error) {
        console.error("Error sending SOS:", error);
        alert("Failed to send SOS!");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Emergency SOS</h1>
      <button
        onClick={sendSOS}
        className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700"
      >
        🚨 Send SOS
      </button>
    </div>
  );
}

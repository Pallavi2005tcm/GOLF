import { useState } from "react";

export function useSendSOS() {
  const [loading, setLoading] = useState(false);

  const sendSOS = async () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch("http://localhost:4000/api/sos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "66fa7c12345abcd67890efg", // Replace with actual DB user
            location: { lat: latitude, lng: longitude },
          }),
        });

        const data = await res.json();
        if (data.success) {
          alert("🚨 SOS Sent Successfully!");
        } else {
          alert("❌ Failed to send SOS");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("⚠️ Server not responding");
      } finally {
        setLoading(false);
      }
    });
  };

  return { sendSOS, loading };
}

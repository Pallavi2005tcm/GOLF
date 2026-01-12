import { useRef, useEffect } from "react";

export const useSiren = (alertVisible) => {
  const sirenRef = useRef(null);

  // Check if user has enabled sound
  const isEnabled = localStorage.getItem("sirenEnabled") === "true";

  // Initialize siren
  useEffect(() => {
    if (!sirenRef.current) {
      sirenRef.current = new Audio("/siren.mp3"); // place siren.mp3 in public folder
      sirenRef.current.loop = true;
    }
  }, []);

  // Play / pause siren when alertVisible changes
  useEffect(() => {
    if (alertVisible && isEnabled) {
      sirenRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
    } else {
      sirenRef.current?.pause();
      sirenRef.current.currentTime = 0;
    }
  }, [alertVisible, isEnabled]);

  // Function to enable sound (call on first user click)
  const enableSiren = () => {
    if (!sirenRef.current) return;

    sirenRef.current.play().then(() => {
      sirenRef.current.pause();
      sirenRef.current.currentTime = 0;
      localStorage.setItem("sirenEnabled", "true");
      alert("Sound alerts enabled! You will hear siren on high-risk events.");
    }).catch(err => console.log("User gesture required:", err));
  };

  return { enableSiren };
};

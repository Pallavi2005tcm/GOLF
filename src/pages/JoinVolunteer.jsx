import { useState, useEffect } from "react";
import axios from "axios";

export default function JoinVolunteer() {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/getuserdata", {
        withCredentials: true,
      });
      setRole(res.data.role);
    } catch (err) {
      console.error("Error fetching user data:", err.response?.data || err.message);
    }
  }

  const handleJoinVolunteer = async () => {
    if (role === "volunteer") {
      setMessage("✅ You are already a volunteer!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/join-volunteer",
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message);
      fetchUserData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending request");
      console.error("Join Volunteer Error:", err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  bg-[#f0f3f3] rounded-lg p-8 shadow-md ">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Join as a Volunteer
        </h1>
        <p className="text-gray-600">
          Make a difference by helping those in need
        </p>
      </div>

      

      <div className="flex justify-center mb-6">
        <button
          onClick={handleJoinVolunteer}
          disabled={role === "volunteer" || isLoading}
          className={`relative flex items-center justify-center gap-3 py-3 px-6 rounded-md font-medium transition-all duration-300 ${
            role === "volunteer"
              ? "bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 hover:shadow-md"
          } ${isLoading ? "opacity-80 cursor-wait" : ""}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : role === "volunteer" ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Already a Volunteer
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Join as Volunteer
            </>
          )}
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-md text-center font-medium transition-all duration-300 border ${
          message.includes("Error") 
            ? "bg-red-50 border-red-200 text-red-700" 
            : "bg-green-50 border-green-200 text-green-700"
        }`}>
          <div className="flex items-center justify-center gap-2">
            {message.includes("Error") ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message}
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits of volunteering:</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
            Help people in your community
          </li>
          <li className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
            Build meaningful connections
          </li>
          <li className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
            Make a positive impact
          </li>
        </ul>
      </div>
    </div>
  );
}
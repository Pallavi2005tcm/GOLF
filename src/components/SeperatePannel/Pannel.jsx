import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import JoinVolunteer from "../../pages/JoinVolunteer";

import {
  FiHelpCircle,
  FiUsers,
  FiUserPlus,
  FiMic,
  FiSquare,
  FiCheckCircle,
  FiRefreshCcw,
  FiCoffee,
  FiPhone,
  FiMapPin,
  FiHome,
  FiActivity,
  FiMessageSquare,
  FiMail,
} from "react-icons/fi";

export default function CreateRequestPanel() {
  const [selectedTab, setSelectedTab] = useState("help");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volunteers, setVolunteers] = useState([]);

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/request/get_volunteer_detail", {
        withCredentials: true,
      });
      setVolunteers(res.data || []);
    } catch (err) {
      console.error("Error fetching volunteers", err);
    }
  };

  const handleMicStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const handleMicStop = () => {
    SpeechRecognition.stopListening();
    setDetails((prev) => (prev + " " + transcript).trim());
  };

  const handleSubmit = async () => {
    if (!selectedCategory) {
      setMessage("Please select a category first");
      return;
    }
    if (!details.trim()) {
      setMessage("Please describe your request");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost:4000/api/request/create_request",
        { category: selectedCategory, details },
        { withCredentials: true }
      );

      setMessage("✅ Request created successfully!");
      setDetails("");
      setSelectedCategory(null);
      resetTranscript();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create request. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-2">
      <div className="max-w-screen mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-4xl font-bold text-blue-900">
            HelpBridge
          </h1>
          <p className="text-gray-600 text-lg mt-5">
            Connecting those in need with trusted volunteers
          </p>
        </div>

        {/* Three-button Navigation */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          {[
            { key: "help", label: "Request Assistance", icon: <FiHelpCircle size={20} /> },
            { key: "contribute", label: "Find Volunteers", icon: <FiUsers size={20} /> },
            { key: "register", label: "Become Volunteer", icon: <FiUserPlus size={20} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedTab(tab.key);
                setMessage("");
              }}
              className={`flex items-center justify-center gap-2 py-4 px-6 rounded-lg border transition-all duration-300 ${
                selectedTab === tab.key
                  ? "bg-gradient-to-tr from-[#2a2dec] via-cyan-500 to-[#3045e6] text-white font-bold border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-400"
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
          
          {/* Help Tab */}
          {selectedTab === "help" && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-semibold text-center text-blue-900 mb-8">
                Submit Assistance Request
              </h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Select Category</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Medical", icon: <FiActivity size={28} className="text-red-600" />, color: "bg-red-100" },
                    { name: "Food", icon: <FiCoffee size={28} className="text-purple-600" />, color: "bg-purple-100" },
                    { name: "Shelter", icon: <FiHome size={28} className="text-amber-600" />, color: "bg-yellow-50" },
                  ].map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`p-5 rounded-lg text-center transition-all flex flex-col items-center border-2 ${
                        selectedCategory === cat.name
                          ? `${cat.color} border-${cat.color}-500 ${cat.color}-700 shadow-md`
                          : ` border-gray-300 text-gray-700 hover:border-${cat.color}-400`
                      }`}
                    >
                      {cat.icon}
                      <span className="mt-2 font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedCategory && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Describe your {selectedCategory.toLowerCase()} needs
                  </h3>
                  
                  <textarea
                    rows={5}
                    value={details || transcript}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Please provide clear details about what you need assistance with..."
                    className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    {!listening ? (
                      <button
                        onClick={handleMicStart}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-700 transition flex-1"
                      >
                        <FiMic size={22} />
                        <span className="font-medium">Start Voice Input</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleMicStop}
                        className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg shadow hover:bg-red-700 transition flex-1"
                      >
                        <FiSquare size={25} />
                        <span className="font-medium">Stop Recording</span>
                      </button>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 flex-1"
                    >
                      <FiCheckCircle size={18} />
                      <span className="font-medium">{isSubmitting ? "Submitting..." : "Submit Request"}</span>
                    </button>
                  </div>
                  
                  {listening && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-800 border border-blue-200">
                      <p className="font-medium">Listening...</p>
                      <p className="mt-1">{transcript}</p>
                    </div>
                  )}
                </div>
              )}

              {message && (
                <div
                  className={`mt-6 p-4 rounded-lg text-center font-medium ${
                    message.includes("✅")
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          )}

          {/* Contribute Tab */}
          {selectedTab === "contribute" && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                Available Volunteers
              </h2>

              <div className="flex justify-center mb-8">
                <button
                  onClick={fetchVolunteers}
                  className="flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg shadow hover:bg-green-700 transition"
                >
                  <FiRefreshCcw size={18} />
                  <span className="font-medium">
                    {volunteers.length ? "Refresh Volunteers" : "Load Volunteers"}
                  </span>
                </button>
              </div>

              {volunteers.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                  {volunteers.map((vol, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-blue-600 text-lg font-bold">
                          {vol.name ? vol.name.charAt(0).toUpperCase() : "V"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {vol.name || "Anonymous Volunteer"}
                          </h3>
                          <p className="text-red-600 text-sm">
                            {vol.category || "Volunteer"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-gray-700">
                        {vol.phone && (
                          <p className="flex items-center gap-2 text-sm">
                            <FiPhone className="text-black" />
                            <a
                              href={`tel:${vol.phone}`}
                              className="hover:text-gray-900 hover:underline"
                            >
                              {vol.phone}
                            </a>
                          </p>
                        )}
                        {vol.address && (
                          <p className="flex items-center gap-2 text-sm">
                            <FiMapPin className="text-black" />
                            <span>{vol.address}</span>
                          </p>
                        )}
                        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                          <button className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 py-1 px-2 rounded">
                            <FiMessageSquare size={12} />
                            Message
                          </button>
                          <button className="flex items-center gap-1 text-xs bg-green-50 text-green-600 py-1 px-2 rounded">
                            <FiMail size={12} />
                            Email
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                  <FiUsers className="mx-auto text-gray-400 text-5xl mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No Volunteers Loaded
                  </h3>
                  <p className="text-gray-500">
                    Click "Load Volunteers" to see available helpers in your community.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Register Tab */}
          {selectedTab === "register" && (
            <div className="animate-fadeIn">
              <JoinVolunteer />
            </div>
          )}
        </div>

        {/* Footer Note */}
        {/* <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Your requests are securely shared with verified volunteers in your area</p>
        </div> */}
      </div>
    </div>
  );
}
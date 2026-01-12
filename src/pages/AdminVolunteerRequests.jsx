import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminVolunteerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all volunteer requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/volunteer-requests", {
        withCredentials: true
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Approve volunteer
  const approveVolunteer = async (id) => {
    try {
      console.log("Aprrove called");
      await axios.get(`http://localhost:4000/api/auth/approve-volunteer/${id}`, {}, {
        withCredentials: true
      });
      console.log("Succes Finaly frontend")
      setRequests((prev) => prev.filter((req) => req._id !== id));
      alert("Volunteer approved successfully!");
    } catch (err) {
      console.error("Error approving volunteer:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p className="text-center">Loading requests...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Pending Volunteer Requests
      </h2>
      {requests.length === 0 ? (
         <p className="text-gray-500 flex justify-center items-center">No pending requests</p>

      ) : (
        <div className="grid gap-4">
          {requests.map((user) => (
            <div
              key={user._id}
              className="p-4 border rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
              <button
                onClick={() => approveVolunteer(user._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

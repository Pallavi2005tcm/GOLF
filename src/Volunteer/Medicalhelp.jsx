import React, { useState, useEffect } from 'react';
import { FiMapPin, FiPhone, FiClock, FiUser, FiArrowRight, FiSearch } from 'react-icons/fi';

const MedicalHelpVolunteer = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [medicalRequests, setMedicalRequests] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate fetching medical requests
    const sampleRequests = [
      {
        id: 1,
        name: "Rahul Sharma",
        location: "Sunder Nagar, Gorakhpur",
        injury: "Leg injury from debris",
        priority: "High",
        distance: "1.2 km",
        coordinates: { lat: 26.7606, lng: 83.3732 },
        status: "Pending",
        contact: "+91 9876543210"
      },
      {
        id: 2,
        name: "Priya Singh",
        location: "Civil Lines, Gorakhpur",
        injury: "Respiratory issues from water",
        priority: "Medium",
        distance: "2.5 km",
        coordinates: { lat: 26.7580, lng: 83.3700 },
        status: "Pending",
        contact: "+91 9876543211"
      },
      {
        id: 3,
        name: "Elderly couple",
        location: "University Road, Gorakhpur",
        injury: "Need medication delivery",
        priority: "Low",
        distance: "3.8 km",
        coordinates: { lat: 26.7640, lng: 83.3780 },
        status: "Assigned",
        contact: "+91 9876543212"
      }
    ];

    // Simulate fetching hospitals
    const sampleHospitals = [
      {
        id: 1,
        name: "Gorakhpur Medical College",
        address: "Medical College Road, Gorakhpur",
        distance: "2.1 km",
        beds: 15,
        contact: "+91 9876543210",
        coordinates: { lat: 26.7620, lng: 83.3750 }
      },
      {
        id: 2,
        name: "City Hospital",
        address: "Civil Lines, Gorakhpur",
        distance: "3.5 km",
        beds: 8,
        contact: "+91 9876543211",
        coordinates: { lat: 26.7550, lng: 83.3650 }
      },
      {
        id: 3,
        name: "MMMUT Medical Center",
        address: "MMMUT Campus, Gorakhpur",
        distance: "0.5 km",
        beds: 5,
        contact: "+91 9876543212",
        coordinates: { lat: 26.7606, lng: 83.3732 }
      }
    ];

    setMedicalRequests(sampleRequests);
    setHospitals(sampleHospitals);

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to MMMUT location if geolocation fails
          setUserLocation({ lat: 26.7606, lng: 83.3732 });
        }
      );
    } else {
      // Default to MMMUT location if geolocation not supported
      setUserLocation({ lat: 26.7606, lng: 83.3732 });
    }
  }, []);

  const acceptRequest = (requestId) => {
    setMedicalRequests(requests =>
      requests.map(request =>
        request.id === requestId ? { ...request, status: "Assigned" } : request
      )
    );
    alert("Medical request accepted. You will receive navigation details shortly.");
  };

  const completeRequest = (requestId) => {
    setMedicalRequests(requests =>
      requests.filter(request => request.id !== requestId)
    );
    alert("Medical request marked as completed.");
  };

  const filteredRequests = medicalRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.injury.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">Medical Help Volunteer Services</h1>
          <p className="text-gray-600">Provide medical assistance to flood victims in real-time</p>
          
          {/* Search Bar */}
          <div className="mt-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for requests or hospitals..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('requests')}
              >
                Medical Requests
              </button>
              <button
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'hospitals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('hospitals')}
              >
                Nearby Hospitals
              </button>
              <button
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                Medical Resources
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'requests' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Active Medical Requests</h2>
              
              {filteredRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No medical requests found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRequests.map(request => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-gray-900">{request.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          request.priority === 'High' ? 'bg-red-100 text-red-800' :
                          request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.priority} Priority
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">{request.injury}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <FiMapPin className="mr-1" />
                        <span>{request.location} • {request.distance}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FiPhone className="mr-1" />
                        <span>{request.contact}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200"
                          onClick={() => setSelectedRequest(request)}
                        >
                          View Details
                        </button>
                        
                        {request.status === 'Pending' ? (
                          <button
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                            onClick={() => acceptRequest(request.id)}
                          >
                            Accept Request
                          </button>
                        ) : (
                          <button
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                            onClick={() => completeRequest(request.id)}
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'hospitals' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Nearby Hospitals & Medical Facilities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHospitals.map(hospital => (
                  <div key={hospital.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{hospital.name}</h3>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FiMapPin className="mr-1" />
                      <span>{hospital.address}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FiClock className="mr-1" />
                      <span>{hospital.distance} away</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FiUser className="mr-1" />
                      <span>{hospital.beds} beds available</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FiPhone className="mr-1" />
                      <span>{hospital.contact}</span>
                    </div>
                    
                    <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center justify-center">
                      <FiArrowRight className="mr-2" />
                      Get Directions
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Medical Resources & Guidelines</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">First Aid Instructions</h3>
                  <ul className="list-disc list-inside text-sm text-blue-900 pl-2">
                    <li>Basic wound care and dressing</li>
                    <li>CPR for drowning victims</li>
                    <li>Treating hypothermia</li>
                    <li>Recognizing signs of water-borne diseases</li>
                  </ul>
                  <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
                    Download First Aid Guide
                  </button>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Emergency Medications</h3>
                  <ul className="list-disc list-inside text-sm text-green-900 pl-2">
                    <li>Antibiotics for water-borne infections</li>
                    <li>Tetanus shots for wound care</li>
                    <li>Pain relief medications</li>
                    <li>Anti-diarrheal medications</li>
                  </ul>
                  <button className="mt-3 text-sm text-green-600 hover:text-green-800">
                    View Medication List
                  </button>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">Evacuation Procedures</h3>
                  <ul className="list-disc list-inside text-sm text-yellow-900 pl-2">
                    <li>Safe patient transport methods</li>
                    <li>Prioritizing patients by severity</li>
                    <li>Coordinating with emergency services</li>
                    <li>Using available resources efficiently</li>
                  </ul>
                  <button className="mt-3 text-sm text-yellow-600 hover:text-yellow-800">
                    Download Evacuation Protocol
                  </button>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-800 mb-2">Emergency Contacts</h3>
                  <ul className="list-none text-sm text-red-900 pl-2">
                    <li className="mb-1"><strong>Ambulance:</strong> 102</li>
                    <li className="mb-1"><strong>Emergency:</strong> 112</li>
                    <li className="mb-1"><strong>Disaster Management:</strong> 1070</li>
                    <li className="mb-1"><strong>Local Health Department:</strong> +91 9876543210</li>
                  </ul>
                  <button className="mt-3 text-sm text-red-600 hover:text-red-800">
                    Save All Contacts
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Request Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Medical Request Details</h2>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">{selectedRequest.name}</h3>
                <p className="text-sm text-gray-600">{selectedRequest.injury}</p>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <FiMapPin className="mr-1" />
                <span>{selectedRequest.location} • {selectedRequest.distance}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <FiPhone className="mr-1" />
                <span>{selectedRequest.contact}</span>
              </div>
              
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">Additional Notes:</h4>
                <p className="text-sm text-blue-900">Patient is located on the second floor of a building. Need assistance with carrying down stairs.</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  onClick={() => setSelectedRequest(null)}
                >
                  Cancel
                </button>
                
                {selectedRequest.status === 'Pending' ? (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() => {
                      acceptRequest(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                  >
                    Accept Request
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() => {
                      completeRequest(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHelpVolunteer;
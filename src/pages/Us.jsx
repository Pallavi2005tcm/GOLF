import React from 'react';


const Us = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
     


      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">About JeevanSetu</h1>
          <p className="text-gray-600 mt-2">One-stop disaster management solution</p>
        </header>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
         <div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-bold text-gray-800 mb-4">About JeevanSetu</h2>
  <p className="text-gray-700 mb-3">
    JeevanSetu is an AI/ML-powered disaster management platform designed to save lives during
    Glacier Lake Outburst Floods (GLOFs). It provides early warnings,
    confidence scores, and real-time evacuation routes.
  </p>
  <p className="text-gray-700 mb-3">
    Beyond alerts, it connects people with essential services like food, shelter, and medical help,
    while enabling volunteer coordination for community-driven support.
  </p>
  <p className="text-gray-700 mb-3">
    Its unique strength lies in <span className="font-semibold">offline functionality</span>, ensuring
    that even in no-network zones, critical alerts and services remain accessible through PWA, SMS,
    and IVR.
  </p>
  <p className="text-green-800 text-lg font-bold italic mt-4 border-l-4 border-green-600 pl-3">
    JeevanSetu is not just an app — it is a bridge of hope, safety, and resilience for
    vulnerable communities.
  </p>


            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700 italic">
                "Saving lives through technology, even in the most challenging environments"
              </p>
            </div>
          </div>


          {/* How It Works Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">How JeevanSetu Helps</h2>
           
            <div className="mb-6">
              <h3 className="font-semibold text-blue-700">Early Detection</h3>
              <p className="text-sm mt-2 text-gray-700">Our AI algorithms analyze multiple data sources to detect potential GLOF events before they happen.</p>
            </div>
           
            <div className="mb-6">
              <h3 className="font-semibold text-blue-700">Real-time Alerts</h3>
              <p className="text-sm mt-2 text-gray-700">Instant notifications to communities at risk, even with limited internet connectivity.</p>
            </div>
           
            <div>
              <h3 className="font-semibold text-blue-700">Evacuation Support</h3>
              <p className="text-sm mt-2 text-gray-700">Detailed maps and routes to safety, optimized for current conditions.</p>
            </div>
          </div>


          {/* Features Card - Full width */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">AI/ML-powered early warning</h3>
                  <p className="text-sm text-gray-600 mt-1">Advanced algorithms for GLOF detection</p>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Real-time risk assessment</h3>
                  <p className="text-sm text-gray-600 mt-1">Confidence scores for accurate predictions</p>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Interactive evacuation maps</h3>
                  <p className="text-sm text-gray-600 mt-1">Clear routes to safety during emergencies</p>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Offline functionality</h3>
                  <p className="text-sm text-gray-600 mt-1">Works in remote areas with limited connectivity</p>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Relief services coordination</h3>
                  <p className="text-sm text-gray-600 mt-1">Efficient management of aid resources</p>
                </div>
              </div>
             
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Volunteer management</h3>
                  <p className="text-sm text-gray-600 mt-1">Coordinate helpers during crisis situations</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>JeevanSetu - Bridging Technology and Safety in Disaster Management</p>
          <p className="mt-2">© {new Date().getFullYear()} JeevanSetu. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};


export default Us;

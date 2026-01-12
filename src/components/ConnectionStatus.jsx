import React from "react";

const ConnectionStatus = ({ status }) => {
  const isConnected = status === "connected";

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 mt-3 rounded-full shadow-md backdrop-blur-xl border transition 
        ${
          isConnected
            ? "bg-green-500/10 border-green-400/30"
            : "bg-red-500/10 border-red-400/30"
        }`}
    >
      {/* Dot */}
      <div
        className={`h-3 w-3 rounded-full animate-pulse ${
          isConnected ? "bg-green-800" : "bg-red-500"
        }`}
      ></div>

      {/* Text */}
      <span
        className={`text-sm font-medium ${
          isConnected ? "text-green-800" : "text-red-500"
        }`}
      >
        {isConnected
          ? "Connected to data source"
          : "Connection lost - attempting to reconnect..."}
      </span>
    </div>
  );
};

export default ConnectionStatus;



// css ka code

// import React from 'react';

// const ConnectionStatus = ({ status }) => {
//   return (
//     <div className="connection-status">
//       <div className={`connection-dot ${status === 'connected' ? 'connected' : 'disconnected'}`}></div>
//       <span>
//         {status === 'connected' 
//           ? 'Connected to data source' 
//           : 'Connection lost - attempting to reconnect'}
//       </span>
//     </div>
//   );
// };

// export default ConnectionStatus;
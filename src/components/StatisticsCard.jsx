import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const StatisticsCard = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            label: "Water Level (m)",
            data: [2.8, 3.1, 2.9, 3.5, 3.2, 3.8, 3.2],
            borderColor: "#0077CC",
            backgroundColor: "rgba(100, 181, 246, .7)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
          {
            label: "Rainfall (mm)",
            data: [35, 42, 28, 50, 38, 45, 42],
            borderColor: "#1CA656",
            backgroundColor: "rgba(46, 204, 113, 0.4)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#2c3e50",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              color: "black",
            },
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              color: "black",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-[#e1e9ea] backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-300 transition-all duration-300 hover:bg-[#d9e2e3] hover:-translate-y-1 hover:shadow-xl hover:border-gray-400">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-500">
        <h2 className="text-xl font-bold text-black">Current Statistics</h2>
        <i className="fas fa-chart-bar text-black text-2xl"></i>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col items-center bg-[#f0f3f3] rounded-xl p-4 shadow-md hover:shadow-lg transition border border-blue-100">
          <i className="fas fa-ruler-combined text-black text-xl mb-2"></i>
          <div className="text-lg font-bold text-black">{data.waterLevel}m</div>
          <div className="text-sm text-black">Water Level</div>
        </div>

        <div className="flex flex-col items-center bg-[#f0f3f3] rounded-xl p-4 shadow-md hover:shadow-lg transition border border-blue-100">
          <i className="fas fa-tint text-black text-xl mb-2"></i>
          <div className="text-lg font-bold text-black">{data.rainfall.toFixed(1)}mm</div>
          <div className="text-sm text-black">Rainfall (24h)</div>
        </div>

        <div className="flex flex-col items-center bg-[#f0f3f3] rounded-xl p-4 shadow-md hover:shadow-lg transition border border-blue-100">
          <i className="fas fa-exclamation-triangle text-black text-xl mb-2"></i>
          <div className="text-lg font-bold text-black">{data.affectedAreas}</div>
          <div className="text-sm text-black">Affected Areas</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[320px] w-full rounded-xl overflow-hidden bg-[#f0f3f3] p-2 border border-blue-100">
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Last Updated */}
      <div className="text-right text-m text-black mt-4">
        Last updated:{" "}
        <span className="font-medium">{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default StatisticsCard;



// css ka code

// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const StatisticsCard = ({ data }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }
    
//     const ctx = chartRef.current.getContext('2d');
//     chartInstance.current = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//         datasets: [{
//           label: 'Water Level (m)',
//           data: [2.8, 3.1, 2.9, 3.5, 3.2, 3.8, 3.2],
//           borderColor: '#4facfe',
//           backgroundColor: 'rgba(79, 172, 254, 0.2)',
//           borderWidth: 2,
//           tension: 0.4,
//           fill: true
//         }, {
//           label: 'Rainfall (mm)',
//           data: [35, 42, 28, 50, 38, 45, 42],
//           borderColor: '#00f2fe',
//           backgroundColor: 'rgba(0, 242, 254, 0.2)',
//           borderWidth: 2,
//           tension: 0.4,
//           fill: true
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             labels: {
//               color: '#fff'
//             }
//           }
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             grid: {
//               color: 'rgba(255, 255, 255, 0.1)'
//             },
//             ticks: {
//               color: '#fff'
//             }
//           },
//           x: {
//             grid: {
//               color: 'rgba(255, 255, 255, 0.1)'
//             },
//             ticks: {
//               color: '#fff'
//             }
//           }
//         }
//       }
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h2>Current Statistics</h2>
//         <i className="fas fa-chart-bar"></i>
//       </div>
//       <div className="stats">
//         <div className="stat-box">
//           <i className="fas fa-ruler-combined"></i>
//           <div className="stat-value">{data.waterLevel}m</div>
//           <div className="stat-label">Water Level</div>
//         </div>
//         <div className="stat-box">
//           <i className="fas fa-tint"></i>
//           <div className="stat-value">{data.rainfall}mm</div>
//           <div className="stat-label">Rainfall (24h)</div>
//         </div>
//         <div className="stat-box">
//           <i className="fas fa-exclamation-triangle"></i>
//           <div className="stat-value">{data.affectedAreas}</div>
//           <div className="stat-label">Affected Areas</div>
//         </div>
//       </div>
//       <div className="chart-container">
//         <canvas ref={chartRef}></canvas>
//       </div>
//       <div className="last-updated">Last updated: <span>{new Date().toLocaleTimeString()}</span></div>
//     </div>
//   );
// };

// export default StatisticsCard;
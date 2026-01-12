import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const WaterLevelCard = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const generateTimeLabels = () => {
      const labels = [];
      const now = new Date();
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(time.getHours() + ":00");
      }
      return labels;
    };

    const timeLabels = generateTimeLabels();

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: "Water Level (meters)",
            data: data.waterLevelData,
            borderColor: "#0077CC",
            backgroundColor: "rgba(100, 181, 246, .7)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        plugins: {
          legend: {
            labels: {
              color: "black",
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
              maxTicksLimit: 12,
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
  }, [data.waterLevelData]);

  return (
    // <div className="bg-[#e1e9ea] backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-b-gray-500">
    <div className="bg-[#e1e9ea] backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-300 
  transition-all duration-300 
  hover:bg-[#d9e2e3] hover:-translate-y-1 hover:shadow-xl hover:border-gray-400">


      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-black">
          Water Level Monitoring
        </h2>
        <i className="fas fa-water text-cyan-400 text-2xl"></i>
      </div>

      {/* Chart */}
      <div className="relative h-[320px] w-full rounded-xl overflow-hidden">
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Last Updated */}
      <div className="text-right text-m text-black mt-6">
        Last updated:{" "}
        <span className="font-medium">{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default WaterLevelCard;








// css ka code

// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const WaterLevelCard = ({ data }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     // Generate time labels for the last 24 hours
//     const generateTimeLabels = () => {
//       const labels = [];
//       const now = new Date();
//       for (let i = 23; i >= 0; i--) {
//         const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
//         labels.push(time.getHours() + ':00');
//       }
//       return labels;
//     };

//     const timeLabels = generateTimeLabels();
    
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }
    
//     const ctx = chartRef.current.getContext('2d');
//     chartInstance.current = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: timeLabels,
//         datasets: [{
//           label: 'Water Level (meters)',
//           data: data.waterLevelData,
//           borderColor: '#4facfe',
//           backgroundColor: 'rgba(79, 172, 254, 0.2)',
//           borderWidth: 2,
//           tension: 0.4,
//           fill: true
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: {
//           duration: 0
//         },
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
//               color: '#fff',
//               maxTicksLimit: 12
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
//   }, [data.waterLevelData]);

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h2>Water Level Monitoring</h2>
//         <i className="fas fa-water"></i>
//       </div>
//       <div className="chart-container">
//         <canvas ref={chartRef}></canvas>
//       </div>
      
//       <div className="last-updated">Last updated: <span>{new Date().toLocaleTimeString()}</span></div>
//     </div>
//   );
// };

// export default WaterLevelCard;
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const RainfallCard = ({ data }) => {
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
      type: "bar",
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: "Rainfall (mm)",
            data: data.rainfallData,
            backgroundColor: "rgba(0, 48, 135, 0.6)", // same tone as WaterLevelCard
            borderColor: "#003087",
            borderWidth: 1.5,
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
              color: "rgba(0, 0, 0, 0.1)", // same as WaterLevelCard
            },
            ticks: {
              color: "black",
            },
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.1)", // same as WaterLevelCard
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
  }, [data.rainfallData]);

  return (
    // <div className="bg-[#e1e9ea] backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gray-500">
    <div className="bg-[#e1e9ea] backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-300 
  transition-all duration-300 
  hover:bg-[#d7e0e1] hover:-translate-y-1 hover:shadow-xl hover:border-gray-400">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-black">Rainfall Measurement</h2>
        <i className="fas fa-cloud-rain text-cyan-400 text-2xl"></i>
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

export default RainfallCard;








// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const RainfallCard = ({ data }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     const generateTimeLabels = () => {
//       const labels = [];
//       const now = new Date();
//       for (let i = 23; i >= 0; i--) {
//         const time = new Date(now.getTime() - i * 60 * 60 * 1000);
//         labels.push(time.getHours() + ":00");
//       }
//       return labels;
//     };

//     const timeLabels = generateTimeLabels();

//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const ctx = chartRef.current.getContext("2d");
//     chartInstance.current = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: timeLabels,
//         datasets: [
//           {
//             label: "Rainfall (mm)",
//             data: data.rainfallData,
//             backgroundColor: "rgba(0, 242, 254, 0.5)",
//             borderColor: "rgba(0, 242, 254, 1)",
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: {
//           duration: 0,
//         },
//         plugins: {
//           legend: {
//             labels: {
//               color: "black",
//             },
//           },
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             grid: {
//               color: "rgba(255, 255, 255, 0.1)",
//             },
//             ticks: {
//               color: "black",
//             },
//           },
//           x: {
//             grid: {
//               color: "rgba(255, 255, 255, 0.1)",
//             },
//             ticks: {
//               color: "black",
//               maxTicksLimit: 12,
//             },
//           },
//         },
//       },
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [data.rainfallData]);

//   return (
//     <div className="bg-[#d4dedf] backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-cyan-400/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-400/40">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
//         <h2 className="text-xl font-semibold text-black">Rainfall Measurement</h2>
//         <i className="fas fa-cloud-rain text-cyan-400 text-2xl"></i>
//       </div>

//       {/* Chart */}
//       <div className="relative h-[320px] w-full rounded-xl overflow-hidden">
//         <canvas ref={chartRef}></canvas>
//       </div>

//       {/* Last Updated */}
//       <div className="text-right text-sm text-gray-300/80 mt-4">
//         Last updated:{" "}
//         <span className="font-medium">{new Date().toLocaleTimeString()}</span>
//       </div>
//     </div>
//   );
// };

// export default RainfallCard;







// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const RainfallCard = ({ data }) => {
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
//       type: 'bar',
//       data: {
//         labels: timeLabels,
//         datasets: [{
//           label: 'Rainfall (mm)',
//           data: data.rainfallData,
//           backgroundColor: 'rgba(0, 242, 254, 0.5)',
//           borderColor: 'rgba(0, 242, 254, 1)',
//           borderWidth: 1
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
//   }, [data.rainfallData]);

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h2>Rainfall Measurement</h2>
//         <i className="fas fa-cloud-rain"></i>
//       </div>
//       <div className="chart-container">
//         <canvas ref={chartRef}></canvas>
//       </div>
//       <div className="last-updated">Last updated: <span>{new Date().toLocaleTimeString()}</span></div>
//     </div>
//   );
// };

// export default RainfallCard;
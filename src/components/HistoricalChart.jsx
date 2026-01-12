import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HistoricalChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [{
          label: 'Water Level (m)',
          data: [2.8, 3.1, 2.9, 3.5, 3.2, 3.8, 3.2],
          borderColor: '#4facfe',
          backgroundColor: 'rgba(79, 172, 254, 0.2)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }, {
          label: 'Rainfall (mm)',
          data: [35, 42, 28, 50, 38, 45, 42],
          borderColor: '#00f2fe',
          backgroundColor: 'rgba(0, 242, 254, 0.2)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default HistoricalChart;
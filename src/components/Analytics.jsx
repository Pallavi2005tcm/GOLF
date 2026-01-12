import React, { useState, useEffect, useCallback } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- Status Indicator Component ---
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    Safe: { color: "#4caf50", icon: "✅" },
    Warning: { color: "#ff9800", icon: "⚠️" },
    Critical: { color: "#f44336", icon: "🚨" }
  };

  const { color, icon } = statusConfig[status] || statusConfig.Safe;

  return (
    <div className="flex items-center justify-center">
      <span className="text-2xl mr-2">{icon}</span>
      <span className="font-bold" style={{ color }}>{status}</span>
    </div>
  );
};

// --- Metric Card Component ---
const MetricCard = ({ title, value, unit, trend, color, icon }) => {
  const trendArrow = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";
  const trendColor = trend > 0 ? "#f44336" : trend < 0 ? "#4caf50" : "#757575";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-between h-full">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-600 mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-1" style={{ color }}>
        {value}{unit}
      </div>
      <div className="text-sm" style={{ color: trendColor }}>
        {trendArrow} {Math.abs(trend).toFixed(1)}
      </div>
    </div>
  );
};

// --- Alert Banner Component ---
const AlertBanner = ({ risk, riskScore, lastUpdated }) => {
  const alertConfig = {
    Safe: { 
      bg: "bg-green-100", 
      border: "border-green-300", 
      text: "text-green-800",
      message: "No immediate threat detected. Conditions are stable."
    },
    Warning: { 
      bg: "bg-yellow-100", 
      border: "border-yellow-300", 
      text: "text-yellow-800",
      message: "Elevated risk detected. Monitor conditions closely."
    },
    Critical: { 
      bg: "bg-red-100", 
      border: "border-red-300", 
      text: "text-red-800",
      message: "Critical risk level! Immediate action may be required."
    }
  };

  const { bg, border, text, message } = alertConfig[risk] || alertConfig.Safe;

  return (
    <div className={`rounded-lg border ${border} ${bg} p-4 mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <StatusIndicator status={risk} />
          <div className="ml-4">
            <h3 className={`font-bold text-lg ${text}`}>
              Risk Score: {riskScore.toFixed(1)}
            </h3>
            <p className={text}>{message}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
};

// --- WebSocket Simulation Hook ---
const useWebSocketSimulation = (onMessage) => {
  useEffect(() => {
    // Simulate WebSocket connection
    const simulateWebSocket = () => {
      // Generate new data every 5 seconds (simulating real-time updates)
      const interval = setInterval(() => {
        const now = new Date();
        const data = {
          type: "metrics_update",
          timestamp: now.toISOString(),
          data: {
            lake_area: +(1.8 + Math.random() * 1).toFixed(2),
            water_level: +(48 + Math.random() * 20).toFixed(2),
            rainfall: +(Math.random() * 20).toFixed(1),
            snow_melt: +(Math.random() * 1).toFixed(2)
          }
        };
        onMessage(data);
      }, 5000);

      return () => clearInterval(interval);
    };

    const cleanup = simulateWebSocket();
    return cleanup;
  }, [onMessage]);
};

// --- Main Dashboard Component ---
export default function EnhancedAnalyticsDashboard() {
  const [metrics, setMetrics] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  // Calculate risk based on metrics
  const calculateRisk = useCallback((data) => {
    const { water_level, rainfall, snow_melt } = data;
    const wl = (water_level / 70) * 100;
    const rf = (rainfall / 20) * 100;
    const sm = snow_melt * 100;
    const riskScore = wl * 0.5 + rf * 0.3 + sm * 0.2;
    
    let riskLabel = "Safe";
    if (riskScore > 70) riskLabel = "Critical";
    else if (riskScore > 40) riskLabel = "Warning";
    
    return { ...data, riskScore, riskLabel };
  }, []);

  // WebSocket message handler
  const handleWebSocketMessage = useCallback((message) => {
    if (message.type === "metrics_update") {
      const newData = calculateRisk(message.data);
      newData.timestamp = message.timestamp;
      newData.date = new Date(message.timestamp).toLocaleTimeString();
      
      setCurrentData(newData);
      setMetrics(prev => {
        const updated = [newData, ...prev];
        return updated.slice(0, 15); // Keep last 15 readings
      });
    }
  }, [calculateRisk]);

  // Initialize with some data
  useEffect(() => {
    const initialData = calculateRisk({
      lake_area: +(1.8 + Math.random() * 1).toFixed(2),
      water_level: +(48 + Math.random() * 20).toFixed(2),
      rainfall: +(Math.random() * 20).toFixed(1),
      snow_melt: +(Math.random() * 1).toFixed(2)
    });
    initialData.timestamp = new Date().toISOString();
    initialData.date = new Date().toLocaleTimeString();
    
    setCurrentData(initialData);
    setMetrics([initialData]);
  }, [calculateRisk]);

  // Start WebSocket simulation
  useWebSocketSimulation(handleWebSocketMessage);

  if (!currentData) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl">Loading dashboard data...</div>
    </div>
  );

  // Calculate trends (difference from previous reading)
  const trends = {
    water_level: metrics.length > 1 ? currentData.water_level - metrics[1].water_level : 0,
    rainfall: metrics.length > 1 ? currentData.rainfall - metrics[1].rainfall : 0,
    snow_melt: metrics.length > 1 ? currentData.snow_melt - metrics[1].snow_melt : 0,
    riskScore: metrics.length > 1 ? currentData.riskScore - metrics[1].riskScore : 0
  };

  // Chart data configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const waterLevelData = {
    labels: metrics.map(d => d.date).reverse(),
    datasets: [{
      label: "Water Level (m)",
      data: metrics.map(d => d.water_level).reverse(),
      borderColor: "#0077b6",
      backgroundColor: "rgba(0, 119, 182, 0.1)",
      fill: true,
      tension: 0.4
    }]
  };

  const rainfallData = {
    labels: metrics.map(d => d.date).reverse(),
    datasets: [{
      label: "Rainfall (mm)",
      data: metrics.map(d => d.rainfall).reverse(),
      backgroundColor: "rgba(33, 158, 188, 0.7)",
    }]
  };

  const riskData = {
    labels: metrics.map(d => d.date).reverse(),
    datasets: [{
      label: "Risk Score",
      data: metrics.map(d => d.riskScore).reverse(),
      borderColor: "#d00000",
      backgroundColor: "rgba(208, 0, 0, 0.1)",
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            🌊 Glacier Flood Risk Dashboard
          </h1>
          {/* <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-black">
              {isConnected ? 'Live data connected' : 'Disconnected'} • Updated every 5 seconds
            </span>
          </div> */}
        </div>

        {/* Alert Banner */}
        <AlertBanner 
          risk={currentData.riskLabel} 
          riskScore={currentData.riskScore}
          lastUpdated={new Date(currentData.timestamp).toLocaleTimeString()}
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <MetricCard 
            title="Water Level" 
            value={currentData.water_level} 
            unit="m" 
            trend={trends.water_level}
            color="#0077b6"
            icon="💧"
          />
          <MetricCard 
            title="Rainfall" 
            value={currentData.rainfall} 
            unit="mm" 
            trend={trends.rainfall}
            color="#219ebc"
            icon="🌧️"
          />
          <MetricCard 
            title="Snow Melt" 
            value={currentData.snow_melt} 
            unit="" 
            trend={trends.snow_melt}
            color="#8ecae6"
            icon="❄️"
          />
          <MetricCard 
            title="Risk Index" 
            value={currentData.riskScore.toFixed(1)} 
            unit="" 
            trend={trends.riskScore}
            color={currentData.riskLabel === "Critical" ? "#d00000" : currentData.riskLabel === "Warning" ? "#ff9800" : "#4caf50"}
            icon="📊"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-lg text-black font-semibold mb-4">Water Level Trend</h3>
            <div className="h-72">
              <Line data={waterLevelData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Rainfall Measurement</h3>
            <div className="h-72">
              <Bar data={rainfallData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md mb-8">
          <h3 className="text-lg text-black font-semibold mb-4">Risk Score Evolution</h3>
          <div className="h-72">
            <Line data={riskData} options={chartOptions} />
          </div>
        </div>

        {/* Current Data Table */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Latest Readings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lake Area (km²)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Level (m)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rainfall (mm)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Snow Melt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(currentData.timestamp).toLocaleTimeString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currentData.lake_area}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currentData.water_level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currentData.rainfall}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currentData.snow_melt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIndicator status={currentData.riskLabel} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
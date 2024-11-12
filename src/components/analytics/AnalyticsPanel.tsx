import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useSurveillanceStore } from '../../store/surveillanceStore';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const AnalyticsPanel: React.FC = () => {
  const { analytics } = useSurveillanceStore();
  
  const chartData = {
    labels: analytics.detectionHistory
      .slice(-10)
      .map(d => format(d.timestamp, 'HH:mm:ss')),
    datasets: [
      {
        label: 'Detections Over Time',
        data: analytics.detectionHistory
          .slice(-10)
          .map((_, index) => index + 1),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800">Total Detections</h3>
          <p className="text-2xl font-bold text-blue-900">{analytics.totalDetections}</p>
        </div>
        
        {Object.entries(analytics.alertsByType).map(([type, count]) => (
          <div key={type} className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-green-800">
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </h3>
            <p className="text-2xl font-bold text-green-900">{count}</p>
          </div>
        ))}
      </div>

      <div className="h-64">
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};
import React from 'react';
import { format } from 'date-fns';
import { useSurveillanceStore } from '../store/surveillanceStore';

export const DetectionList: React.FC = () => {
  const { detections } = useSurveillanceStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Recent Detections</h2>
      <div className="space-y-2">
        {detections.slice().reverse().map((detection) => (
          <div
            key={detection.id}
            className={`p-3 rounded-lg ${
              detection.severity === 'high'
                ? 'bg-red-100'
                : detection.severity === 'medium'
                ? 'bg-yellow-100'
                : 'bg-green-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{detection.label}</span>
              <span className="text-sm text-gray-600">
                {format(detection.timestamp, 'HH:mm:ss')}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Confidence: {Math.round(detection.confidence * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
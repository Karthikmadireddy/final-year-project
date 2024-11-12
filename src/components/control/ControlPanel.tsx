import React from 'react';
import { useSurveillanceStore } from '../../store/surveillanceStore';

export const ControlPanel: React.FC = () => {
  const { alertConfig, updateAlertConfig, isRecording, toggleRecording } = useSurveillanceStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Control Panel</h2>
      
      <div className="space-y-4">
        <div>
          <button
            onClick={toggleRecording}
            className={`w-full py-2 px-4 rounded-lg ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white font-semibold transition-colors`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Minimum Confidence ({Math.round(alertConfig.minConfidence * 100)}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={alertConfig.minConfidence * 100}
            onChange={(e) =>
              updateAlertConfig({
                minConfidence: Number(e.target.value) / 100,
              })
            }
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          {[
            {
              label: 'Person Detection',
              key: 'enablePersonDetection' as const,
            },
            {
              label: 'Object Detection',
              key: 'enableObjectDetection' as const,
            },
            {
              label: 'Behavior Analysis',
              key: 'enableBehaviorAnalysis' as const,
            },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={alertConfig[key]}
                onChange={(e) =>
                  updateAlertConfig({
                    [key]: e.target.checked,
                  })
                }
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor={key} className="ml-2 text-sm text-gray-700">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
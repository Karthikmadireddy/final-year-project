import React from 'react';
import { VideoFeed } from './components/video/VideoFeed';
import { DetectionList } from './components/detection/DetectionList';
import { ControlPanel } from './components/control/ControlPanel';
import { AnalyticsPanel } from './components/analytics/AnalyticsPanel';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Bank Security AI Surveillance System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <VideoFeed />
            <AnalyticsPanel />
            <DetectionList />
          </div>
          
          <div>
            <ControlPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
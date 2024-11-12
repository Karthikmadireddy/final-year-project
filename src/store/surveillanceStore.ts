import create from 'zustand';
import { Detection, AlertConfig, AnalyticsData } from '../types';
import { sampleDetections } from '../data/sampleData';

interface SurveillanceState {
  detections: Detection[];
  alertConfig: AlertConfig;
  analytics: AnalyticsData;
  isRecording: boolean;
  addDetection: (detection: Detection) => void;
  updateAlertConfig: (config: Partial<AlertConfig>) => void;
  toggleRecording: () => void;
}

export const useSurveillanceStore = create<SurveillanceState>((set) => ({
  detections: [...sampleDetections],
  alertConfig: {
    minConfidence: 0.6,
    enablePersonDetection: true,
    enableObjectDetection: true,
    enableBehaviorAnalysis: true,
    alertThreshold: 0.8,
  },
  analytics: {
    totalDetections: sampleDetections.length,
    alertsByType: sampleDetections.reduce((acc, det) => ({
      ...acc,
      [det.type]: (acc[det.type] || 0) + 1
    }), {} as Record<string, number>),
    detectionHistory: [...sampleDetections],
  },
  isRecording: false,
  
  addDetection: (detection) => 
    set((state) => ({
      detections: [...state.detections, detection],
      analytics: {
        ...state.analytics,
        totalDetections: state.analytics.totalDetections + 1,
        alertsByType: {
          ...state.analytics.alertsByType,
          [detection.type]: (state.analytics.alertsByType[detection.type] || 0) + 1
        },
        detectionHistory: [...state.analytics.detectionHistory, detection],
      },
    })),
    
  updateAlertConfig: (config) =>
    set((state) => ({
      alertConfig: { ...state.alertConfig, ...config },
    })),
    
  toggleRecording: () =>
    set((state) => ({
      isRecording: !state.isRecording,
    })),
}));
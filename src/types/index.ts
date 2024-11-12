export interface Detection {
  id: string;
  timestamp: Date;
  type: 'person' | 'object' | 'behavior';
  confidence: number;
  bbox: [number, number, number, number];
  label: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AlertConfig {
  minConfidence: number;
  enablePersonDetection: boolean;
  enableObjectDetection: boolean;
  enableBehaviorAnalysis: boolean;
  alertThreshold: number;
}

export interface AnalyticsData {
  totalDetections: number;
  alertsByType: Record<string, number>;
  detectionHistory: Detection[];
}
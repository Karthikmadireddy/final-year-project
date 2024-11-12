import { Detection } from '../types';

export const sampleDetections: Detection[] = [
  {
    id: 'det_001',
    timestamp: new Date('2023-09-15T09:15:23'),
    type: 'person',
    confidence: 0.95,
    bbox: [120, 150, 80, 200],
    label: 'Person near ATM',
    severity: 'low'
  },
  {
    id: 'det_002',
    timestamp: new Date('2023-09-15T09:16:45'),
    type: 'behavior',
    confidence: 0.88,
    bbox: [200, 100, 100, 220],
    label: 'Suspicious loitering',
    severity: 'medium'
  },
  {
    id: 'det_003',
    timestamp: new Date('2023-09-15T09:18:12'),
    type: 'object',
    confidence: 0.92,
    bbox: [300, 250, 40, 40],
    label: 'Unattended bag',
    severity: 'high'
  },
  {
    id: 'det_004',
    timestamp: new Date('2023-09-15T09:20:00'),
    type: 'person',
    confidence: 0.97,
    bbox: [150, 180, 90, 210],
    label: 'Multiple people gathering',
    severity: 'medium'
  },
  {
    id: 'det_005',
    timestamp: new Date('2023-09-15T09:22:30'),
    type: 'behavior',
    confidence: 0.85,
    bbox: [280, 160, 70, 180],
    label: 'Running in lobby',
    severity: 'medium'
  }
];
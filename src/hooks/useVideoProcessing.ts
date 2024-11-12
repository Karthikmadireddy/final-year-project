import { useCallback, useRef } from 'react';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { Detection } from '../types';
import { useSurveillanceStore } from '../store/surveillanceStore';

export const useVideoProcessing = () => {
  const frameRef = useRef<number>();
  const { addDetection, alertConfig } = useSurveillanceStore();

  const processFrame = useCallback(async (
    model: cocossd.ObjectDetection,
    video: HTMLVideoElement
  ) => {
    const predictions = await model.detect(video);
    
    return predictions
      .filter(pred => pred.score >= alertConfig.minConfidence)
      .map(pred => ({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        type: 'person',
        confidence: pred.score,
        bbox: pred.bbox as [number, number, number, number],
        label: pred.class,
        severity: pred.score > 0.8 ? 'high' : 'medium',
      } as Detection));
  }, [alertConfig.minConfidence]);

  const startProcessing = useCallback(async (
    model: cocossd.ObjectDetection,
    video: HTMLVideoElement
  ) => {
    const detect = async () => {
      const detections = await processFrame(model, video);
      detections.forEach(addDetection);
      frameRef.current = requestAnimationFrame(detect);
    };

    await detect();
  }, [processFrame, addDetection]);

  const stopProcessing = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
  }, []);

  return { startProcessing, stopProcessing };
};
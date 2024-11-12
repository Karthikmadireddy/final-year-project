import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { useSurveillanceStore } from '../store/surveillanceStore';
import { Detection } from '../types';
import { loadCocoSSDModel } from '../utils/tensorflow';

export const VideoFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
  const { addDetection, isRecording, alertConfig } = useSurveillanceStore();

  const runDetection = async (detectionModel: cocossd.ObjectDetection) => {
    if (!webcamRef.current?.video || !canvasRef.current) return;

    const video = webcamRef.current.video;
    const predictions = await detectionModel.detect(video);

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#00FF00';
    ctx.font = '16px Arial';

    predictions.forEach((prediction) => {
      if (prediction.score >= alertConfig.minConfidence) {
        const detection: Detection = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          type: 'person',
          confidence: prediction.score,
          bbox: prediction.bbox as [number, number, number, number],
          label: prediction.class,
          severity: prediction.score > 0.8 ? 'high' : 'medium',
        };

        addDetection(detection);

        const [x, y, width, height] = prediction.bbox;
        ctx.strokeRect(x, y, width, height);
        ctx.fillText(
          `${prediction.class} ${Math.round(prediction.score * 100)}%`,
          x,
          y > 10 ? y - 5 : 10
        );
      }
    });
  };

  useEffect(() => {
    let animationId: number;

    const initializeModel = async () => {
      try {
        const loadedModel = await loadCocoSSDModel();
        setModel(loadedModel);
      } catch (error) {
        console.error('Failed to initialize model:', error);
      }
    };

    initializeModel();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  useEffect(() => {
    let animationId: number;

    const detectFrame = async () => {
      if (isRecording && model) {
        await runDetection(model);
      }
      animationId = requestAnimationFrame(detectFrame);
    };

    if (model) {
      detectFrame();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRecording, model]);

  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        className="rounded-lg shadow-lg"
        audio={false}
        width={640}
        height={480}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        width={640}
        height={480}
      />
    </div>
  );
};
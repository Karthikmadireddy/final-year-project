import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useSurveillanceStore } from '../../store/surveillanceStore';
import { useDetectionModel } from '../../hooks/useDetectionModel';
import { useVideoProcessing } from '../../hooks/useVideoProcessing';
import { DetectionCanvas } from './DetectionCanvas';

const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 480;

export const VideoFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const { isRecording } = useSurveillanceStore();
  const { model, isLoading, error } = useDetectionModel();
  const { startProcessing, stopProcessing } = useVideoProcessing();

  useEffect(() => {
    if (!model || !webcamRef.current?.video || !isRecording) {
      stopProcessing();
      return;
    }

    startProcessing(model, webcamRef.current.video);
    return () => stopProcessing();
  }, [model, isRecording, startProcessing, stopProcessing]);

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">
        Failed to initialize video detection: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-lg bg-blue-100 p-4 text-blue-700">
        Initializing video detection...
      </div>
    );
  }

  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        className="rounded-lg shadow-lg"
        audio={false}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <DetectionCanvas
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        detections={[]}
      />
    </div>
  );
};
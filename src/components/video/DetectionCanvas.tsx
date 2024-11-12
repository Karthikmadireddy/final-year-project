import React, { useRef, useEffect } from 'react';
import { Detection } from '../../types';

interface DetectionCanvasProps {
  width: number;
  height: number;
  detections: Detection[];
}

export const DetectionCanvas: React.FC<DetectionCanvasProps> = ({ width, height, detections }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#00FF00';
    ctx.font = '16px Arial';

    detections.forEach(detection => {
      const [x, y, w, h] = detection.bbox;
      ctx.strokeRect(x, y, w, h);
      ctx.fillText(
        `${detection.label} ${Math.round(detection.confidence * 100)}%`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  }, [detections, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0"
      width={width}
      height={height}
    />
  );
};
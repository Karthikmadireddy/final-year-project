import { useState, useEffect } from 'react';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { loadCocoSSDModel } from '../utils/tensorflow';

export const useDetectionModel = () => {
  const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initModel = async () => {
      try {
        const loadedModel = await loadCocoSSDModel();
        setModel(loadedModel);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load model'));
      } finally {
        setIsLoading(false);
      }
    };

    initModel();
  }, []);

  return { model, isLoading, error };
};
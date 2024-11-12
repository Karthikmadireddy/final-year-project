import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

let isInitialized = false;

export const initializeTensorFlow = async () => {
  if (isInitialized) return;

  try {
    await tf.ready();
    await tf.setBackend('webgl');
    console.log('TensorFlow.js initialized with WebGL backend');
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize TensorFlow.js:', error);
    throw error;
  }
};

export const loadCocoSSDModel = async () => {
  if (!isInitialized) {
    await initializeTensorFlow();
  }

  try {
    const model = await cocossd.load({
      base: 'lite_mobilenet_v2'
    });
    console.log('COCO-SSD model loaded successfully');
    return model;
  } catch (error) {
    console.error('Failed to load COCO-SSD model:', error);
    throw error;
  }
};
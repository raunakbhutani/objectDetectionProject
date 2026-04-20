import { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

let interval;

export const useObjectDetection = (drawMesh) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadingModel, setLoadingModel] = useState(true);

  useEffect(() => {
    startPrediction();
    return () => {
      if (interval)
        clearInterval(interval);
    };
  }, []);

  const startPrediction = async () => {
    try {
      await tf.ready();
      const model = await cocoSsd.load();
      setLoadingModel(false);

      interval = setInterval(() => {
        detect(model);
      }, 100);
    } catch (error) {
      console.error('Error loading model:', error);
      setLoadingModel(false);
    }
  };

  const detect = async (model) => {
    // if (webcamRef && webcamRef.current && webcamRef.current.video) {
    //   const video = webcamRef.current.video;
    //   const videoWidth = video.videoWidth;
    //   const videoHeight = video.videoHeight;

    //   canvasRef.current.width = videoWidth;
    //   canvasRef.current.height = videoHeight;

    //   const predictions = await model.detect(video);
    //   const ctx = canvasRef.current.getContext('2d');

    //   drawMesh(predictions, ctx);
    // }
     if (
      webcamRef &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 // HAVE_ENOUGH_DATA
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Only proceed if video has valid dimensions
      if (videoWidth && videoHeight) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const predictions = await model.detect(video);
        const ctx = canvasRef.current.getContext('2d');

        drawMesh(predictions, ctx);
      }
  }
};

  return {
    webcamRef,
    canvasRef,
    loadingModel
  };
};

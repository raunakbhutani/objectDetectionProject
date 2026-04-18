import Webcam from 'react-webcam';
import './App.css';
import { useState } from 'react';
import { useObjectDetection } from './hooks/useObjectDetection';
import { drawBoundingBoxes } from './utils/canvasUtils';
import { createDetectionTracker } from './utils/detectionUtils';

const App = () => {
  const [detectionMap, setDetectionMap] = useState({});
  const { handleDetectionMap } = createDetectionTracker(detectionMap, setDetectionMap);

  const drawMesh = (predictions, ctx) => {
    drawBoundingBoxes(predictions, ctx, handleDetectionMap);
  };

  const { webcamRef, canvasRef, loadingModel } = useObjectDetection(drawMesh);

  return (
    <>
      <div className="parentContainer">
        <h1 className='appTitle'>🎯 Real Time Object Detection App</h1>
        {loadingModel ? <span>Loading Model...</span> : ''}
        <div className="videoWrapper">
          <Webcam ref={webcamRef} />
          <canvas ref={canvasRef} />
        </div>
      </div>
    </>
  );
};

export default App;

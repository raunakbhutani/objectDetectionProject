export const drawBoundingBoxes = (predictions, ctx, handleDetectionMap) => {
  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;
    const detectedObject = prediction.class;

    handleDetectionMap(detectedObject);

    ctx.strokeStyle = 'green';
    ctx.font = '18px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(detectedObject, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

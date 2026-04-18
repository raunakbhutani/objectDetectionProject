export const createDetectionTracker = (detectionMap, setDetectionMap) => {
  const handleDetectionMap = (detection) => {
    let obj = { ...(detectionMap || {}) };

    if (detectionMap?.[detection]) {
      obj[detection]++;
    } else {
      obj[detection] = 1;
    }

    setDetectionMap(obj);

    if (obj['presion'] > 1) {
      alert('person detected');
    }
  };

  return { handleDetectionMap };
};

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`loading-screen ${!active && progress === 100 ? "loaded" : ""}`}>
      <div className="spinner-container">
        <div className="spinner-ring" />
      </div>
      <div className="loading-text">Loading Atelier 3D Space...</div>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${Math.round(progress)}%` }} />
      </div>
    </div>
  );
};

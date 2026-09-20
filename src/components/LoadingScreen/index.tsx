import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

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
    <div className={`${styles.screen} ${!active && progress === 100 ? styles.loaded : ""}`}>
      <div className={styles.spinner}>
        <div className={styles.spinnerRing} />
      </div>
      <div className={styles.text}>Loading Atelier 3D Space...</div>
      <div className={styles.progressBar}>
        <div className={styles.progressBarFill} style={{ width: `${Math.round(progress)}%` }} />
      </div>
    </div>
  );
};

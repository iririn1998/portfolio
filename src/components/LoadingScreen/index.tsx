import { useLoadingScreen } from "./hooks/useLoadingScreen";
import styles from "./index.module.css";

export const LoadingScreen = () => {
  const { progress } = useLoadingScreen();

  return (
    <div className={styles.screen} role="status" aria-live="polite">
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

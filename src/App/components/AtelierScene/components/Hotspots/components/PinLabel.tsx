import type { HotspotConfig } from "../types/hotspot";
import styles from "../index.module.css";

type PinLabelProps = {
  spot: HotspotConfig;
  isVisible: boolean;
};

/** @scope .. */
export const PinLabel = ({ spot, isVisible }: PinLabelProps) => {
  return (
    <span className={styles.pinLabel} aria-hidden={!isVisible}>
      <span className={styles.pinLabelClip}>
        <span className={styles.pinLabelContent}>
          <span className={styles.labelText}>
            <span className={styles.labelTitle}>{spot.label}を見る</span>
            <span className={styles.labelHint}>{spot.detailHint}</span>
          </span>
          <span className={styles.labelArrow}>→</span>
        </span>
      </span>
    </span>
  );
};

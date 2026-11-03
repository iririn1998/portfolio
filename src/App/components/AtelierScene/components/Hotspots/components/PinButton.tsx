import { PinLabel } from "./PinLabel";
import type { HotspotConfig } from "../types/hotspot";
import styles from "../index.module.css";

type PinButtonProps = {
  spot: HotspotConfig;
  isFocused: boolean;
  onSelect: () => void;
  onOpenDetail: () => void;
};

/** @scope .. */
export const PinButton = ({ spot, isFocused, onSelect, onOpenDetail }: PinButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.pinBtn} ${isFocused ? styles.expanded : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        if (isFocused) {
          onOpenDetail();
        } else {
          onSelect();
        }
      }}
      aria-label={isFocused ? undefined : `${spot.label}にフォーカス`}
      title={isFocused ? undefined : `${spot.label} (クリックでフォーカス)`}
    >
      {/* Ripple animation rings */}
      <span className={styles.pinRipple} />
      <span className={`${styles.pinRipple} ${styles.rippleDelay}`} />

      <span className={styles.pinBadge}>
        <span className={styles.coreDot} />
        <span className={styles.pinIcon}>{spot.icon}</span>
      </span>

      {/* Label that unfolds from the pin once it is focused */}
      <PinLabel spot={spot} isVisible={isFocused} />
    </button>
  );
};

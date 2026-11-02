import type { HotspotConfig } from "../types";
import styles from "../index.module.css";

type PinButtonProps = {
  spot: HotspotConfig;
  onSelect: () => void;
  onHoverChange: (isHovered: boolean) => void;
};

/** @scope .. */
export const PinButton = ({ spot, onSelect, onHoverChange }: PinButtonProps) => {
  return (
    <button
      type="button"
      className={styles.pinBtn}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      aria-label={`${spot.label}にフォーカス`}
      title={`${spot.label} (クリックでフォーカス)`}
    >
      {/* Ripple animation rings */}
      <span className={styles.pinRipple} />
      <span className={`${styles.pinRipple} ${styles.rippleDelay}`} />

      {/* Minimalist icon pin badge (no text) */}
      <span className={styles.pinBadge}>
        <span className={styles.coreDot} />
        <span className={styles.pinIcon}>{spot.icon}</span>
      </span>
    </button>
  );
};

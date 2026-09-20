import { Html } from "@react-three/drei";
import { useMarkerScreenPosition } from "./hooks/useMarkerScreenPosition";
import { HOTSPOTS } from "../../constants";
import type { ScreenPosition, ViewPreset } from "../../types";
import styles from "./index.module.css";

type HotspotsProps = {
  currentPreset: ViewPreset;
  hoveredPreset: Exclude<ViewPreset, "overview"> | null;
  onSelectPreset: (preset: ViewPreset) => void;
  onHoverPreset: (preset: Exclude<ViewPreset, "overview"> | null) => void;
  onUpdateMarkerPos: (pos: ScreenPosition | null) => void;
};

export const Hotspots = ({
  currentPreset,
  hoveredPreset,
  onSelectPreset,
  onHoverPreset,
  onUpdateMarkerPos,
}: HotspotsProps) => {
  useMarkerScreenPosition(hoveredPreset, onUpdateMarkerPos);

  return (
    <group>
      {HOTSPOTS.map((spot) => {
        const isCurrentFocus = currentPreset === spot.id;
        const isHovered = hoveredPreset === spot.id;

        return (
          <group key={spot.id} position={spot.position}>
            <Html
              center
              distanceFactor={8}
              zIndexRange={[15, 0]}
              className={`${styles.markerWrap} ${isCurrentFocus ? styles.focused : ""} ${isHovered ? styles.hovered : ""}`}
            >
              <button
                type="button"
                className={styles.pinBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPreset(spot.id);
                }}
                onMouseEnter={() => onHoverPreset(spot.id)}
                onMouseLeave={() => onHoverPreset(null)}
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
            </Html>
          </group>
        );
      })}
    </group>
  );
};

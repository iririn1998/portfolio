import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
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
  const { camera, size } = useThree();
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  // Continuously project 3D marker coordinate to 2D screen coordinate in real time
  useFrame(() => {
    if (!hoveredPreset) {
      onUpdateMarkerPos(null);
      return;
    }

    const activeSpot = HOTSPOTS.find((s) => s.id === hoveredPreset);
    if (!activeSpot) {
      onUpdateMarkerPos(null);
      return;
    }

    tempVec.set(...activeSpot.position);
    tempVec.project(camera);

    // If point is behind camera, do not display connector line
    if (tempVec.z > 1) {
      onUpdateMarkerPos(null);
      return;
    }

    const screenX = ((tempVec.x + 1) * size.width) / 2;
    const screenY = ((-tempVec.y + 1) * size.height) / 2;

    onUpdateMarkerPos({ x: screenX, y: screenY });
  });

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

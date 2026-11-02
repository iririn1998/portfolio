import { Html } from "@react-three/drei";
import { PinButton } from "./components/PinButton";
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
              <PinButton
                spot={spot}
                onSelect={() => onSelectPreset(spot.id)}
                onHoverChange={(hovered) => onHoverPreset(hovered ? spot.id : null)}
              />
            </Html>
          </group>
        );
      })}
    </group>
  );
};

import { Html } from "@react-three/drei";
import { PinButton } from "./components/PinButton";
import { HOTSPOTS } from "./constants/hotspots";
import type { DetailPreset, ViewPreset } from "../../../../../types";
import styles from "./index.module.css";

type HotspotsProps = {
  currentPreset: ViewPreset;
  onSelectPreset: (preset: ViewPreset) => void;
  onOpenDetail: (preset: DetailPreset) => void;
};

/** @scope ../.. */
export const Hotspots = ({ currentPreset, onSelectPreset, onOpenDetail }: HotspotsProps) => {
  return (
    <group>
      {HOTSPOTS.map((spot) => (
        <group key={spot.id} position={spot.position}>
          {/* No distanceFactor: pins keep a fixed screen size so the focused one
              can unfold into a readable button while the camera zooms in. */}
          <Html center zIndexRange={[15, 0]} className={styles.markerWrap}>
            <PinButton
              spot={spot}
              isFocused={currentPreset === spot.id}
              onSelect={() => onSelectPreset(spot.id)}
              onOpenDetail={() => onOpenDetail(spot.id)}
            />
          </Html>
        </group>
      ))}
    </group>
  );
};

import { Html } from "@react-three/drei";
import { HOTSPOTS } from "../constants";
import type { ViewPreset } from "../types";

type HotspotsProps = {
  currentPreset: ViewPreset;
  onSelectPreset: (preset: ViewPreset) => void;
};

export const Hotspots = ({ currentPreset, onSelectPreset }: HotspotsProps) => {
  return (
    <group>
      {HOTSPOTS.map((spot) => {
        const isCurrentFocus = currentPreset === spot.id;

        return (
          <group key={spot.id} position={spot.position}>
            <Html
              center
              distanceFactor={8}
              zIndexRange={[15, 0]}
              className={`hotspot-wrapper ${isCurrentFocus ? "is-focused" : ""}`}
            >
              <button
                type="button"
                className="hotspot-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPreset(spot.id);
                }}
                aria-label={`${spot.label}を表示`}
                title={`クリックして${spot.label}にズーム`}
              >
                {/* Pulsing ripple waves to indicate clickability */}
                <span className="hotspot-ripple ripple-1" />
                <span className="hotspot-ripple ripple-2" />

                {/* Hotspot core capsule */}
                <span className="hotspot-capsule">
                  <span className="hotspot-indicator" />
                  <span className="hotspot-icon">{spot.icon}</span>
                  <span className="hotspot-text">
                    <span className="hotspot-title">{spot.label}</span>
                    <span className="hotspot-subtitle">{spot.subLabel}</span>
                  </span>
                  <span className="hotspot-arrow">›</span>
                </span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

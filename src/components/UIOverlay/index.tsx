import { VIEW_PRESETS } from "../../constants";
import type { ViewPreset } from "../../types";
import styles from "./index.module.css";

type UIOverlayProps = {
  currentPreset: ViewPreset;
  onSelectPreset: (preset: ViewPreset) => void;
};

export const UIOverlay = ({ currentPreset, onSelectPreset }: UIOverlayProps) => {
  return (
    <nav className={styles.overlay} aria-label="3D Camera Controls">
      {VIEW_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          className={`${styles.presetBtn} ${currentPreset === preset.id ? styles.active : ""}`}
          onClick={() => onSelectPreset(preset.id)}
        >
          {preset.label}
        </button>
      ))}
    </nav>
  );
};

import { VIEW_PRESETS } from "../constants";
import type { ViewPreset } from "../types";

type UIOverlayProps = {
  currentPreset: ViewPreset;
  onSelectPreset: (preset: ViewPreset) => void;
};

export const UIOverlay = ({ currentPreset, onSelectPreset }: UIOverlayProps) => {
  return (
    <nav className="controls-overlay glass-card" aria-label="3D Camera Controls">
      {VIEW_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          className={`view-preset-btn ${currentPreset === preset.id ? "active" : ""}`}
          onClick={() => onSelectPreset(preset.id)}
        >
          {preset.label}
        </button>
      ))}
    </nav>
  );
};

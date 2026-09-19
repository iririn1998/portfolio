import { VIEW_PRESETS } from "../constants";
import type { ViewPreset } from "../types";

type UIOverlayProps = {
  currentPreset: ViewPreset;
  onSelectPreset: (preset: ViewPreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onReset: () => void;
};

export const UIOverlay = ({
  currentPreset,
  onSelectPreset,
  autoRotate,
  onToggleAutoRotate,
  onReset,
}: UIOverlayProps) => {
  return (
    <>
      <header className="header-overlay glass-card">
        <div className="header-title-row">
          <span className="header-badge">3D Portfolio</span>
          <h1 className="header-title">Atelier</h1>
        </div>
        <p className="header-subtitle">Interactive Workspace Model</p>
      </header>

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

        <div className="divider" role="separator" />

        <button
          type="button"
          className={`icon-btn ${autoRotate ? "active" : ""}`}
          onClick={onToggleAutoRotate}
          title={autoRotate ? "自動回転を停止" : "自動回転を開始"}
        >
          <span>{autoRotate ? "⏸" : "▶"}</span>
          <span>{autoRotate ? "回転停止" : "自動回転"}</span>
        </button>

        <button type="button" className="icon-btn" onClick={onReset} title="初期視点にリセット">
          <span>↺</span>
          <span>リセット</span>
        </button>
      </nav>

      <div className="hint-overlay glass-card">
        <div className="hint-item">
          <span className="hint-icon">📍</span>
          <span>ピン: ホバーで詳細・クリックでズーム</span>
        </div>
        <div className="hint-item">
          <span className="hint-icon">🖱️</span>
          <span>ドラッグ: 回転</span>
        </div>
        <div className="hint-item">
          <span className="hint-icon">🔍</span>
          <span>スクロール: ズーム</span>
        </div>
        <div className="hint-item">
          <span className="hint-icon">👆</span>
          <span>右ドラッグ: 平行移動</span>
        </div>
      </div>
    </>
  );
};

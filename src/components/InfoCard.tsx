import { useEffect, useRef } from "react";
import type { HotspotConfig, ScreenPosition, ViewPreset } from "../types";

type InfoCardProps = {
  hotspot: HotspotConfig | null;
  visible: boolean;
  onSelectPreset: (preset: ViewPreset) => void;
  onHoverCard: (isHovering: boolean) => void;
  onAnchorPosChange: (pos: ScreenPosition | null) => void;
};

export const InfoCard = ({
  hotspot,
  visible,
  onSelectPreset,
  onHoverCard,
  onAnchorPosChange,
}: InfoCardProps) => {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible || !hotspot) {
      onAnchorPosChange(null);
      return;
    }

    const updateAnchor = () => {
      if (anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        onAnchorPosChange({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateAnchor();
    window.addEventListener("resize", updateAnchor);
    return () => {
      window.removeEventListener("resize", updateAnchor);
    };
  }, [visible, hotspot, onAnchorPosChange]);

  return (
    <aside
      className={`info-card glass-card ${visible && hotspot ? "is-active" : ""}`}
      onMouseEnter={() => onHoverCard(true)}
      onMouseLeave={() => onHoverCard(false)}
      aria-label={hotspot ? `${hotspot.label}の詳細情報` : undefined}
    >
      {/* Anchor point where connector dashed line attaches */}
      <span ref={anchorRef} className="info-card-anchor" />

      {hotspot && (
        <div className="info-card-content">
          <div className="info-card-header">
            <span className="info-card-icon">{hotspot.icon}</span>
            <div className="info-card-title-group">
              <h2 className="info-card-title">{hotspot.label}</h2>
              <span className="info-card-sub">{hotspot.subLabel}</span>
            </div>
          </div>
          <p className="info-card-desc">{hotspot.description}</p>
          <button
            type="button"
            className="info-card-zoom-btn"
            onClick={() => onSelectPreset(hotspot.id)}
          >
            <span>視点をフォーカス</span>
            <span className="info-card-btn-arrow">→</span>
          </button>
        </div>
      )}
    </aside>
  );
};

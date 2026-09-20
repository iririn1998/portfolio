import { useEffect, useRef } from "react";
import type { CardInfo, ScreenPosition, ViewPreset } from "../../types";

type InfoCardProps = {
  cardInfo: CardInfo;
  currentPreset: ViewPreset;
  showConnector: boolean;
  onSelectPreset: (preset: ViewPreset) => void;
  onAnchorPosChange: (pos: ScreenPosition | null) => void;
};

export const InfoCard = ({
  cardInfo,
  currentPreset,
  showConnector,
  onSelectPreset,
  onAnchorPosChange,
}: InfoCardProps) => {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
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
  }, [onAnchorPosChange]);

  const isCurrentView = currentPreset === cardInfo.id;
  const isOverview = cardInfo.id === "overview";

  return (
    <aside
      className="info-card glass-card is-always-visible"
      aria-label={`${cardInfo.label}の詳細情報`}
    >
      {/* Anchor point where connector dashed line attaches */}
      <span ref={anchorRef} className={`info-card-anchor ${showConnector ? "is-active" : ""}`} />

      <div className="info-card-content">
        <div className="info-card-header">
          <span className="info-card-icon">{cardInfo.icon}</span>
          <div className="info-card-title-group">
            <h2 className="info-card-title">{cardInfo.label}</h2>
            <span className="info-card-sub">{cardInfo.subLabel}</span>
          </div>
        </div>

        <p className="info-card-desc">{cardInfo.description}</p>

        {isOverview ? (
          <div className="info-card-guide">
            <span className="info-card-guide-dot" />
            <span>空間内のピンにカーソルを合わせて探索</span>
          </div>
        ) : (
          <button
            type="button"
            className={`info-card-zoom-btn ${isCurrentView ? "is-current" : ""}`}
            onClick={() => onSelectPreset(cardInfo.id)}
          >
            <span>{isCurrentView ? "現在のフォーカス視点" : "視点をフォーカス"}</span>
            <span className="info-card-btn-arrow">{isCurrentView ? "✓" : "→"}</span>
          </button>
        )}
      </div>
    </aside>
  );
};

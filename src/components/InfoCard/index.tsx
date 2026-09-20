import { useCardAnchorPosition } from "./hooks/useCardAnchorPosition";
import type { CardInfo, ScreenPosition, ViewPreset } from "../../types";
import styles from "./index.module.css";

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
  const anchorRef = useCardAnchorPosition(onAnchorPosChange);

  const isCurrentView = currentPreset === cardInfo.id;
  const isOverview = cardInfo.id === "overview";

  return (
    <aside className={styles.card} aria-label={`${cardInfo.label}の詳細情報`}>
      {/* Anchor point where connector dashed line attaches */}
      <span ref={anchorRef} className={`${styles.anchor} ${showConnector ? styles.active : ""}`} />

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.icon}>{cardInfo.icon}</span>
          <div className={styles.titleGroup}>
            <h2 className={styles.title}>{cardInfo.label}</h2>
            <span className={styles.sub}>{cardInfo.subLabel}</span>
          </div>
        </div>

        <p className={styles.desc}>{cardInfo.description}</p>

        {isOverview ? (
          <div className={styles.guide}>
            <span className={styles.guideDot} />
            <span>空間内のピンにカーソルを合わせて探索</span>
          </div>
        ) : (
          <button
            type="button"
            className={`${styles.zoomBtn} ${isCurrentView ? styles.current : ""}`}
            onClick={() => onSelectPreset(cardInfo.id)}
          >
            <span>{isCurrentView ? "現在のフォーカス視点" : "視点をフォーカス"}</span>
            <span className={styles.btnArrow}>{isCurrentView ? "✓" : "→"}</span>
          </button>
        )}
      </div>
    </aside>
  );
};

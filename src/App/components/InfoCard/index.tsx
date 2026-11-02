import { useCardAnchorPosition } from "./hooks/useCardAnchorPosition";
import type { CardInfo, ScreenPosition } from "../../../types";
import styles from "./index.module.css";

type InfoCardProps = {
  cardInfo: CardInfo;
  showConnector: boolean;
  onOpenDetail: () => void;
  onAnchorPosChange: (pos: ScreenPosition | null) => void;
};

/** @scope ../.. */
export const InfoCard = ({
  cardInfo,
  showConnector,
  onOpenDetail,
  onAnchorPosChange,
}: InfoCardProps) => {
  const anchorRef = useCardAnchorPosition(onAnchorPosChange);
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
          <button type="button" className={styles.detailBtn} onClick={onOpenDetail}>
            <span>詳細を見る</span>
            <span className={styles.btnArrow}>→</span>
          </button>
        )}
      </div>
    </aside>
  );
};

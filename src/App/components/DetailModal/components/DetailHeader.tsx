import type { DetailData } from "../types/detail";
import styles from "../index.module.css";

type DetailHeaderProps = {
  detail: DetailData;
  isOpen: boolean;
  onClose: () => void;
};

/** @scope .. */
export const DetailHeader = ({ detail, isOpen, onClose }: DetailHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <span className={styles.icon}>{detail.icon}</span>
        <div className={styles.titleGroup}>
          <h2 id="detail-modal-title" className={styles.title}>
            {detail.title}
          </h2>
          <span className={styles.sub}>{detail.subtitle}</span>
        </div>
      </div>
      <button
        key={isOpen ? "open" : "closed"}
        type="button"
        autoFocus={isOpen}
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="閉じる"
      >
        ✕
      </button>
    </header>
  );
};

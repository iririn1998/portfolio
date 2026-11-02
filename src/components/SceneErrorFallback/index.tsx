import AlertTriangleIcon from "../../assets/icons/alert-triangle.svg?react";
import RefreshIcon from "../../assets/icons/refresh.svg?react";
import { useSceneRetry } from "./hooks/useSceneRetry";
import styles from "./index.module.css";

type SceneErrorFallbackProps = {
  error: Error;
  onRetry: () => void;
};

export const SceneErrorFallback = ({ error, onRetry }: SceneErrorFallbackProps) => {
  const handleRetry = useSceneRetry(onRetry);

  return (
    <div className={styles.overlay} role="alert">
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <AlertTriangleIcon className={styles.icon} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>3D空間の読み込みに失敗しました</h2>
          <p className={styles.desc}>
            3Dモデルの取得または解析中にエラーが発生しました。
            ネットワーク接続をご確認いただくか、下のボタンから再試行してください。
          </p>
          {error.message && (
            <p className={styles.detail} title={error.message}>
              エラー詳細: {error.message}
            </p>
          )}
        </div>

        <button
          type="button"
          className={`${styles.retryBtn} scene-error-retry-btn`}
          onClick={handleRetry}
        >
          <RefreshIcon className={styles.btnIcon} aria-hidden="true" />
          再試行する
        </button>
      </div>
    </div>
  );
};

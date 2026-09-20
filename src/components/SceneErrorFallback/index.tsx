import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useCallback } from "react";
import styles from "./index.module.css";

type SceneErrorFallbackProps = {
  error: Error;
  onRetry: () => void;
};

export const SceneErrorFallback = ({ error, onRetry }: SceneErrorFallbackProps) => {
  const handleRetry = useCallback(() => {
    try {
      useGLTF.clear("/atelier.glb");
      THREE.Cache.clear();
    } catch {
      // Ignore cleanup error if already cleared
    }
    onRetry();
  }, [onRetry]);

  return (
    <div className={styles.overlay} role="alert">
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
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
          <svg
            className={styles.btnIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 21h5v-5" />
          </svg>
          再試行する
        </button>
      </div>
    </div>
  );
};

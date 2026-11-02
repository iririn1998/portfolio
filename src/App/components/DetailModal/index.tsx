import { useEffect, useState } from "react";
import { DETAIL_CONTENTS } from "./constants/details";
import type { DetailPreset, ViewPreset } from "../../../types";
import { DetailBody } from "./components/DetailBody";
import { DetailHeader } from "./components/DetailHeader";
import { ProfileBody } from "./components/ProfileBody";
import styles from "./index.module.css";

type DetailModalProps = {
  isOpen: boolean;
  preset: ViewPreset;
  onClose: () => void;
};

const resolveDetailPreset = (preset: ViewPreset): DetailPreset => {
  return preset === "overview" ? "desk" : preset;
};

/** @scope ../.. */
export const DetailModal = ({ isOpen, preset, onClose }: DetailModalProps) => {
  const [isPresent, setIsPresent] = useState(isOpen);
  const [displayPreset, setDisplayPreset] = useState(preset);

  // Keep the closing content stable even if navigation changes the selected card.
  if (isOpen && preset !== displayPreset) {
    setDisplayPreset(preset);
  }

  useEffect(() => {
    if (isOpen) {
      setIsPresent(true);
      return;
    }

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setIsPresent(false);
      return;
    }

    const timeout = window.setTimeout(() => setIsPresent(false), 250);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  if (!isOpen && !isPresent) {
    return null;
  }

  const detail = DETAIL_CONTENTS[resolveDetailPreset(displayPreset)];

  return (
    <div
      className={`${styles.backdrop} ${!isOpen ? styles.closing : ""}`}
      onClick={isOpen ? onClose : undefined}
      role="presentation"
      inert={!isOpen}
      aria-hidden={!isOpen}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (isOpen && e.key === "Escape") {
            e.preventDefault();
            onClose();
          }
        }}
      >
        <DetailHeader detail={detail} isOpen={isOpen} onClose={onClose} />

        {detail.id === "desk" ? <ProfileBody detail={detail} /> : <DetailBody detail={detail} />}
      </div>
    </div>
  );
};

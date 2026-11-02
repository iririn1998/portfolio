import { useEffect, useRef, useState } from "react";
import { DETAIL_CONTENTS } from "../../constants";
import type { DetailPreset, ViewPreset } from "../../types";
import styles from "./index.module.css";

type DetailModalProps = {
  isOpen: boolean;
  preset: ViewPreset;
  onClose: () => void;
};

const resolveDetailPreset = (preset: ViewPreset): DetailPreset => {
  return preset === "overview" ? "desk" : preset;
};

export const DetailModal = ({ isOpen, preset, onClose }: DetailModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
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

  useEffect(() => {
    if (isOpen) {
      // Focus the close button for accessibility when modal opens
      const frame = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

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
      >
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
            ref={closeButtonRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="閉じる"
          >
            ✕
          </button>
        </header>

        <div className={styles.body}>
          <p className={styles.lead}>{detail.lead}</p>

          {detail.sections.map((section) => (
            <section key={section.heading} className={styles.section}>
              <h3 className={styles.sectionHeading}>{section.heading}</h3>

              {section.paragraphs?.map((p) => (
                <p key={p} className={styles.paragraph}>
                  {p}
                </p>
              ))}

              {section.items && (
                <div className={styles.itemList}>
                  {section.items.map((item) => (
                    <div key={item.title} className={styles.itemCard}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      {item.description && <p className={styles.itemDesc}>{item.description}</p>}
                      {item.tags && item.tags.length > 0 && (
                        <div className={styles.tags}>
                          {item.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

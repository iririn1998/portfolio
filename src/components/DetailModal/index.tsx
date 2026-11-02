import { useEffect, useState } from "react";
import { DETAIL_CONTENTS } from "../../constants";
import type { DetailPreset, ViewPreset } from "../../types";
import styles from "./index.module.css";
import { profile } from "./profile";

type DetailModalProps = {
  isOpen: boolean;
  preset: ViewPreset;
  onClose: () => void;
};

const resolveDetailPreset = (preset: ViewPreset): DetailPreset => {
  return preset === "overview" ? "desk" : preset;
};

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

        {detail.id === "desk" ? (
          <div className={`${styles.body} ${styles.profileBody}`}>
            <section className={styles.profileSection}>
              <div className={styles.sectionLabel}>
                <h3>プロフィール</h3>
              </div>
              {detail.sections[0].paragraphs?.map((paragraph) => (
                <p className={styles.profileText} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
            <section className={styles.profileSection}>
              <div className={styles.sectionLabel}>
                <h3>経歴</h3>
              </div>
              {profile.career.length ? (
                <ol className={styles.timeline}>
                  {profile.career.map((entry) => (
                    <li key={`${entry.period}-${entry.title}`}>
                      <span>{entry.period}</span>
                      <div>
                        <h4>{entry.title}</h4>
                        {entry.description && <p>{entry.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className={styles.emptyText}>経歴は準備中です。</p>
              )}
            </section>
            <section className={styles.profileSection}>
              <div className={styles.sectionLabel}>
                <h3>スキル</h3>
              </div>
              {profile.skills.map((group) => (
                <div className={styles.skillGroup} key={group.category}>
                  <h4>{group.category}</h4>
                  <div className={styles.skillTags}>
                    {group.items.map((skill) => (
                      <span className={styles.skill} key={skill.name}>
                        {skill.icon && (
                          <img
                            src={`https://skillicons.dev/icons?i=${skill.icon}&theme=light`}
                            alt=""
                            width="32"
                            height="32"
                          />
                        )}
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
            <section className={styles.profileSection}>
              <div className={styles.sectionLabel}>
                <h3>リンク</h3>
              </div>
              <div className={styles.socialLinks}>
                {profile.links.map((link) =>
                  link.url ? (
                    <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
                      <span>{link.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <div className={styles.unsetLink} key={link.label}>
                      <span>{link.label}</span>
                      <small>準備中</small>
                    </div>
                  ),
                )}
              </div>
            </section>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

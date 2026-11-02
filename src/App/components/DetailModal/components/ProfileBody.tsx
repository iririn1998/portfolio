import type { ReactNode } from "react";
import type { DetailData } from "../types";
import styles from "../index.module.css";
import { profile } from "../profile";

type ProfileSectionProps = {
  label: string;
  children: ReactNode;
};

const ProfileSection = ({ label, children }: ProfileSectionProps) => {
  return (
    <section className={styles.profileSection}>
      <div className={styles.sectionLabel}>
        <h3>{label}</h3>
      </div>
      {children}
    </section>
  );
};

const CareerTimeline = () => {
  if (!profile.career.length) {
    return <p className={styles.emptyText}>経歴は準備中です。</p>;
  }

  return (
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
  );
};

type SkillGroupProps = {
  group: (typeof profile.skills)[number];
};

const SkillGroup = ({ group }: SkillGroupProps) => {
  return (
    <div className={styles.skillGroup}>
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
  );
};

const SocialLinks = () => {
  return (
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
  );
};

type ProfileBodyProps = {
  detail: DetailData;
};

/** @scope .. */
export const ProfileBody = ({ detail }: ProfileBodyProps) => {
  return (
    <div className={`${styles.body} ${styles.profileBody}`}>
      <ProfileSection label="プロフィール">
        {detail.sections[0].paragraphs?.map((paragraph) => (
          <p className={styles.profileText} key={paragraph}>
            {paragraph}
          </p>
        ))}
      </ProfileSection>
      <ProfileSection label="経歴">
        <CareerTimeline />
      </ProfileSection>
      <ProfileSection label="スキル">
        {profile.skills.map((group) => (
          <SkillGroup group={group} key={group.category} />
        ))}
      </ProfileSection>
      <ProfileSection label="リンク">
        <SocialLinks />
      </ProfileSection>
    </div>
  );
};

import type { DetailData, DetailItem } from "../types/detail";
import styles from "../index.module.css";

type ItemCardProps = {
  item: DetailItem;
};

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div className={styles.itemCard}>
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
  );
};

type DetailBodyProps = {
  detail: DetailData;
};

/** @scope .. */
export const DetailBody = ({ detail }: DetailBodyProps) => {
  return (
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
                <ItemCard key={item.title} item={item} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

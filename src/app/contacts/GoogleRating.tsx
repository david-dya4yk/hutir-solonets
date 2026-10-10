import { GOOGLE_RATING, REVIEW_HREF } from "@/content/site";

import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export function GoogleRating(): ReactNode {
  const { rating, value, count } = GOOGLE_RATING;
  return (
    <section className={styles.ratingSection}>
      <div className={styles.rating} data-reveal="">
        <div className={styles.score}>
          <span className={styles.big}>
            <span data-count={value} data-dec="1">
              {rating}
            </span>
          </span>
          <div className={styles.scoreText}>
            <span className={styles.stars} role="img" aria-label={`${rating} з 5`}>
              ★★★★★
            </span>
            <span className={styles.ratingLabel}>Рейтинг Google</span>
            <span className={styles.reviews}>
              <span data-count={count}>{count}</span> відгука
            </span>
          </div>
        </div>
        <a
          href={REVIEW_HREF}
          target="_blank"
          rel="noopener"
          className={`${ui.btn} ${styles.leave}`}
        >
          Залишити відгук ↗
        </a>
      </div>
    </section>
  );
}

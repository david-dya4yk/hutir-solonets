import { Icon } from "@/components/ui/Icon";
import { GOOGLE_RATING, REVIEW_HREF } from "@/content/site";
import { intlLocale } from "@/locales/config";
import { getI18n } from "@/locales/server";

import type { Locale } from "@/locales/config";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export async function GoogleRating({ locale }: { readonly locale: Locale }): Promise<ReactNode> {
  const t = await getI18n();
  const { value, count } = GOOGLE_RATING;
  const rating = value.toLocaleString(intlLocale(locale), { minimumFractionDigits: 1 });
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
            <span className={styles.stars} role="img" aria-label={t("rating.of5", { rating })}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Icon key={n} name="star" />
              ))}
            </span>
            <span className={styles.ratingLabel}>{t("rating.label")}</span>
            <span className={styles.reviews}>
              <span data-count={count}>{count}</span> {t("rating.reviews", { count })}
            </span>
          </div>
        </div>
        <a
          href={REVIEW_HREF}
          target="_blank"
          rel="noopener"
          className={`${ui.btn} ${styles.leave}`}
        >
          {t("rating.leave")}
        </a>
      </div>
    </section>
  );
}

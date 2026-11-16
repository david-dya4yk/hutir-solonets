import Image from "next/image";
import Link from "next/link";

import { PlanScroll } from "@/components/home/PlanScroll";
import { PLAN_COTTAGES, cottageHref, pad } from "@/content/site";
import { localePath } from "@/locales/config";
import { getI18n } from "@/locales/server";

import type { Content } from "@/content";
import type { Locale } from "@/locales/config";
import type { ReactNode } from "react";

import styles from "./PlanMap.module.css";

export async function PlanMap({
  locale,
  content,
  head,
  foot,
}: {
  readonly locale: Locale;
  readonly content: Content;
  readonly head: ReactNode;
  readonly foot: ReactNode;
}): Promise<ReactNode> {
  const t = await getI18n();
  return (
    <PlanScroll label={t("home.planScroll")} head={head} foot={foot}>
      <div className={styles.canvas}>
        <Image
          src="/assets/territory-map.jpg"
          alt={t("home.planCaption")}
          fill
          sizes="(max-width: 899px) 900px, (max-width: 1440px) 100vw, 1440px"
          className={styles.photo}
        />
        {content.planAmenities.map((p) => (
          <span
            key={`${p.x}-${p.y}`}
            className={styles.amenity}
            style={{ left: p.x, top: p.y }}
            tabIndex={0}
            aria-label={p.t}
          >
            <span className={styles.dot} />
            <span className={styles.tip}>{p.t}</span>
          </span>
        ))}
        {content.cottages.map((c) => {
          const spot = PLAN_COTTAGES[c.n];
          if (spot === undefined) {
            return null;
          }
          const [x, y] = spot;
          const title = t("common.cottage", { n: pad(c.n) });
          return (
            <Link
              key={c.n}
              href={localePath(locale, cottageHref(c))}
              aria-label={title}
              className={styles.pin}
              style={{ left: x, top: y }}
            >
              {pad(c.n)}
              <span className={styles.tip}>
                {title} · {t("common.area", { n: c.area })} · {t("common.upTo", { n: c.guests })}
              </span>
            </Link>
          );
        })}
      </div>
    </PlanScroll>
  );
}

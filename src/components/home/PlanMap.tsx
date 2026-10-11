"use client";

import Link from "next/link";
import { useState } from "react";

import { useContent } from "@/content/ContentProvider";
import { PLAN_COTTAGES, cottageHref, pad } from "@/content/site";
import { useI18n, useLocalePath } from "@/locales/client";

import type { ReactNode } from "react";

import styles from "./PlanMap.module.css";

export function PlanMap(): ReactNode {
  const [hover, setHover] = useState<string | null>(null);
  const t = useI18n();
  const lp = useLocalePath();
  const { cottages, planAmenities } = useContent();
  const leave = (): void => {
    setHover(null);
  };
  return (
    <div className={styles.map} data-reveal="">
      <div className={styles.layer} data-parallax="0.08">
        <div className={styles.stripes} />
      </div>
      <span className={styles.caption}>{t("home.planCaption")}</span>
      {planAmenities.map((p, i) => {
        const id = `a${String(i)}`;
        return (
          <div
            key={p.t}
            className={`${styles.amenity} ${hover === id ? styles.amenityOn : ""}`}
            style={{ left: p.x, top: p.y }}
            onMouseEnter={() => {
              setHover(id);
            }}
            onMouseLeave={leave}
          >
            <span className={styles.dot} />
            {p.t}
          </div>
        );
      })}
      {cottages.map((c, i) => {
        const id = `c${String(c.n)}`;
        const [x = "50%", y = "50%"] = PLAN_COTTAGES[i % PLAN_COTTAGES.length] ?? [];
        const title = t("common.cottage", { n: pad(c.n) });
        return (
          <Link
            key={c.n}
            href={lp(cottageHref(c))}
            aria-label={title}
            className={`${styles.pin} ${hover === id ? styles.pinOn : ""}`}
            style={{ left: x, top: y }}
            onMouseEnter={() => {
              setHover(id);
            }}
            onMouseLeave={leave}
          >
            {c.n}
            <span className={styles.tip}>
              {title} · {t("common.area", { n: c.area })} · {t("common.upTo", { n: c.guests })}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

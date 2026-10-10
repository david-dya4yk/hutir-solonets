"use client";

import Link from "next/link";
import { useState } from "react";

import { COTTAGES, PLAN_AMENITIES, PLAN_COTTAGES, cottageHref, cottageTitle } from "@/content/site";

import type { ReactNode } from "react";

import styles from "./PlanMap.module.css";

export function PlanMap(): ReactNode {
  const [hover, setHover] = useState<string | null>(null);
  const leave = (): void => {
    setHover(null);
  };
  return (
    <div className={styles.map} data-reveal="">
      <div className={styles.layer} data-parallax="0.08">
        <div className={styles.stripes} />
      </div>
      <span className={styles.caption}>аерофото території · осінь, з висоти</span>
      {PLAN_AMENITIES.map((p, i) => {
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
      {COTTAGES.map((c, i) => {
        const id = `c${String(c.n)}`;
        const [x = "50%", y = "50%"] = PLAN_COTTAGES[i % PLAN_COTTAGES.length] ?? [];
        const title = cottageTitle(c);
        return (
          <Link
            key={c.n}
            href={cottageHref(c)}
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
              {title} · {c.area} м² · до {c.guests}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

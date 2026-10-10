"use client";

import { useEffect, useState } from "react";

import { prefersReducedMotion } from "@/lib/ready";

import type { ReactNode } from "react";

import styles from "./Slides.module.css";

type SlidesProps = {
  readonly labels: readonly string[];
  readonly captionClass: string;
  readonly shade?: boolean;
  readonly segments?: "edge" | "inset";
};

export function Slides({ labels, captionClass, shade = false, segments }: SlidesProps): ReactNode {
  const [index, setIndex] = useState(0);
  const n = labels.length;

  useEffect(() => {
    if (prefersReducedMotion() || n < 2) {
      return undefined;
    }
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, 6000);
    return () => {
      window.clearInterval(t);
    };
  }, [n]);

  return (
    <>
      <div className={styles.track} style={{ transform: `translateX(-${String(index * 100)}%)` }}>
        {labels.map((label) => (
          <div key={label} className={styles.slide}>
            {shade && <div className={styles.shade} />}
            <span className={captionClass}>{label}</span>
          </div>
        ))}
      </div>
      {segments !== undefined && (
        <div className={segments === "inset" ? styles.segsInset : styles.segs}>
          {labels.map((label, j) => (
            <button
              key={label}
              type="button"
              className={styles.seg}
              aria-label={`Фото ${String(j + 1)}`}
              aria-current={j === index}
              onClick={() => {
                setIndex(j);
              }}
            >
              <span className={j === index ? styles.barOn : styles.bar} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

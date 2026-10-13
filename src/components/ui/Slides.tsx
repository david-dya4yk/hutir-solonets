"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/ready";
import { useI18n } from "@/locales/client";

import type { SlideImage } from "@/content/site";
import type { ReactNode } from "react";

import styles from "./Slides.module.css";

const INTERVAL = 6000;

type SlidesProps = {
  readonly labels: readonly string[];
  readonly captionClass: string;
  readonly shade?: boolean;
  readonly segments?: "edge" | "inset";
  readonly images?: readonly (SlideImage | undefined)[];
  readonly sizes?: string;
  readonly offset?: number;
};

export function Slides({
  labels,
  captionClass,
  shade = false,
  segments,
  images = [],
  sizes = "(max-width: 900px) 100vw, 60vw",
  offset = 0,
}: SlidesProps): ReactNode {
  const [index, setIndex] = useState(0);
  const t = useI18n();
  const n = labels.length;

  const started = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion() || n < 2) {
      return undefined;
    }
    const t = window.setTimeout(
      () => {
        started.current = true;
        setIndex((i) => (i + 1) % n);
      },
      INTERVAL + (started.current ? 0 : offset),
    );
    return () => {
      window.clearTimeout(t);
    };
  }, [index, n, offset]);

  return (
    <>
      <div className={styles.track} style={{ transform: `translateX(-${String(index * 100)}%)` }}>
        {labels.map((label, j) => {
          const image = images[j];
          return (
            <div key={image?.src ?? label} className={styles.slide}>
              {image === undefined ? null : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={sizes}
                  className={styles.image}
                  style={{ objectPosition: image.position ?? "center" }}
                />
              )}
              {shade && <div className={styles.shade} />}
              {image === undefined && <span className={captionClass}>{label}</span>}
            </div>
          );
        })}
      </div>
      {segments !== undefined && n > 1 && (
        <div className={segments === "inset" ? styles.segsInset : styles.segs}>
          {labels.map((label, j) => (
            <button
              key={images[j]?.src ?? label}
              type="button"
              className={styles.seg}
              aria-label={t("slides.photo", { n: j + 1 })}
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

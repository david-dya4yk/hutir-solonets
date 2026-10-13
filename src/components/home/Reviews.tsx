"use client";

import { useEffect, useRef } from "react";

import { BookButton } from "@/components/booking/BookButton";
import { Icon } from "@/components/ui/Icon";
import { useContent } from "@/content/ContentProvider";
import { INSTAGRAM_URL } from "@/content/site";
import { prefersReducedMotion } from "@/lib/ready";
import { useI18n } from "@/locales/client";

import type { ReactNode } from "react";

import styles from "./Reviews.module.css";
import ui from "@/components/ui/ui.module.css";

export function Reviews(): ReactNode {
  const t = useI18n();
  const { reviews } = useContent();
  const loop = [...reviews, ...reviews].map((r, i) => ({ ...r, key: `${r.handle}-${String(i)}` }));
  const track = useRef<HTMLDivElement>(null);
  const motion = useRef({ x: 0, kick: 0, paused: false });

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let raf = 0;
    const loop = (): void => {
      raf = requestAnimationFrame(loop);
      const el = track.current;
      if (el === null) {
        return;
      }
      const half = el.scrollWidth / 2;
      if (half === 0) {
        return;
      }
      const m = motion.current;
      const k = m.kick * 0.08;
      m.kick -= k;
      m.x -= k + (m.paused || reduced ? 0 : 0.5);
      if (-m.x >= half) {
        m.x += half;
      }
      if (m.x > 0) {
        m.x -= half;
      }
      el.style.transform = `translate3d(${m.x.toFixed(1)}px,0,0)`;
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  const kick = (dir: number): void => {
    motion.current.kick += dir * Math.min(440, window.innerWidth * 0.8);
  };

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={ui.displayMd} data-reveal="lines">
          <span className={ui.line}>{t("reviews.title1")}</span>
          <span className={ui.line}>{t("reviews.title2")}</span>
        </h2>
        <div className={styles.side}>
          <p className={ui.lead} data-reveal="">
            <b>{t("reviews.lead")}</b>
            <br />
            {t("reviews.text")}
            <span className={styles.handle}>&nbsp;{t("reviews.tag")}</span>
          </p>
          <div className={styles.controls} data-reveal="">
            <button
              type="button"
              className={styles.arrow}
              aria-label={t("reviews.prev")}
              onClick={() => {
                kick(-1);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label={t("reviews.next")}
              onClick={() => {
                kick(1);
              }}
            >
              ›
            </button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className={`${ui.underline} ${styles.ig}`}
            >
              Instagram
            </a>
            <BookButton className={`${ui.btn} ${styles.book}`} magnet />
          </div>
        </div>
      </div>
      <div
        className={styles.viewport}
        data-reveal=""
        onMouseEnter={() => {
          motion.current.paused = true;
        }}
        onMouseLeave={() => {
          motion.current.paused = false;
        }}
      >
        <div ref={track} className={styles.track}>
          {loop.map((r) => (
            <article key={r.key} className={styles.card}>
              <div className={styles.photo} />
              <div className={ui.shadeLight} />
              {r.video && (
                <span className={styles.play}>
                  <Icon name="play" />
                </span>
              )}
              <div className={styles.meta}>
                <span className={styles.quote}>«{r.quote}»</span>
                <span className={styles.author}>
                  <span className={styles.igIcon} />
                  {r.handle}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

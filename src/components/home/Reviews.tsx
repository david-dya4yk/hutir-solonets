"use client";

import { useEffect, useRef } from "react";

import { BookButton } from "@/components/booking/BookButton";
import { INSTAGRAM_URL, REVIEWS } from "@/content/site";
import { prefersReducedMotion } from "@/lib/ready";

import type { ReactNode } from "react";

import styles from "./Reviews.module.css";
import ui from "@/components/ui/ui.module.css";

const LOOP = [...REVIEWS, ...REVIEWS].map((r, i) => ({ ...r, key: `${r.handle}-${String(i)}` }));

export function Reviews(): ReactNode {
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
          <span className={ui.line}>Відгуки гостей.</span>
          <span className={ui.line}>З Instagram.</span>
        </h2>
        <div className={styles.side}>
          <p className={ui.lead} data-reveal="">
            <b>Ваші моменти - наша історія.</b>
            <br />
            Нам приємно бути частиною ваших спогадів. Діліться фото та відео з відпочинку.
            Відзначайте
            <span className={styles.handle}>
              &nbsp;@hutir_solonets — і ваші найтепліші моменти зʼявляться тут.
            </span>
          </p>
          <div className={styles.controls} data-reveal="">
            <button
              type="button"
              className={styles.arrow}
              aria-label="Назад"
              onClick={() => {
                kick(-1);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Далі"
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
              Instagram ↗
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
          {LOOP.map((r) => (
            <article key={r.key} className={styles.card}>
              <div className={styles.photo} />
              <div className={ui.shadeLight} />
              {r.video && <span className={styles.play}>▶</span>}
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

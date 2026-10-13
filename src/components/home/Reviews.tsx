"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

import { BookButton } from "@/components/booking/BookButton";
import { Icon } from "@/components/ui/Icon";
import { useContent } from "@/content/ContentProvider";
import { INSTAGRAM_URL } from "@/content/site";
import { prefersReducedMotion } from "@/lib/ready";
import { useI18n } from "@/locales/client";

import type { ReviewClip } from "@/content/site";
import type { PointerEvent, ReactNode } from "react";

import styles from "./Reviews.module.css";
import ui from "@/components/ui/ui.module.css";

const DRAG_PX = 8;
const FLING_MS = 260;

export function Reviews(): ReactNode {
  const t = useI18n();
  const { reviews } = useContent();
  const loop = [...reviews, ...reviews].map((r, i) => ({
    ...r,
    key: `${r.handle}-${String(i)}`,
    image: r.clip?.poster ?? r.photo,
  }));
  const track = useRef<HTMLDivElement>(null);
  const motion = useRef({ x: 0, kick: 0, paused: false });
  const [playing, setPlaying] = useState<ReviewClip | null>(null);

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

  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    t: number;
    v: number;
    on: boolean;
  } | null>(null);
  const dragged = useRef(false);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType === "mouse") {
      return;
    }
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, v: 0, on: false };
    dragged.current = false;
    motion.current.kick = 0;
    motion.current.paused = true;
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>): void => {
    const d = drag.current;
    if (d?.id !== e.pointerId) {
      return;
    }
    const dx = e.clientX - d.x;
    if (!d.on) {
      if (Math.abs(dx) < DRAG_PX || Math.abs(dx) < Math.abs(e.clientY - d.y)) {
        return;
      }
      d.on = true;
      dragged.current = true;
    }
    motion.current.x += dx;
    d.v = dx / Math.max(1, e.timeStamp - d.t);
    d.x = e.clientX;
    d.t = e.timeStamp;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>): void => {
    const d = drag.current;
    if (d?.id !== e.pointerId) {
      return;
    }
    drag.current = null;
    motion.current.paused = false;
    if (d.on) {
      motion.current.kick = -d.v * FLING_MS;
    }
  };

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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          if (dragged.current) {
            dragged.current = false;
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div ref={track} className={styles.track}>
          {loop.map((r) => (
            <article key={r.key} className={styles.card}>
              <div
                className={styles.photo}
                style={r.image === undefined ? undefined : { backgroundImage: `url("${r.image}")` }}
              />
              <div className={ui.shadeLight} />
              {r.video && (
                <span className={styles.play}>
                  <Icon name="play" />
                </span>
              )}
              <div className={styles.meta}>
                {r.quote !== "" && <span className={styles.quote}>«{r.quote}»</span>}
                <span className={styles.author}>
                  <span className={styles.igIcon} />
                  {r.handle}
                </span>
              </div>
              {r.clip !== undefined && (
                <button
                  type="button"
                  className={styles.open}
                  aria-label={t("reviews.watch", { handle: r.handle })}
                  onClick={() => {
                    setPlaying(r.clip ?? null);
                  }}
                />
              )}
            </article>
          ))}
        </div>
      </div>
      {playing !== null && (
        <ReviewPlayer
          clip={playing}
          onClose={() => {
            setPlaying(null);
          }}
        />
      )}
    </section>
  );
}

function ReviewPlayer({
  clip,
  onClose,
}: {
  readonly clip: ReviewClip;
  readonly onClose: () => void;
}): ReactNode {
  const t = useI18n();
  const onEscape = useEffectEvent(onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.player} role="dialog" aria-modal="true">
      <div className={styles.playerBackdrop} onClick={onClose} aria-hidden="true" />
      <video
        className={styles.playerVideo}
        src={clip.src}
        poster={clip.poster}
        controls
        autoPlay
        playsInline
      />
      <button
        type="button"
        className={styles.playerClose}
        aria-label={t("common.close")}
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

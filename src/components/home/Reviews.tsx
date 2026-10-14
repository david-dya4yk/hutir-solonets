"use client";

import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from "react";

import { BookButton } from "@/components/booking/BookButton";
import { Icon } from "@/components/ui/Icon";
import { LazyImage } from "@/components/ui/LazyImage";
import { useContent } from "@/content/ContentProvider";
import { INSTAGRAM_URL } from "@/content/site";
import { prefersReducedMotion } from "@/lib/ready";
import { useI18n } from "@/locales/client";

import type { Review, ReviewClip } from "@/content/site";
import type { MouseEvent, PointerEvent, ReactNode } from "react";

import styles from "./Reviews.module.css";
import ui from "@/components/ui/ui.module.css";

const MOBILE = "(max-width: 899px)";
const DRAG_PX = 8;
const FLING_MS = 260;
const SWIPE_PX = 40;
const COPIES = 3;
const AUTOPLAY_MS = 5000;

type Item = Review & { readonly key: string; readonly image: string | undefined };

type Register = (step: ((dir: number) => void) | null) => void;

const subscribe = (cb: () => void): (() => void) => {
  const mq = window.matchMedia(MOBILE);
  mq.addEventListener("change", cb);
  return () => {
    mq.removeEventListener("change", cb);
  };
};

const useMobile = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE).matches,
    () => false,
  );

const copies = (reviews: readonly Review[], count: number): Item[] =>
  Array.from({ length: count }, (_, c) =>
    reviews.map((r, i) => ({
      ...r,
      key: `${String(c)}-${String(i)}`,
      image: r.clip?.poster ?? r.photo,
    })),
  ).flat();

const placeTrack = (
  viewport: HTMLElement | null,
  track: HTMLElement | null,
  index: number,
  offset: number,
): void => {
  const card = track?.children[index];
  if (viewport === null || track === null || !(card instanceof HTMLElement)) {
    return;
  }
  const x = viewport.clientWidth / 2 - card.offsetLeft - card.offsetWidth / 2 + offset;
  track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
};

export function Reviews(): ReactNode {
  const t = useI18n();
  const mobile = useMobile();
  const step = useRef<((dir: number) => void) | null>(null);
  const register: Register = (fn) => {
    step.current = fn;
  };
  const [playing, setPlaying] = useState<ReviewClip | null>(null);

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
                step.current?.(-1);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label={t("reviews.next")}
              onClick={() => {
                step.current?.(1);
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
      {mobile ? (
        <Slider register={register} paused={playing !== null} onPlay={setPlaying} />
      ) : (
        <Marquee register={register} onPlay={setPlaying} />
      )}
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

function Card({
  r,
  className,
  hidden = false,
  onOpen,
}: {
  readonly r: Item;
  readonly className: string;
  readonly hidden?: boolean;
  readonly onOpen: (() => void) | undefined;
}): ReactNode {
  const t = useI18n();
  return (
    <article className={className} aria-hidden={hidden ? true : undefined}>
      <div className={styles.photo}>
        {r.image !== undefined && (
          <LazyImage src={r.image} sizes="(max-width: 899px) 40vw, 620px" />
        )}
      </div>
      <div className={ui.shadeLight} />
      {r.video && (
        <span className={styles.play}>
          <Icon name="play" />
        </span>
      )}
      <div className={styles.meta}>
        <span className={styles.author}>
          <span className={styles.igIcon} />
          {r.handle}
        </span>
      </div>
      {onOpen !== undefined && (
        <button
          type="button"
          className={styles.open}
          tabIndex={hidden ? -1 : 0}
          aria-label={r.clip === undefined ? r.handle : t("reviews.watch", { handle: r.handle })}
          onClick={onOpen}
        />
      )}
    </article>
  );
}

function Marquee({
  register,
  onPlay,
}: {
  readonly register: Register;
  readonly onPlay: (clip: ReviewClip) => void;
}): ReactNode {
  const { reviews } = useContent();
  const items = copies(reviews, 2);
  const track = useRef<HTMLDivElement>(null);
  const motion = useRef({ x: 0, kick: 0, paused: false });
  const dragged = useRef(false);

  useEffect(() => {
    register((dir) => {
      motion.current.kick += dir * Math.min(440, window.innerWidth * 0.8);
    });
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
      register(null);
    };
  }, [register]);

  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    t: number;
    v: number;
    on: boolean;
  } | null>(null);

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

  return (
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
      onClickCapture={(e: MouseEvent) => {
        if (dragged.current) {
          dragged.current = false;
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div ref={track} className={styles.track}>
        {items.map((r) => (
          <Card
            key={r.key}
            r={r}
            className={styles.card}
            onOpen={
              r.clip === undefined
                ? undefined
                : () => {
                    if (r.clip !== undefined) {
                      onPlay(r.clip);
                    }
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}

function Slider({
  register,
  paused,
  onPlay,
}: {
  readonly register: Register;
  readonly paused: boolean;
  readonly onPlay: (clip: ReviewClip) => void;
}): ReactNode {
  const { reviews } = useContent();
  const n = reviews.length;
  const items = copies(reviews, COPIES);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(n);
  const activeRef = useRef(n);
  const [jump, setJump] = useState(true);
  const [held, setHeld] = useState(false);
  const dragged = useRef(false);

  const go = (i: number): void => {
    setActive(Math.max(0, Math.min(n * COPIES - 1, i)));
  };

  useEffect(() => {
    register((dir) => {
      setActive((i) => Math.max(0, Math.min(n * COPIES - 1, i + dir)));
    });
    const onResize = (): void => {
      placeTrack(viewport.current, track.current, activeRef.current, 0);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      register(null);
    };
  }, [register, n]);

  useEffect(() => {
    activeRef.current = active;
    placeTrack(viewport.current, track.current, active, 0);
    if (!jump) {
      return;
    }
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setJump(false);
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [active, jump]);

  useEffect(() => {
    if (held || paused || prefersReducedMotion()) {
      return;
    }
    const timer = window.setTimeout(() => {
      setActive((i) => i + 1);
    }, AUTOPLAY_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [active, held, paused]);

  const drag = useRef<{ id: number; x0: number; y0: number; dx: number; on: boolean } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>): void => {
    drag.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, on: false };
    dragged.current = false;
    setHeld(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>): void => {
    const d = drag.current;
    if (d?.id !== e.pointerId) {
      return;
    }
    d.dx = e.clientX - d.x0;
    if (!d.on) {
      if (Math.abs(d.dx) < DRAG_PX || Math.abs(d.dx) < Math.abs(e.clientY - d.y0)) {
        return;
      }
      d.on = true;
      dragged.current = true;
      track.current?.style.setProperty("transition", "none");
    }
    placeTrack(viewport.current, track.current, active, d.dx);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>): void => {
    const d = drag.current;
    if (d?.id !== e.pointerId) {
      return;
    }
    drag.current = null;
    setHeld(false);
    track.current?.style.removeProperty("transition");
    if (!d.on) {
      return;
    }
    if (d.dx <= -SWIPE_PX) {
      go(active + 1);
    } else if (d.dx >= SWIPE_PX) {
      go(active - 1);
    } else {
      placeTrack(viewport.current, track.current, active, 0);
    }
  };

  return (
    <div
      ref={viewport}
      className={styles.slider}
      data-reveal=""
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={(e: MouseEvent) => {
        if (dragged.current) {
          dragged.current = false;
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div
        ref={track}
        className={`${styles.slides} ${jump ? styles.jump : ""}`}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget || e.propertyName !== "transform") {
            return;
          }
          const j = n + (((active % n) + n) % n);
          if (j !== active) {
            setJump(true);
            setActive(j);
          }
        }}
      >
        {items.map((r, i) => (
          <Card
            key={r.key}
            r={r}
            className={`${styles.slide} ${i === active ? styles.slideActive : ""}`}
            hidden={i !== active}
            onOpen={() => {
              if (i !== active) {
                go(i);
              } else if (r.clip !== undefined) {
                onPlay(r.clip);
              }
            }}
          />
        ))}
      </div>
    </div>
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

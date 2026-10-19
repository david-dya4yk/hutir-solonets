"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { prefersReducedMotion } from "@/lib/ready";

import type { MouseEvent, PointerEvent, ReactElement, ReactNode } from "react";

import styles from "./Carousel.module.css";

const MOBILE = "(max-width: 899px)";
const DRAG_PX = 8;
const FLING_MS = 260;
const SWIPE_PX = 40;
const COPIES = 3;
const AUTOPLAY_MS = 5000;

export type CarouselRegister = (step: ((dir: number) => void) | null) => void;

export type CarouselSlot = {
  readonly className: string;
  readonly hidden: boolean;
  readonly select: (() => void) | undefined;
};

type CarouselProps<T> = {
  readonly items: readonly T[];
  readonly render: (item: T, slot: CarouselSlot, key: string) => ReactElement;
  readonly register?: CarouselRegister;
  readonly paused?: boolean;
};

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

const repeat = <T,>(items: readonly T[], count: number): { item: T; key: string }[] =>
  Array.from({ length: count }, (_, c) =>
    items.map((item, i) => ({ item, key: `${String(c)}-${String(i)}` })),
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

const noRegister: CarouselRegister = () => undefined;

export function Carousel<T>({
  items,
  render,
  register = noRegister,
  paused = false,
}: CarouselProps<T>): ReactNode {
  const mobile = useMobile();
  return mobile ? (
    <Slider items={items} render={render} register={register} paused={paused} />
  ) : (
    <Marquee items={items} render={render} register={register} />
  );
}

function Marquee<T>({
  items,
  render,
  register,
}: {
  readonly items: readonly T[];
  readonly render: CarouselProps<T>["render"];
  readonly register: CarouselRegister;
}): ReactNode {
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
        {repeat(items, 2).map(({ item, key }) =>
          render(item, { className: styles.card, hidden: false, select: undefined }, key),
        )}
      </div>
    </div>
  );
}

function Slider<T>({
  items,
  render,
  register,
  paused,
}: {
  readonly items: readonly T[];
  readonly render: CarouselProps<T>["render"];
  readonly register: CarouselRegister;
  readonly paused: boolean;
}): ReactNode {
  const n = items.length;
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
        {repeat(items, COPIES).map(({ item, key }, i) =>
          render(
            item,
            {
              className: `${styles.slide} ${i === active ? styles.slideActive : ""}`,
              hidden: i !== active,
              select:
                i === active
                  ? undefined
                  : () => {
                      go(i);
                    },
            },
            key,
          ),
        )}
      </div>
    </div>
  );
}

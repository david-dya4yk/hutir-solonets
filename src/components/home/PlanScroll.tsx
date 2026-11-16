"use client";

import { useEffect, useRef } from "react";

import type { KeyboardEvent, PointerEvent, ReactNode } from "react";

import styles from "./PlanMap.module.css";

const MOBILE = "(max-width: 899px)";
const HEADER = 84;

const STEPS: Readonly<Partial<Record<string, number>>> = { ArrowRight: 0.1, ArrowLeft: -0.1 };

const clamp = (v: number): number => Math.min(1, Math.max(0, v));

export function PlanScroll({
  label,
  head,
  foot,
  children,
}: {
  readonly label: string;
  readonly head: ReactNode;
  readonly foot: ReactNode;
  readonly children: ReactNode;
}): ReactNode {
  const track = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const geo = useRef({ max: 0, top: 0, p: 0 });

  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    let raf = 0;

    const reset = (): void => {
      track.current?.style.removeProperty("height");
      sticky.current?.style.removeProperty("top");
      sticky.current?.style.removeProperty("--p");
      sticky.current?.style.removeProperty("--r");
    };

    const update = (): void => {
      raf = 0;
      const t = track.current;
      const s = sticky.current;
      const m = map.current;
      const canvas = m?.firstElementChild;
      if (t === null || s === null || m === null || !(canvas instanceof HTMLElement)) {
        return;
      }
      if (!mq.matches) {
        canvas.style.removeProperty("transform");
        reset();
        return;
      }
      const max = Math.max(0, canvas.offsetWidth - m.clientWidth);
      const top = Math.max(HEADER, (window.innerHeight - s.offsetHeight) / 2);
      t.style.height = `${String(s.offsetHeight + max)}px`;
      s.style.top = `${top.toFixed(0)}px`;
      const p = max === 0 ? 0 : clamp((top - t.getBoundingClientRect().top) / max);
      geo.current = { max, top, p };
      bar.current?.setAttribute("aria-valuenow", String(Math.round(p * 100)));
      canvas.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0)`;
      s.style.setProperty("--p", p.toFixed(4));
      s.style.setProperty("--r", (m.clientWidth / canvas.offsetWidth).toFixed(4));
    };

    const schedule = (): void => {
      if (raf === 0) {
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mq.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", schedule);
    };
  }, []);

  const seek = (p: number): void => {
    const t = track.current;
    if (t === null) {
      return;
    }
    const { max, top } = geo.current;
    const y = t.getBoundingClientRect().top + window.scrollY - top + clamp(p) * max;
    window.scrollTo({ top: y, behavior: "instant" });
  };

  const seekTo = (e: PointerEvent<HTMLDivElement>): void => {
    const rail = e.currentTarget.getBoundingClientRect();
    const m = map.current;
    const canvas = m?.firstElementChild;
    const r = m && canvas instanceof HTMLElement ? m.clientWidth / canvas.offsetWidth : 1;
    const w = rail.width * r;
    seek((e.clientX - rail.left - w / 2) / Math.max(1, rail.width - w));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    const step = STEPS[e.key];
    if (step !== undefined) {
      e.preventDefault();
      seek(geo.current.p + step);
    }
  };

  return (
    <div ref={track} className={styles.track}>
      <div ref={sticky} className={styles.sticky}>
        {head}
        <div ref={map} className={styles.map} data-reveal="">
          {children}
        </div>
        <div
          ref={bar}
          className={styles.bar}
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            seekTo(e);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
              seekTo(e);
            }
          }}
        >
          <span className={styles.rail}>
            <span className={styles.thumb} />
          </span>
        </div>
        {foot}
      </div>
    </div>
  );
}

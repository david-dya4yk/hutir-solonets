"use client";

import { useEffect, useRef } from "react";

import type { ReactNode } from "react";

const STACKED = "(max-width: 919px)";

/**
 * On a stacked (mobile) layout, marks the child closest to the viewport centre with
 * `data-active` while scrolling, so only one tile is in focus and the rest are dimmed.
 */
export function FocusTiles({
  className,
  children,
}: {
  readonly className: string;
  readonly children: ReactNode;
}): ReactNode {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (el === null) {
      return undefined;
    }
    const mq = window.matchMedia(STACKED);
    let raf = 0;
    const update = (): void => {
      raf = 0;
      const tiles = [...el.children].filter((c) => c instanceof HTMLElement);
      if (!mq.matches) {
        tiles.forEach((t) => {
          t.removeAttribute("data-active");
        });
        return;
      }
      const mid = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      tiles.forEach((t) => {
        const r = t.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = t;
        }
      });
      tiles.forEach((t) => {
        t.toggleAttribute("data-active", t === best);
      });
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

  return (
    <section ref={root} className={className}>
      {children}
    </section>
  );
}

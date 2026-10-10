"use client";

import { useEffect, useRef, useState } from "react";

import { markReady, prefersReducedMotion } from "@/lib/ready";

import type { ReactNode } from "react";

import styles from "./Preloader.module.css";

type Phase = "idle" | "in" | "out" | "done";

const easeInOutCubic = (q: number): number =>
  q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;

export function Preloader(): ReactNode {
  const [phase, setPhase] = useState<Phase>("idle");
  const bg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const timers: number[] = [];
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        setPhase("in");
      });
    });
    const hold = reduced ? 200 : 2100;
    const reveal = reduced ? 10 : 1500;
    timers.push(
      window.setTimeout(() => {
        setPhase("out");
        markReady();
        const el = bg.current;
        if (el !== null && !reduced) {
          const t0 = performance.now();
          const step = (now: number): void => {
            const q = Math.min(1, (now - t0) / reveal);
            const k = easeInOutCubic(q);
            const mask = `radial-gradient(circle at 50% 50%, transparent ${(k * 120).toFixed(1)}%, #000 ${(k * 120 + 14).toFixed(1)}%)`;
            el.style.maskImage = mask;
            if (q < 1) {
              frame = requestAnimationFrame(step);
            }
          };
          frame = requestAnimationFrame(step);
        }
        timers.push(
          window.setTimeout(() => {
            setPhase("done");
          }, reveal + 150),
        );
      }, hold),
    );
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((t) => {
        window.clearTimeout(t);
      });
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      className={`${styles.root} ${phase === "out" ? styles.leaving : ""}`}
      aria-hidden="true"
      data-preloader=""
    >
      <div ref={bg} className={styles.bg} />
      <div className={`${styles.content} ${phase === "in" ? styles.contentIn : ""}`}>
        <span className={styles.brand}>solonєts</span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import { useContent } from "@/content/ContentProvider";
import { prefersReducedMotion } from "@/lib/ready";
import { useI18n } from "@/locales/client";

import type { Room } from "@/content/site";
import type { ReactNode } from "react";

import styles from "./RoomTabs.module.css";
import ui from "../ui/ui.module.css";

type Phase = "idle" | "out" | "in";

export function RoomTabs({
  rooms: own,
}: {
  readonly rooms?: readonly Room[] | undefined;
}): ReactNode {
  const [room, setRoom] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const strip = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const t = useI18n();
  const shared = useContent().rooms;
  const rooms = own ?? shared;
  const current = rooms[room] ?? rooms[0];

  const select = (i: number): void => {
    if (i === room || phase !== "idle") {
      return;
    }
    if (prefersReducedMotion()) {
      setRoom(i);
      return;
    }
    timers.current.forEach((t) => {
      window.clearTimeout(t);
    });
    setPhase("out");
    timers.current = [
      window.setTimeout(() => {
        setRoom(i);
        setPhase("in");
        timers.current.push(
          window.setTimeout(() => {
            setPhase("idle");
          }, 40),
        );
      }, 380),
    ];
  };

  const measure = (): void => {
    const el = strip.current;
    if (el === null) {
      return;
    }
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setEdges((e) => (e.left === left && e.right === right ? e : { left, right }));
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  const nudge = (dir: number): void => {
    const el = strip.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  if (current === undefined) {
    return null;
  }

  return (
    <>
      <div className={styles.tabsWrap} data-reveal="">
        <div ref={strip} className={styles.tabs} onScroll={measure}>
          {rooms.map((tab, i) => (
            <button
              key={tab.title}
              type="button"
              className={`${styles.tab} ${room === i ? styles.tabOn : ""}`}
              aria-pressed={room === i}
              onClick={(e) => {
                e.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
                select(i);
              }}
            >
              {tab.title}
              <span className={styles.tabBar} />
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`${styles.more} ${styles.moreLeft} ${edges.left ? styles.moreOn : ""}`}
          aria-label={t("reviews.prev")}
          tabIndex={edges.left ? 0 : -1}
          onClick={() => {
            nudge(-1);
          }}
        >
          ‹
        </button>
        <button
          type="button"
          className={`${styles.more} ${edges.right ? styles.moreOn : ""}`}
          aria-label={t("reviews.next")}
          tabIndex={edges.right ? 0 : -1}
          onClick={() => {
            nudge(1);
          }}
        >
          ›
        </button>
      </div>
      <div className={`${styles.body} ${styles[phase]}`}>
        <div className={styles.text}>
          <p className={styles.lead}>{current.text}</p>
          <div className={styles.items}>
            {current.items.map((item) => (
              <span key={item} className={styles.item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={`${ui.frame} ${styles.photo}`}>
          <div className={`${ui.fill} ${ui.stripes}`} />
          <span className={ui.caption}>{t("common.photo", { label: current.shot })}</span>
        </div>
      </div>
    </>
  );
}

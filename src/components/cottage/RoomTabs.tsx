"use client";

import { useRef, useState } from "react";

import { ROOM_TABS } from "@/content/site";
import { prefersReducedMotion } from "@/lib/ready";

import type { ReactNode } from "react";

import styles from "./RoomTabs.module.css";
import ui from "../ui/ui.module.css";

type Phase = "idle" | "out" | "in";

export function RoomTabs(): ReactNode {
  const [room, setRoom] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const current = ROOM_TABS[room] ?? ROOM_TABS[0];

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

  if (current === undefined) {
    return null;
  }

  return (
    <>
      <div className={styles.tabs} data-reveal="">
        {ROOM_TABS.map((t, i) => (
          <button
            key={t.title}
            type="button"
            className={`${styles.tab} ${room === i ? styles.tabOn : ""}`}
            aria-pressed={room === i}
            onClick={() => {
              select(i);
            }}
          >
            {t.title}
            <span className={styles.tabBar} />
          </button>
        ))}
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
          <span className={ui.caption}>фото · {current.shot}</span>
        </div>
      </div>
    </>
  );
}

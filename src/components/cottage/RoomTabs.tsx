"use client";

import { useRef, useState } from "react";

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

  if (current === undefined) {
    return null;
  }

  return (
    <>
      <div className={styles.tabs} data-reveal="">
        {rooms.map((tab, i) => (
          <button
            key={tab.title}
            type="button"
            className={`${styles.tab} ${room === i ? styles.tabOn : ""}`}
            aria-pressed={room === i}
            onClick={() => {
              select(i);
            }}
          >
            {tab.title}
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
          <span className={ui.caption}>{t("common.photo", { label: current.shot })}</span>
        </div>
      </div>
    </>
  );
}

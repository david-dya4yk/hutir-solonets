"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { markReady, waitForHero } from "@/lib/ready";

import type { AnimationEvent, ReactNode } from "react";

import styles from "./Preloader.module.css";

type Phase = "waiting" | "loaded" | "playing" | "done";

const HERO_TIMEOUT_MS = 10_000;

export function Preloader(): ReactNode {
  const [phase, setPhase] = useState<Phase>("waiting");
  const logo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (logo.current?.complete === true) {
      setPhase("loaded");
    }
  }, []);

  useEffect(() => {
    if (phase !== "loaded") {
      return undefined;
    }
    let cancelled = false;
    void waitForHero(HERO_TIMEOUT_MS).then(() => {
      if (!cancelled) {
        setPhase("playing");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "playing") {
      markReady();
    }
  }, [phase]);

  const start = (): void => {
    setPhase((p) => (p === "waiting" ? "loaded" : p));
  };

  const onAnimationEnd = (e: AnimationEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      setPhase("done");
    }
  };

  if (phase === "done") {
    return null;
  }

  return (
    <div
      className={`${styles.root} ${phase === "playing" ? styles.playing : ""}`}
      data-preloader=""
      aria-hidden="true"
      onAnimationEnd={onAnimationEnd}
    >
      <noscript>
        <style>{"[data-preloader]{display:none}"}</style>
      </noscript>
      <div className={styles.window} />
      <div className={styles.box}>
        <Image
          ref={logo}
          className={styles.logo}
          src="/logo.svg"
          alt=""
          width={1571}
          height={426}
          preload
          unoptimized
          onLoad={start}
          onError={start}
        />
      </div>
    </div>
  );
}

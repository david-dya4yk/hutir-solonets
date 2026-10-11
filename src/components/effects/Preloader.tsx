"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { markReady } from "@/lib/ready";

import type { AnimationEvent, ReactNode } from "react";

import styles from "./Preloader.module.css";

type Phase = "waiting" | "playing" | "done";

export function Preloader(): ReactNode {
  const [phase, setPhase] = useState<Phase>("waiting");
  const logo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (logo.current?.complete === true) {
      setPhase("playing");
    }
  }, []);

  useEffect(() => {
    if (phase === "playing") {
      markReady();
    }
  }, [phase]);

  const start = (): void => {
    setPhase((p) => (p === "waiting" ? "playing" : p));
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
          width={3340}
          height={810}
          preload
          unoptimized
          onLoad={start}
          onError={start}
        />
      </div>
    </div>
  );
}

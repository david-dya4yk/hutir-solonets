"use client";

import { useSyncExternalStore } from "react";

import type { ReactNode } from "react";

import styles from "./HeroVideo.module.css";

const MOBILE = "(max-width: 899px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

const saveData = (): boolean => {
  const connection: unknown = Reflect.get(navigator, "connection");
  return (
    typeof connection === "object" &&
    connection !== null &&
    Reflect.get(connection, "saveData") === true
  );
};

const subscribe = (onChange: () => void): (() => void) => {
  const queries = [window.matchMedia(MOBILE), window.matchMedia(REDUCED)];
  queries.forEach((q) => {
    q.addEventListener("change", onChange);
  });
  return () => {
    queries.forEach((q) => {
      q.removeEventListener("change", onChange);
    });
  };
};

const shouldPlay = (): boolean =>
  window.matchMedia(MOBILE).matches && !window.matchMedia(REDUCED).matches && !saveData();

export function HeroVideo({
  src,
  poster,
}: {
  readonly src: string;
  readonly poster: string;
}): ReactNode {
  const enabled = useSyncExternalStore(subscribe, shouldPlay, () => false);
  if (!enabled) {
    return null;
  }
  return (
    <video
      className={styles.video}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}

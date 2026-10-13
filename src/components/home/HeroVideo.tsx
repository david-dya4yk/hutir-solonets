"use client";

import { useEffect, useRef } from "react";

import type { ReactNode } from "react";

import styles from "./HeroVideo.module.css";

const MOBILE = "(max-width: 899px)";

// React does not serialise `muted` into server HTML, and iOS refuses to autoplay
// without it — so the tag is rendered as raw markup to autoplay before hydration.
const markup = (src: string, poster: string): string =>
  `<video class="${styles.video}" poster="${poster}" muted autoplay loop playsinline preload="auto" aria-hidden="true" data-hero-video><source src="${src}" type="video/mp4" media="${MOBILE}"></video>`;

export function HeroVideo({
  src,
  poster,
}: {
  readonly src: string;
  readonly poster: string;
}): ReactNode {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = root.current?.querySelector("video");
    if (video === null || video === undefined) {
      return;
    }
    video.muted = true;
    if (video.paused && window.matchMedia(MOBILE).matches) {
      video.play().catch(() => undefined);
    }
  }, []);

  return (
    <div
      ref={root}
      className={styles.wrap}
      dangerouslySetInnerHTML={{ __html: markup(src, poster) }}
    />
  );
}

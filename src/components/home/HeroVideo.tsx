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
    const found = root.current?.querySelector("video");
    if (found === null || found === undefined) {
      return;
    }
    const video: HTMLVideoElement = found;
    video.muted = true;
    const gestures = ["touchend", "pointerup", "click", "keydown", "scroll"] as const;
    const detach = (): void => {
      gestures.forEach((e) => {
        window.removeEventListener(e, play);
      });
    };
    let swapped = false;
    const swapToImage = (): void => {
      const src = video.querySelector("source")?.src;
      if (swapped || src === undefined) {
        return;
      }
      swapped = true;
      const img = document.createElement("img");
      img.className = video.className;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.addEventListener("load", () => {
        if (video.paused) {
          detach();
          video.replaceWith(img);
        }
      });
      img.src = src;
    };
    function play(): void {
      if (video.paused && !document.hidden && window.matchMedia(MOBILE).matches) {
        video.play().then(detach, (e: unknown) => {
          if (e instanceof DOMException && e.name === "NotAllowedError") {
            swapToImage();
          }
        });
      }
    }
    gestures.forEach((e) => {
      window.addEventListener(e, play, { passive: true });
    });
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pageshow", play);
    play();
    return () => {
      detach();
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pageshow", play);
    };
  }, []);

  return (
    <div
      ref={root}
      className={styles.wrap}
      dangerouslySetInnerHTML={{ __html: markup(src, poster) }}
    />
  );
}

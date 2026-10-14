"use client";

import Image from "next/image";
import { useState } from "react";

import type { ReactNode } from "react";

import ui from "./ui.module.css";

type LazyImageProps = {
  readonly src: string;
  readonly sizes: string;
  readonly pos?: string | undefined;
  readonly alt?: string;
  readonly className?: string;
  /** Above-the-fold images load straight away instead of waiting for the viewport. */
  readonly eager?: boolean;
};

/**
 * A cover image that fills its positioned parent. It loads lazily as an optimised,
 * resized AVIF/WebP and fades in over a shimmering skeleton once it arrives.
 */
export function LazyImage({
  src,
  sizes,
  pos,
  alt = "",
  className = "",
  eager = false,
}: LazyImageProps): ReactNode {
  const [loaded, setLoaded] = useState(eager);
  return (
    <div className={`${ui.fill} ${loaded ? "" : ui.skeleton} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        draggable={false}
        className={loaded ? ui.imageIn : ui.image}
        style={{ objectPosition: pos ?? "center" }}
        onLoad={() => {
          setLoaded(true);
        }}
        onError={() => {
          setLoaded(true);
        }}
      />
    </div>
  );
}

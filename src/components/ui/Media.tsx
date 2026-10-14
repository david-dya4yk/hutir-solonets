import { LazyImage } from "./LazyImage";

import type { ReactNode } from "react";

import ui from "./ui.module.css";

type MediaProps = {
  readonly className: string;
  readonly src?: string;
  readonly pos?: string;
  readonly sizes?: string;
  readonly parallax?: number;
  readonly deep?: boolean;
  readonly zoom?: boolean;
  readonly reveal?: boolean;
  readonly children?: ReactNode;
};

export function Media({
  className,
  src,
  pos,
  sizes = "(max-width: 899px) 100vw, 50vw",
  parallax,
  deep = false,
  zoom = false,
  reveal = true,
  children,
}: MediaProps): ReactNode {
  const image = src === undefined ? null : <LazyImage src={src} sizes={sizes} pos={pos} />;
  const look = src === undefined ? ui.stripes : "";
  const layer =
    parallax === undefined ? (
      <div className={`${ui.fill} ${look} ${zoom ? ui.zoom : ""}`}>{image}</div>
    ) : (
      <div className={ui.parallax} data-parallax={parallax}>
        <div className={`${deep ? ui.parallaxDeep : ui.parallaxInner} ${look}`}>{image}</div>
      </div>
    );
  return (
    <div
      className={`${ui.frame} ${zoom ? ui.zoomHost : ""} ${className}`}
      data-reveal={reveal ? "" : undefined}
    >
      {layer}
      {children}
    </div>
  );
}

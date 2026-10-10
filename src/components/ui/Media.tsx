import type { ReactNode } from "react";

import ui from "./ui.module.css";

type MediaProps = {
  readonly className: string;
  readonly src?: string;
  readonly pos?: string;
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
  parallax,
  deep = false,
  zoom = false,
  reveal = true,
  children,
}: MediaProps): ReactNode {
  const look = src === undefined ? ui.stripes : ui.photo;
  const style = src === undefined ? undefined : { "--src": `url('${src}')`, "--pos": pos };
  const layer =
    parallax === undefined ? (
      <div className={`${ui.fill} ${look} ${zoom ? ui.zoom : ""}`} style={style} />
    ) : (
      <div className={ui.parallax} data-parallax={parallax}>
        <div className={`${deep ? ui.parallaxDeep : ui.parallaxInner} ${look}`} style={style} />
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

import Image from "next/image";

import type { CottagePhoto as Photo } from "@/content/site";
import type { ReactNode } from "react";

import ui from "../ui/ui.module.css";

export function CottagePhoto({
  photo,
  alt,
  sizes,
}: {
  readonly photo: Photo | undefined;
  readonly alt: string;
  readonly sizes: string;
}): ReactNode {
  if (photo === undefined) {
    return <div className={`${ui.fill} ${ui.stripes} ${ui.zoom}`} />;
  }
  return (
    <Image
      src={photo.src}
      alt={alt}
      fill
      sizes={sizes}
      className={ui.zoom}
      style={{ objectFit: "cover", objectPosition: photo.position ?? "center" }}
    />
  );
}

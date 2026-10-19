"use client";

import Link from "next/link";

import { Carousel } from "@/components/ui/Carousel";

import { CottagePhoto } from "./CottagePhoto";

import type { CottagePhoto as Photo } from "@/content/site";
import type { ReactNode } from "react";

import styles from "./OtherCottages.module.css";
import carousel from "../ui/Carousel.module.css";
import ui from "../ui/ui.module.css";

export type OtherCottage = {
  readonly n: number;
  readonly href: string;
  readonly title: string;
  readonly meta: string;
  readonly photo: Photo | undefined;
  readonly alt: string;
};

export function OtherCottages({ items }: { readonly items: readonly OtherCottage[] }): ReactNode {
  return (
    <Carousel
      items={items}
      render={(c, slot, key) => (
        <Link
          key={key}
          href={c.href}
          className={`${slot.className} ${ui.zoomHost} ${styles.card}`}
          aria-hidden={slot.hidden ? true : undefined}
          tabIndex={slot.hidden ? -1 : undefined}
          onClick={(e) => {
            if (slot.select !== undefined) {
              e.preventDefault();
              slot.select();
            }
          }}
        >
          <CottagePhoto photo={c.photo} alt={c.alt} sizes="(max-width: 899px) 70vw, 620px" />
          <div className={ui.shadeLight} />
          <div className={`${styles.text} ${carousel.fade}`}>
            <span className={styles.title}>{c.title}</span>
            <span className={styles.meta}>{c.meta}</span>
          </div>
        </Link>
      )}
    />
  );
}

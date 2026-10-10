import Link from "next/link";

import { Lines } from "@/components/ui/Lines";
import { COTTAGES, cottageHref, cottageMeta, cottageTitle, pad } from "@/content/site";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export const metadata: Metadata = {
  title: "Котеджі",
  description: "Сім котеджів для 8–12 гостей серед лісу у Мигове.",
};

export default function CottagesPage(): ReactNode {
  return (
    <section className={`${ui.pageTop} ${styles.page}`}>
      <div className={styles.head}>
        <Lines as="h1" className={ui.displayLg} lines={["Котеджі.", "Обирайте свій."]} />
        <p className={ui.lead} data-reveal="">
          Будинки для 8–12 гостей. Оберіть свій і залиште заявку — ми передзвонимо та підтвердимо
          дати.
        </p>
      </div>
      <div className={styles.grid}>
        {COTTAGES.map((c) => (
          <article key={c.n} className={styles.card} data-reveal="">
            <Link href={cottageHref(c)} className={`${ui.frame} ${ui.zoomHost} ${styles.photo}`}>
              <div className={`${ui.fill} ${ui.stripes} ${ui.zoom}`} />
              <span className={ui.tag}>№ {pad(c.n)}</span>
              <span className={ui.caption}>
                фото · будинок {c.n}, {c.shot}
              </span>
            </Link>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{cottageTitle(c)}</h3>
              <span className={styles.meta}>{cottageMeta(c)}</span>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.price}>
                від 14 000 грн <span className={styles.per}>/ доба</span>
              </span>
              <Link href={cottageHref(c)} className={ui.btnSm}>
                Дізнатись більше
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

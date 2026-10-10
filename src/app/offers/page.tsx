import { BookButton } from "@/components/booking/BookButton";
import { Lines } from "@/components/ui/Lines";
import { OFFERS, pad } from "@/content/site";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export const metadata: Metadata = {
  title: "Пропозиції",
  description: "Акції, сезонні пропозиції та подарункові сертифікати.",
};

export default function OffersPage(): ReactNode {
  return (
    <>
      <section className={ui.pageTop}>
        <div className={styles.head}>
          <Lines as="h1" className={ui.displayLg} lines={["Привід приїхати", "трохи раніше."]} />
          <p className={ui.lead} data-reveal="">
            Акції, сезонні пропозиції та подарункові сертифікати. Умови уточнимо під час дзвінка.
          </p>
        </div>
      </section>
      <div className={`${ui.container} ${styles.groups}`}>
        {OFFERS.map((g, i) => (
          <section key={g.title} className={styles.group}>
            <div className={styles.groupHead} data-reveal="">
              <span className={styles.num}>{pad(i + 1)}</span>
              <h2 className={styles.groupTitle}>{g.title}</h2>
            </div>
            <div className={styles.grid}>
              {g.items.map((o) => (
                <article key={o.title} className={styles.card} data-reveal="">
                  <div className={`${ui.frame} ${ui.zoomHost} ${styles.photo}`}>
                    <div className={`${ui.fill} ${ui.stripes} ${ui.zoom}`} />
                    <span className={ui.tag}>{o.tag}</span>
                    <span className={ui.caption}>фото · {o.shot}</span>
                  </div>
                  <h3 className={styles.title}>{o.title}</h3>
                  <p className={styles.text}>{o.text}</p>
                  <BookButton
                    className={`${ui.btnMd} ${styles.cta}`}
                    comment={
                      o.cert ? `Подарунковий сертифікат: ${o.title}` : `Пропозиція: ${o.title}`
                    }
                  >
                    {o.cta}
                  </BookButton>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

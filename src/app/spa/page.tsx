import { BookButton } from "@/components/booking/BookButton";
import { Lines } from "@/components/ui/Lines";
import { Slides } from "@/components/ui/Slides";
import { SPA } from "@/content/site";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export const metadata: Metadata = {
  title: "SPA і басейни",
  description: "Два криті басейни, відкритий басейн, джакузі та чан на дровах.",
};

export default function SpaPage(): ReactNode {
  return (
    <>
      <section className={styles.hero}>
        <div className={ui.parallax} data-parallax="0.25">
          <div className={`${ui.parallaxDeep} ${ui.stripes}`} />
        </div>
        <div className={styles.heroShade} />
        <span className={ui.captionTopRight}>фото · криті басейни або пара над чаном</span>
        <span className={styles.eyebrow} data-reveal="">
          SPA-зона
        </span>
        <Lines as="h1" className={styles.heroTitle} lines={["Вода, пара", "і тиша."]} />
        <p className={styles.heroLead} data-reveal="">
          Три басейни, джакузі і чан на дровах — кілька кроків від вашого будинку. Тут приємно
          провести і ранок, і пізній вечір.
        </p>
      </section>
      <div className={styles.blocks}>
        {SPA.map((s, i) => (
          <section
            key={s.title}
            className={`${styles.block} ${i % 2 === 1 ? styles.blockAlt : ""}`}
          >
            <div className={`${ui.frame} ${styles.media}`} data-reveal="">
              <Slides
                segments="inset"
                labels={s.slides.map((l) => `фото · ${l}`)}
                captionClass={styles.slideCaption}
              />
            </div>
            <div className={styles.text} data-reveal="">
              <span className={styles.blockEyebrow}>{s.eyebrow}</span>
              <h2 className={styles.blockTitle}>{s.title}</h2>
              <p className={ui.body}>{s.text}</p>
            </div>
          </section>
        ))}
      </div>
      <section className={`${ui.section} ${styles.cta}`}>
        <Lines className={ui.displayMd} lines={["Оберіть дати.", "Решту ми підготуємо."]} />
        <BookButton className={ui.btnLg} magnet reveal />
      </section>
    </>
  );
}

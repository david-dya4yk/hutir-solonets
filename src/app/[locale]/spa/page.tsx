import { BookButton } from "@/components/booking/BookButton";
import { Lines } from "@/components/ui/Lines";
import { Slides } from "@/components/ui/Slides";
import { getContent } from "@/content";
import { getI18n, initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export async function generateMetadata(props: PageProps<"/[locale]/spa">): Promise<Metadata> {
  await initLocale(props.params);
  const t = await getI18n();
  return { title: t("meta.spaTitle"), description: t("meta.spaDescription") };
}

export default async function SpaPage(props: PageProps<"/[locale]/spa">): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  const { spa } = getContent(locale);
  return (
    <>
      <section className={styles.hero}>
        <div className={ui.parallax} data-parallax="0.25">
          <div className={`${ui.parallaxDeep} ${ui.stripes}`} />
        </div>
        <div className={styles.heroShade} />
        <span className={ui.captionTopRight}>{t("common.photo", { label: t("spa.caption") })}</span>
        <span className={styles.eyebrow} data-reveal="">
          {t("spa.eyebrow")}
        </span>
        <Lines as="h1" className={styles.heroTitle} lines={[t("spa.title1"), t("spa.title2")]} />
        <p className={styles.heroLead} data-reveal="">
          {t("spa.lead")}
        </p>
      </section>
      <div className={styles.blocks}>
        {spa.map((s, i) => (
          <section
            key={s.title}
            className={`${styles.block} ${i % 2 === 1 ? styles.blockAlt : ""}`}
          >
            <div className={`${ui.frame} ${styles.media}`} data-reveal="">
              <Slides
                segments="inset"
                labels={s.slides.map((l) => t("common.photo", { label: l }))}
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
        <Lines className={ui.displayMd} lines={[t("spa.cta1"), t("spa.cta2")]} />
        <BookButton className={ui.btnLg} magnet reveal />
      </section>
    </>
  );
}

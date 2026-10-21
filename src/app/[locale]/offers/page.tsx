import { redirect } from "next/navigation";

import { BookButton } from "@/components/booking/BookButton";
import { Lines } from "@/components/ui/Lines";
import { getContent } from "@/content";
import { OFFERS_ENABLED, pad } from "@/content/site";
import { alternates } from "@/lib/seo";
import { localePath } from "@/locales/config";
import { getI18n, initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export async function generateMetadata(props: PageProps<"/[locale]/offers">): Promise<Metadata> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  return {
    title: t("meta.offersTitle"),
    description: t("meta.offersDescription"),
    alternates: alternates(locale, "/offers"),
  };
}

export default async function OffersPage(props: PageProps<"/[locale]/offers">): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  if (!OFFERS_ENABLED) {
    redirect(localePath(locale, "/"));
  }
  const t = await getI18n();
  const { offers } = getContent(locale);
  return (
    <>
      <section className={ui.pageTop}>
        <div className={styles.head}>
          <Lines
            as="h1"
            className={ui.displayLg}
            lines={[t("offers.title1"), t("offers.title2")]}
          />
          <p className={ui.lead} data-reveal="">
            {t("offers.lead")}
          </p>
        </div>
      </section>
      <div className={`${ui.container} ${styles.groups}`}>
        {offers.map((g, i) => (
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
                    <span className={ui.caption}>{t("common.photo", { label: o.shot })}</span>
                  </div>
                  <h3 className={styles.title}>{o.title}</h3>
                  <p className={styles.text}>{o.text}</p>
                  <BookButton
                    className={`${ui.btnMd} ${styles.cta}`}
                    comment={
                      o.cert
                        ? t("offers.certComment", { title: o.title })
                        : t("offers.offerComment", { title: o.title })
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

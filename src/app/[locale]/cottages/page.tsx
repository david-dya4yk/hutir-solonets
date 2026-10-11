import Link from "next/link";

import { Lines } from "@/components/ui/Lines";
import { getContent } from "@/content";
import { cottageHref, pad, PRICE_PER_NIGHT } from "@/content/site";
import { formatPrice, localePath } from "@/locales/config";
import { getI18n, initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export async function generateMetadata(props: PageProps<"/[locale]/cottages">): Promise<Metadata> {
  await initLocale(props.params);
  const t = await getI18n();
  return { title: t("meta.cottagesTitle"), description: t("meta.cottagesDescription") };
}

export default async function CottagesPage(
  props: PageProps<"/[locale]/cottages">,
): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  const { cottages } = getContent(locale);
  return (
    <section className={`${ui.pageTop} ${styles.page}`}>
      <div className={styles.head}>
        <Lines
          as="h1"
          className={ui.displayLg}
          lines={[t("cottages.title1"), t("cottages.title2")]}
        />
        <p className={ui.lead} data-reveal="">
          {t("cottages.lead")}
        </p>
      </div>
      <div className={styles.grid}>
        {cottages.map((c) => (
          <article key={c.n} className={styles.card} data-reveal="">
            <Link
              href={localePath(locale, cottageHref(c))}
              className={`${ui.frame} ${ui.zoomHost} ${styles.photo}`}
            >
              <div className={`${ui.fill} ${ui.stripes} ${ui.zoom}`} />
              <span className={ui.tag}>№ {pad(c.n)}</span>
              <span className={ui.caption}>
                {t("common.photo", { label: t("cottages.shot", { n: c.n, shot: c.shot }) })}
              </span>
            </Link>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{t("common.cottage", { n: pad(c.n) })}</h3>
              <span className={styles.meta}>
                {t("common.area", { n: c.area })} · {t("common.upToGuests", { n: c.guests })}
              </span>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.price}>
                {t("common.from", { price: formatPrice(locale, PRICE_PER_NIGHT) })}{" "}
                <span className={styles.per}>{t("common.perNight")}</span>
              </span>
              <Link href={localePath(locale, cottageHref(c))} className={ui.btnSm}>
                {t("cottages.more")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

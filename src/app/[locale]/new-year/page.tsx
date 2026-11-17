import Link from "next/link";

import { BookButton } from "@/components/booking/BookButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { LazyImage } from "@/components/ui/LazyImage";
import { getContent } from "@/content";
import { cottageHref, NEW_YEAR, pad } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { alternates } from "@/lib/seo";
import { formatPrice, localePath } from "@/locales/config";
import { getI18n, initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "@/components/blog/Blog.module.css";
import ui from "@/components/ui/ui.module.css";

const PATH = "/new-year";
const WHY = ["newYear.why1", "newYear.why2", "newYear.why3", "newYear.why4"] as const;

export async function generateMetadata(props: PageProps<"/[locale]/new-year">): Promise<Metadata> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  const title = t("newYear.metaTitle");
  const description = t("newYear.metaDescription", {
    price: formatPrice(locale, NEW_YEAR.pricePerNight),
  });
  return {
    title,
    description,
    alternates: alternates(locale, PATH),
    openGraph: { title, description, images: [{ url: NEW_YEAR.cover, alt: title }] },
  };
}

export default async function NewYearPage(
  props: PageProps<"/[locale]/new-year">,
): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  const cottages = getContent(locale).cottages.filter((c) => NEW_YEAR.cottages.includes(c.n));
  const price = (n: number): string => formatPrice(locale, n);
  return (
    <article className={styles.article}>
      <JsonLd
        data={breadcrumbSchema([
          [t("nav.home"), localePath(locale, "/")],
          [t("newYear.title"), localePath(locale, PATH)],
        ])}
      />
      <header className={styles.head}>
        <span className={styles.date}>{t("newYear.eyebrow")}</span>
        <h1 className={styles.title}>{t("newYear.title")}</h1>
        <p className={styles.lead}>{t("newYear.lead")}</p>
      </header>
      <div className={styles.hero}>
        <LazyImage
          src={NEW_YEAR.cover}
          sizes="(max-width: 899px) 100vw, 860px"
          alt={t("newYear.title")}
          eager
        />
      </div>
      <div className={ui.rowList}>
        <div className={ui.row}>
          <span>{t("newYear.priceLabel")}</span>
          <span className={ui.strong}>{price(NEW_YEAR.pricePerNight)}</span>
        </div>
        <div className={ui.row}>
          <span>{t("newYear.minLabel")}</span>
          <span className={ui.strong}>{t("newYear.minValue")}</span>
        </div>
        <div className={ui.row}>
          <span>{t("newYear.totalLabel")}</span>
          <span className={ui.strong}>
            {t("newYear.totalValue", {
              price: price(NEW_YEAR.pricePerNight * NEW_YEAR.minNights),
            })}
          </span>
        </div>
      </div>
      <p className={styles.p}>{t("newYear.note")}</p>
      <BookButton className={`${ui.btn} ${styles.cta}`}>{t("newYear.cta")}</BookButton>
      <section className={styles.body}>
        <h2 className={styles.h2}>{t("newYear.whyTitle")}</h2>
        {WHY.map((key) => (
          <p key={key} className={styles.p}>
            {t(key)}
          </p>
        ))}
      </section>
      <section className={styles.body}>
        <h2 className={styles.h2}>{t("newYear.cottagesTitle")}</h2>
        <div className={ui.rowList}>
          {cottages.map((c) => (
            <Link key={c.n} href={localePath(locale, cottageHref(c))} className={ui.row}>
              <span className={ui.strong}>{t("common.cottage", { n: pad(c.n) })}</span>
              <span>{t("newYear.cottageRow", { guests: c.guests, area: c.area })}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.body}>
        <h2 className={styles.h2}>{t("newYear.bookTitle")}</h2>
        <p className={styles.p}>{t("newYear.book")}</p>
      </section>
      <BookButton className={`${ui.btn} ${styles.cta}`}>{t("newYear.cta")}</BookButton>
    </article>
  );
}

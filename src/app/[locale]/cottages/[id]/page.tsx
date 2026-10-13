import Link from "next/link";
import { notFound } from "next/navigation";

import { BookButton } from "@/components/booking/BookButton";
import { CottagePhoto } from "@/components/cottage/CottagePhoto";
import { RoomTabs } from "@/components/cottage/RoomTabs";
import { Lines } from "@/components/ui/Lines";
import { Slides } from "@/components/ui/Slides";
import { findCottage, getContent } from "@/content";
import { COTTAGE_SPECS, cottageHref, pad, PRICE_PER_NIGHT } from "@/content/site";
import { formatPrice, LOCALES, localePath } from "@/locales/config";
import { getI18n, initLocale } from "@/locales/server";

import type { CottagePhoto as CottagePhotoData } from "@/content/site";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export function generateStaticParams(): { locale: string; id: string }[] {
  return LOCALES.flatMap((locale) => COTTAGE_SPECS.map((c) => ({ locale, id: String(c.n) })));
}

export async function generateMetadata(
  props: PageProps<"/[locale]/cottages/[id]">,
): Promise<Metadata> {
  const locale = await initLocale(props.params);
  const { id } = await props.params;
  const t = await getI18n();
  const c = findCottage(getContent(locale), Number(id));
  return c === undefined
    ? {}
    : { title: t("common.cottage", { n: pad(c.n) }), description: c.desc };
}

const ICONS = {
  area: "https://unpkg.com/lucide-static@0.460.0/icons/ruler.svg",
  guests: "https://unpkg.com/lucide-static@0.460.0/icons/users.svg",
  beds: "https://unpkg.com/lucide-static@0.460.0/icons/bed-double.svg",
  price: "https://unpkg.com/lucide-static@0.460.0/icons/wallet.svg",
} as const;

function Spec({
  icon,
  label,
  children,
}: {
  readonly icon: string;
  readonly label: string;
  readonly children: ReactNode;
}): ReactNode {
  return (
    <div className={ui.row}>
      <span
        role="img"
        aria-label={label}
        title={label}
        className={styles.icon}
        style={{ "--icon": `url('${icon}')` }}
      />
      {children}
    </div>
  );
}

export default async function CottagePage(
  props: PageProps<"/[locale]/cottages/[id]">,
): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  const { id } = await props.params;
  const t = await getI18n();
  const content = getContent(locale);
  const { cottages } = content;
  const cur = findCottage(content, Number(id));
  if (cur === undefined) {
    notFound();
  }
  const idx = cottages.indexOf(cur);
  const others = [1, 2, 3]
    .map((k) => cottages[(idx + k) % cottages.length])
    .filter((c) => c !== undefined);
  const titleOf = (n: number): string => t("common.cottage", { n: pad(n) });
  const metaOf = (c: { readonly area: number; readonly guests: number }): string =>
    `${t("common.area", { n: c.area })} · ${t("common.upToGuests", { n: c.guests })}`;
  const title = titleOf(cur.n);
  const price = formatPrice(locale, PRICE_PER_NIGHT);
  const positionOf = (p: { readonly position?: string }): { position?: string } =>
    p.position === undefined ? {} : { position: p.position };
  const altOf = (n: number, p: CottagePhotoData): string =>
    p.room === undefined
      ? t("cottages.photoAlt")
      : t("cottage.photoAlt", { cottage: titleOf(n), room: t(`cottage.rooms.${p.room}`) });
  const slides = cur.gallery ?? (cur.photo === undefined ? [] : [cur.photo]);

  return (
    <>
      <section className={styles.hero}>
        <Slides
          key={cur.n}
          shade
          segments="edge"
          captionClass={ui.captionTopRight}
          sizes="100vw"
          images={slides.map((p) => ({
            src: p.src,
            alt: altOf(cur.n, p),
            ...positionOf(p),
          }))}
          labels={
            cur.gallery === undefined
              ? [
                  t("common.photo", { label: t("cottages.shot", { n: cur.n, shot: cur.shot }) }),
                  t("common.photo", { label: t("cottage.shotLiving") }),
                  t("common.photo", { label: t("cottage.shotTerrace") }),
                  t("common.photo", { label: t("cottage.shotBedroom") }),
                ]
              : cur.gallery.map((p) => altOf(cur.n, p))
          }
        />
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{title}</h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.about}>
          <div className={styles.aboutText}>
            <Lines className={ui.displayMd} lines={[`${title}.`, cur.tagline]} />
            <p className={`${ui.body} ${styles.desc}`} data-reveal="">
              {cur.desc} {t("cottage.included")}
            </p>
          </div>
          <div className={ui.rowList} data-reveal="">
            <Spec icon={ICONS.area} label={t("cottage.area")}>
              <span className={ui.strong}>{t("common.area", { n: cur.area })}</span>
            </Spec>
            <Spec icon={ICONS.guests} label={t("cottage.guests")}>
              <span className={ui.strong}>{t("common.upTo", { n: cur.guests })}</span>
            </Spec>
            <Spec icon={ICONS.beds} label={t("cottage.bedrooms")}>
              <span className={ui.strong}>{cur.beds}</span>
            </Spec>
            <Spec icon={ICONS.price} label={t("cottage.price")}>
              <span className={styles.price}>
                {price} <span className={styles.per}>{t("common.perNight")}</span>
              </span>
            </Spec>
            <BookButton className={`${ui.btnLg} ${styles.book}`} cottage={cur.n} magnet>
              {t("cottage.book", { n: pad(cur.n) })}
            </BookButton>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Lines
          className={styles.amenTitle}
          lines={[t("cottage.amenities1"), t("cottage.amenities2")]}
        />
        <RoomTabs />
      </section>

      <section className={styles.othersSection}>
        <div className={ui.container}>
          <div className={styles.othersHead}>
            <Lines className={ui.displayMd} lines={[t("cottage.others1"), t("cottage.others2")]} />
            <Link
              href={localePath(locale, "/cottages")}
              className={`${ui.btn} ${styles.all}`}
              data-reveal=""
            >
              {t("cottage.all")}
            </Link>
          </div>
          <div className={styles.othersGrid}>
            {others.map((c) => (
              <Link
                key={c.n}
                href={localePath(locale, cottageHref(c))}
                className={`${ui.frame} ${ui.zoomHost} ${styles.other}`}
                data-reveal=""
              >
                <CottagePhoto
                  photo={c.photo}
                  alt={c.photo === undefined ? "" : altOf(c.n, c.photo)}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className={ui.shadeLight} />
                <div className={styles.otherText}>
                  <span className={styles.otherTitle}>{titleOf(c.n)}</span>
                  <span className={styles.otherMeta}>{metaOf(c)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

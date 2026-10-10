import Link from "next/link";
import { notFound } from "next/navigation";

import { BookButton } from "@/components/booking/BookButton";
import { RoomTabs } from "@/components/cottage/RoomTabs";
import { Lines } from "@/components/ui/Lines";
import { Slides } from "@/components/ui/Slides";
import { COTTAGES, cottageHref, cottageMeta, cottageTitle, findCottage, pad } from "@/content/site";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export function generateStaticParams(): { id: string }[] {
  return COTTAGES.map((c) => ({ id: String(c.n) }));
}

export async function generateMetadata(props: PageProps<"/cottages/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const c = findCottage(Number(id));
  return c === undefined ? {} : { title: cottageTitle(c), description: c.desc };
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

export default async function CottagePage(props: PageProps<"/cottages/[id]">): Promise<ReactNode> {
  const { id } = await props.params;
  const cur = findCottage(Number(id));
  if (cur === undefined) {
    notFound();
  }
  const idx = COTTAGES.indexOf(cur);
  const others = [1, 2, 3]
    .map((k) => COTTAGES[(idx + k) % COTTAGES.length])
    .filter((c) => c !== undefined);
  const title = cottageTitle(cur);

  return (
    <>
      <section className={styles.hero}>
        <Slides
          key={cur.n}
          shade
          segments="edge"
          captionClass={ui.captionTopRight}
          labels={[
            `фото · будинок ${String(cur.n)}, ${cur.shot}`,
            "фото · вітальня у вечірньому світлі",
            "фото · тераса з видом на гори",
            "фото · спальня в теплих тонах",
          ]}
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
              {cur.desc} Будинок орендується повністю — постільна білизна, рушники й паркінг уже
              входять у вартість.
            </p>
          </div>
          <div className={ui.rowList} data-reveal="">
            <Spec icon={ICONS.area} label="Площа">
              <span className={ui.strong}>{cur.area} м²</span>
            </Spec>
            <Spec icon={ICONS.guests} label="Гостей">
              <span className={ui.strong}>до {cur.guests}</span>
            </Spec>
            <Spec icon={ICONS.beds} label="Спальні">
              <span className={ui.strong}>{cur.beds}</span>
            </Spec>
            <Spec icon={ICONS.price} label="Вартість">
              <span className={styles.price}>
                14 000 грн <span className={styles.per}>/ доба</span>
              </span>
            </Spec>
            <BookButton className={`${ui.btnLg} ${styles.book}`} cottage={cur.n} magnet>
              Забронювати будинок {pad(cur.n)}
            </BookButton>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Lines className={styles.amenTitle} lines={["Зручності", "у кожному будинку."]} />
        <RoomTabs />
      </section>

      <section className={styles.othersSection}>
        <div className={ui.container}>
          <div className={styles.othersHead}>
            <Lines className={ui.displayMd} lines={["Інші", "котеджі."]} />
            <Link href="/cottages" className={`${ui.btn} ${styles.all}`} data-reveal="">
              Усі котеджі
            </Link>
          </div>
          <div className={styles.othersGrid}>
            {others.map((c) => (
              <Link
                key={c.n}
                href={cottageHref(c)}
                className={`${ui.frame} ${ui.zoomHost} ${styles.other}`}
                data-reveal=""
              >
                <div className={`${ui.fill} ${ui.stripes} ${ui.zoom}`} />
                <div className={ui.shadeLight} />
                <div className={styles.otherText}>
                  <span className={styles.otherTitle}>{cottageTitle(c)}</span>
                  <span className={styles.otherMeta}>{cottageMeta(c)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

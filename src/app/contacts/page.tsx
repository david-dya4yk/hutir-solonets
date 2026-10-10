import { ContactSection } from "@/components/forms/ContactSection";
import { Lines } from "@/components/ui/Lines";
import {
  EMAIL,
  MAP_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_HREF,
  ROUTE_HREF,
  SOCIALS,
} from "@/content/site";

import { GoogleRating } from "./GoogleRating";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Телефон, месенджери та як дістатися до Хутора Солонець у Мигове.",
};

export default function ContactsPage(): ReactNode {
  return (
    <>
      <ContactSection pageTop />

      <section className={styles.top}>
        <div className={styles.split}>
          <div className={styles.intro}>
            <Lines className={ui.display} lines={["Як з нами", "зв’язатися."]} />
            <p className={`${ui.body} ${styles.introText}`} data-reveal="">
              Пишіть у зручний месенджер або телефонуйте — допоможемо обрати будинок і дати.
            </p>
          </div>
          <div className={ui.rowList} data-reveal="">
            <a href={PHONE_HREF} className={ui.row}>
              <span>Телефон</span>
              <span className={ui.strong}>{PHONE_DISPLAY}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className={ui.row}>
              <span>Email</span>
              <span className={ui.strong}>{EMAIL}</span>
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                className={`${ui.row} ${styles.social}`}
              >
                <span>{s.label}</span>
                <span className={ui.strong}>{s.handle} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={`${ui.frame} ${styles.map}`} data-reveal="">
          <iframe
            src={MAP_EMBED_SRC}
            title="Хутір Солонець на Google Maps"
            className={styles.iframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Як нас знайти</h3>
            <p className={styles.cardText}>
              с. Мигове, вул. Солоницька
              <br />
              Вижницький район, Чернівецька область
              <br />
              Близько 60 км від Чернівців
            </p>
            <a
              href={ROUTE_HREF}
              target="_blank"
              rel="noopener"
              className={`${ui.btnMd} ${styles.route}`}
            >
              Прокласти маршрут ↗
            </a>
          </div>
        </div>
      </section>

      <GoogleRating />
    </>
  );
}

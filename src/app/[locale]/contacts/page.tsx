import { ContactSection } from "@/components/forms/ContactSection";
import { Lines } from "@/components/ui/Lines";
import { EMAIL, mapEmbedSrc, PHONE_DISPLAY, PHONE_HREF, ROUTE_HREF, SOCIALS } from "@/content/site";
import { getI18n, initLocale } from "@/locales/server";

import { GoogleRating } from "./GoogleRating";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export async function generateMetadata(props: PageProps<"/[locale]/contacts">): Promise<Metadata> {
  await initLocale(props.params);
  const t = await getI18n();
  return { title: t("meta.contactsTitle"), description: t("meta.contactsDescription") };
}

export default async function ContactsPage(
  props: PageProps<"/[locale]/contacts">,
): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  return (
    <>
      <ContactSection pageTop />

      <section className={styles.top}>
        <div className={styles.split}>
          <div className={styles.intro}>
            <Lines className={ui.display} lines={[t("contacts.title1"), t("contacts.title2")]} />
            <p className={`${ui.body} ${styles.introText}`} data-reveal="">
              {t("contacts.lead")}
            </p>
          </div>
          <div className={ui.rowList} data-reveal="">
            <a href={PHONE_HREF} className={`${ui.row} ${styles.link}`}>
              <span>{t("common.phone")}</span>
              <span className={ui.strong}>{PHONE_DISPLAY}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className={`${ui.row} ${styles.link}`}>
              <span>{t("contacts.email")}</span>
              <span className={ui.strong}>{EMAIL}</span>
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                className={`${ui.row} ${styles.link}`}
              >
                <span>{s.label}</span>
                <span className={ui.strong}>{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={`${ui.frame} ${styles.map}`} data-reveal="">
          <iframe
            src={mapEmbedSrc(locale)}
            title={t("contacts.mapTitle")}
            className={styles.iframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t("contacts.find")}</h3>
            <p className={styles.cardText}>
              {t("address.street")}
              <br />
              {t("address.district")}
              <br />
              {t("address.distance")}
            </p>
            <a
              href={ROUTE_HREF}
              target="_blank"
              rel="noopener"
              className={`${ui.btnMd} ${styles.route}`}
            >
              {t("common.route")}
            </a>
          </div>
        </div>
      </section>

      <GoogleRating locale={locale} />
    </>
  );
}

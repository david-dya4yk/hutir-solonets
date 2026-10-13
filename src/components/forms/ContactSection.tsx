"use client";

import Link from "next/link";
import { useState } from "react";

import { useI18n, useLocalePath } from "@/locales/client";

import { BookingForm } from "./BookingForm";

import type { ReactNode } from "react";

import styles from "./ContactSection.module.css";
import ui from "../ui/ui.module.css";

export function ContactSection({ pageTop = false }: { readonly pageTop?: boolean }): ReactNode {
  const [sent, setSent] = useState(false);
  const t = useI18n();
  const lp = useLocalePath();

  return (
    <section className={styles.section}>
      <div className={ui.parallax} data-parallax="0.12">
        <div className={`${styles.bg} ${pageTop ? "" : styles.bgHome}`} />
      </div>
      <div className={styles.shade} />
      <div className={`${styles.inner} ${pageTop ? styles.innerTop : ""}`}>
        <div className={styles.copy}>
          <h2 className={styles.title} data-reveal="lines">
            <span className={ui.line}>{t("contactForm.title1")}</span>
            <span className={ui.line}>{t("contactForm.title2")}</span>
          </h2>
          <p className={ui.lead} data-reveal="">
            {t("contactForm.lead")}
          </p>
        </div>
        <div className={styles.card} data-reveal="">
          {sent ? (
            <div className={styles.done}>
              <h3 className={styles.doneTitle}>
                {t("contactForm.thanks")} <span>{t("contactForm.received")}</span>
              </h3>
              <p className={styles.doneText}>{t("contactForm.doneText")}</p>
            </div>
          ) : (
            <BookingForm
              onSent={() => {
                setSent(true);
              }}
              consent={t("booking.consent", {
                privacy: (
                  <Link href={lp("/privacy")} className={ui.textLink}>
                    {t("common.privacyLink")}
                  </Link>
                ),
                terms: (
                  <Link href={lp("/terms")} className={ui.textLink}>
                    {t("common.termsLink")}
                  </Link>
                ),
              })}
            />
          )}
        </div>
      </div>
    </section>
  );
}

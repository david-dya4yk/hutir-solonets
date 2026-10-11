"use client";

import Link from "next/link";
import { useState } from "react";

import { useI18n, useLocalePath } from "@/locales/client";

import { DatePicker } from "./DatePicker";

import type { ChangeEvent, SubmitEvent, ReactNode } from "react";

import styles from "./ContactSection.module.css";
import fields from "./fields.module.css";
import ui from "../ui/ui.module.css";

type Contact = {
  name: string;
  phone: string;
  checkin: string;
  guests: string;
  message: string;
};

const GUESTS = Array.from({ length: 12 }, (_, i) => String(i + 1));

export function ContactSection({ pageTop = false }: { readonly pageTop?: boolean }): ReactNode {
  const [contact, setContact] = useState<Contact>({
    name: "",
    phone: "",
    checkin: "",
    guests: "8",
    message: "",
  });
  const [bad, setBad] = useState({ name: false, phone: false });
  const [sent, setSent] = useState(false);
  const [picker, setPicker] = useState(false);
  const t = useI18n();
  const lp = useLocalePath();

  const onField = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setContact((c) => ({ ...c, [name]: value }));
  };

  const submit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const er = {
      name: contact.name.trim() === "",
      phone: contact.phone.replace(/\D/g, "").length < 10,
    };
    setBad(er);
    setSent(!er.name && !er.phone);
  };

  return (
    <section className={styles.section}>
      <div className={ui.parallax} data-parallax="0.12">
        <div className={styles.bg} />
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
            <form className={styles.form} onSubmit={submit} noValidate>
              <label className={styles.label}>
                {t("common.name")}
                <input
                  name="name"
                  value={contact.name}
                  onChange={onField}
                  placeholder={t("common.namePlaceholder")}
                  autoComplete="name"
                  className={`${fields.inputTall} ${bad.name ? fields.invalid : ""}`}
                />
              </label>
              <label className={styles.label}>
                {t("common.phone")}
                <input
                  name="phone"
                  type="tel"
                  value={contact.phone}
                  onChange={onField}
                  placeholder="+380 __ ___ __ __"
                  autoComplete="tel"
                  className={`${fields.inputTall} ${bad.phone ? fields.invalid : ""}`}
                />
              </label>
              <DatePicker
                label={t("common.checkin")}
                value={contact.checkin}
                min={null}
                open={picker}
                compact
                onOpenChange={setPicker}
                onPick={(v) => {
                  setContact((c) => ({ ...c, checkin: v }));
                  setPicker(false);
                }}
              />
              <label className={styles.label}>
                {t("common.guests")}
                <select
                  name="guests"
                  value={contact.guests}
                  onChange={onField}
                  className={fields.selectTall}
                >
                  {GUESTS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </label>
              <label className={fields.labelWide}>
                {t("contactForm.more")}
                <textarea
                  name="message"
                  value={contact.message}
                  onChange={onField}
                  rows={3}
                  placeholder={t("contactForm.morePlaceholder")}
                  className={`${fields.textarea} ${styles.textarea}`}
                />
              </label>
              <span className={styles.error}>
                {bad.name || bad.phone ? t("contactForm.error") : ""}
              </span>
              <button type="submit" className={`${ui.btnBlock} ${styles.wide}`}>
                {t("common.sendRequest")}
              </button>
              <span className={`${fields.consent} ${styles.wide}`}>
                {t("contactForm.consent", {
                  privacy: (
                    <Link href={lp("/privacy")} className={ui.textLink}>
                      {t("common.privacyLink")}
                    </Link>
                  ),
                })}
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

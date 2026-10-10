"use client";

import Link from "next/link";
import { useState } from "react";

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
            <span className={ui.line}>Плануєте відпочинок?</span>
            <span className={ui.line}>Підберемо будинок і дати.</span>
          </h2>
          <p className={ui.lead} data-reveal="">
            Телефонуйте, пишіть у месенджери або залиште заявку. Відповідаємо самі.
          </p>
        </div>
        <div className={styles.card} data-reveal="">
          {sent ? (
            <div className={styles.done}>
              <h3 className={styles.doneTitle}>
                Дякуємо. <span>Заявку отримали.</span>
              </h3>
              <p className={styles.doneText}>
                Ми зателефонуємо вам для підтвердження — зазвичай протягом години.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit} noValidate>
              <label className={styles.label}>
                Ім’я
                <input
                  name="name"
                  value={contact.name}
                  onChange={onField}
                  placeholder="Олена"
                  autoComplete="name"
                  className={`${fields.inputTall} ${bad.name ? fields.invalid : ""}`}
                />
              </label>
              <label className={styles.label}>
                Телефон
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
                label="Заїзд"
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
                Гостей
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
                Щось іще?
                <textarea
                  name="message"
                  value={contact.message}
                  onChange={onField}
                  rows={3}
                  placeholder="Котедж, тварини, діти — необов’язково"
                  className={`${fields.textarea} ${styles.textarea}`}
                />
              </label>
              <span className={styles.error}>
                {bad.name || bad.phone ? "Вкажіть ім’я та номер телефону" : ""}
              </span>
              <button type="submit" className={`${ui.btnBlock} ${styles.wide}`}>
                Надіслати заявку
              </button>
              <span className={`${fields.consent} ${styles.wide}`}>
                Надсилаючи заявку, ви погоджуєтесь з{" "}
                <Link href="/privacy" className={ui.textLink}>
                  Політикою конфіденційності
                </Link>
                .
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

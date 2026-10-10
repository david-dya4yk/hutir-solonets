"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { COTTAGES, PRICE_PER_NIGHT, pad } from "@/content/site";
import { addDays, nightsBetween, nightsWord, shortLabel } from "@/lib/dates";

import { DatePicker } from "../forms/DatePicker";

import type { BookingRequest } from "./SiteProvider";
import type { ChangeEvent, SubmitEvent, ReactNode } from "react";

import styles from "./BookingModal.module.css";
import fields from "../forms/fields.module.css";
import ui from "../ui/ui.module.css";

type Form = {
  name: string;
  phone: string;
  checkin: string;
  checkout: string;
  guests: string;
  cottage: string;
  comment: string;
};

type Errors = Partial<Record<"name" | "phone" | "checkin" | "checkout", string | undefined>>;

type Picker = "in" | "out" | null;

const COTTAGE_OPTIONS = [
  { v: "any", l: "Будь-який вільний" },
  ...COTTAGES.map((c) => ({
    v: String(c.n),
    l: `Будинок ${pad(c.n)} · до ${String(c.guests)} гостей`,
  })),
];

const GUEST_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i + 1));

const validate = (f: Form): Errors => {
  const er: Errors = {};
  if (f.name.trim() === "") {
    er.name = "Вкажіть, як до вас звертатися";
  }
  if (f.phone.replace(/\D/g, "").length < 10) {
    er.phone = "Перевірте номер телефону";
  }
  if (f.checkin === "") {
    er.checkin = "Оберіть дату заїзду";
  }
  if (f.checkout === "") {
    er.checkout = "Оберіть дату виїзду";
  } else if (f.checkin !== "" && f.checkout <= f.checkin) {
    er.checkout = "Виїзд має бути пізніше заїзду";
  }
  return er;
};

const estimateOf = (f: Form): string => {
  if (f.checkin === "" || f.checkout === "" || f.checkout <= f.checkin) {
    return "";
  }
  const n = nightsBetween(f.checkin, f.checkout);
  return `${String(n)} ${nightsWord(n)} · орієнтовно ${(n * PRICE_PER_NIGHT).toLocaleString("uk-UA")} грн`;
};

export function BookingModal({
  request,
  onClosed,
}: {
  readonly request: BookingRequest;
  readonly onClosed: () => void;
}): ReactNode {
  const router = useRouter();
  const [shown, setShown] = useState(false);
  const [sent, setSent] = useState(false);
  const [picker, setPicker] = useState<Picker>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: "8",
    cottage: request.cottage === undefined ? "any" : String(request.cottage),
    comment: request.comment ?? "",
  });
  const closeTimer = useRef<number | undefined>(undefined);

  const close = (): void => {
    setShown(false);
    window.clearTimeout(closeTimer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = window.setTimeout(onClosed, reduced ? 0 : 700);
  };
  const onEscape = useEffectEvent(close);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setShown(true);
      });
    });
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      window.clearTimeout(closeTimer.current);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const onField = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const er = validate(form);
    setErrors(er);
    setSent(Object.keys(er).length === 0);
  };

  const goLegal = (href: string): void => {
    close();
    router.push(href);
  };

  const clip = `circle(${shown ? request.radius.toFixed(0) : "0"}px at ${request.x.toFixed(0)}px ${request.y.toFixed(0)}px)`;
  const cottageLabel = COTTAGE_OPTIONS.find((o) => o.v === form.cottage)?.l.split(" · ")[0] ?? "";
  const minOut = form.checkin === "" ? null : addDays(form.checkin, 1);
  const range = [form.checkin, form.checkout] as const;

  return (
    <div className={styles.overlay} style={{ clipPath: clip }}>
      <div className={styles.backdrop} onClick={close} aria-hidden="true" />
      <div className={styles.center}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Бронювання"
          className={`${styles.card} ${shown ? styles.cardShown : ""}`}
        >
          <button type="button" className={styles.close} aria-label="Закрити" onClick={close}>
            ×
          </button>
          {sent ? (
            <div className={styles.done}>
              <h2 className={styles.title}>
                Дякуємо, {form.name}. <span>Заявку отримали.</span>
              </h2>
              <p className={styles.doneLead}>Ми зателефонуємо вам для підтвердження.</p>
              <div className={ui.rowList}>
                <div className={styles.sumRow}>
                  <span>Дати</span>
                  <span className={ui.strong}>
                    {shortLabel(form.checkin)} — {shortLabel(form.checkout)}
                  </span>
                </div>
                <div className={styles.sumRow}>
                  <span>Котедж</span>
                  <span className={ui.strong}>{cottageLabel}</span>
                </div>
                <div className={styles.sumRow}>
                  <span>Гостей</span>
                  <span className={ui.strong}>{form.guests}</span>
                </div>
              </div>
              <button type="button" className={styles.doneBtn} onClick={close}>
                Закрити
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit} noValidate>
              <div className={styles.head}>
                <h2 className={styles.title}>
                  Бронювання. <span>Без передоплати.</span>
                </h2>
                <p className={styles.intro}>
                  Залиште заявку — перевіримо дати й зателефонуємо, щоб усе підтвердити.
                  Онлайн-оплати немає.
                </p>
              </div>
              <div className={styles.grid}>
                <label className={fields.label}>
                  Ім’я
                  <input
                    name="name"
                    value={form.name}
                    onChange={onField}
                    autoComplete="name"
                    placeholder="Олена"
                    className={`${fields.input} ${errors.name === undefined ? "" : fields.invalid}`}
                  />
                  <span className={fields.error}>{errors.name}</span>
                </label>
                <label className={fields.label}>
                  Телефон
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onField}
                    autoComplete="tel"
                    placeholder="+380 __ ___ __ __"
                    className={`${fields.input} ${errors.phone === undefined ? "" : fields.invalid}`}
                  />
                  <span className={fields.error}>{errors.phone}</span>
                </label>
                <DatePicker
                  label="Заїзд"
                  value={form.checkin}
                  min={null}
                  range={range}
                  open={picker === "in"}
                  onOpenChange={(o) => {
                    setPicker(o ? "in" : null);
                  }}
                  onPick={(v) => {
                    setForm((f) => ({
                      ...f,
                      checkin: v,
                      checkout: f.checkout !== "" && f.checkout <= v ? "" : f.checkout,
                    }));
                    setErrors((er) => ({ ...er, checkin: undefined }));
                    setPicker("out");
                  }}
                  error={errors.checkin ?? ""}
                  invalid={errors.checkin !== undefined}
                />
                <DatePicker
                  key={form.checkin}
                  label="Виїзд"
                  value={form.checkout}
                  min={minOut}
                  range={range}
                  align="right"
                  open={picker === "out"}
                  onOpenChange={(o) => {
                    setPicker(o ? "out" : null);
                  }}
                  onPick={(v) => {
                    setForm((f) => ({ ...f, checkout: v }));
                    setErrors((er) => ({ ...er, checkout: undefined }));
                    setPicker(null);
                  }}
                  error={errors.checkout ?? ""}
                  invalid={errors.checkout !== undefined}
                />
                <label className={fields.label}>
                  Гостей
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={onField}
                    className={fields.select}
                  >
                    {GUEST_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={fields.label}>
                  Котедж
                  <select
                    name="cottage"
                    value={form.cottage}
                    onChange={onField}
                    className={fields.select}
                  >
                    {COTTAGE_OPTIONS.map((o) => (
                      <option key={o.v} value={o.v}>
                        {o.l}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className={fields.label}>
                Коментар
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={onField}
                  rows={2}
                  placeholder="Діти, тварини, побажання щодо чану чи джакузі"
                  className={fields.textarea}
                />
              </label>
              <span className={styles.estimate}>{estimateOf(form)}</span>
              <button type="submit" className={ui.btnBlock}>
                Надіслати заявку
              </button>
              <span className={fields.consent}>
                Надсилаючи заявку, ви погоджуєтесь з{" "}
                <button
                  type="button"
                  className={ui.textLink}
                  onClick={() => {
                    goLegal("/privacy");
                  }}
                >
                  Політикою конфіденційності
                </button>{" "}
                та{" "}
                <button
                  type="button"
                  className={ui.textLink}
                  onClick={() => {
                    goLegal("/terms");
                  }}
                >
                  Умовами бронювання
                </button>
                .
              </span>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { useContent } from "@/content/ContentProvider";
import { PRICE_PER_NIGHT, pad } from "@/content/site";
import { addDays, nightsBetween, shortLabel } from "@/lib/dates";
import { useCurrentLocale, useI18n, useLocalePath } from "@/locales/client";
import { formatPrice } from "@/locales/config";

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

const GUEST_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i + 1));

type ErrorKey = "errName" | "errPhone" | "errCheckin" | "errCheckout" | "errOrder";

const validate = (f: Form): Partial<Record<keyof Errors, ErrorKey>> => {
  const er: Partial<Record<keyof Errors, ErrorKey>> = {};
  if (f.name.trim() === "") {
    er.name = "errName";
  }
  if (f.phone.replace(/\D/g, "").length < 10) {
    er.phone = "errPhone";
  }
  if (f.checkin === "") {
    er.checkin = "errCheckin";
  }
  if (f.checkout === "") {
    er.checkout = "errCheckout";
  } else if (f.checkin !== "" && f.checkout <= f.checkin) {
    er.checkout = "errOrder";
  }
  return er;
};

export function BookingModal({
  request,
  onClosed,
}: {
  readonly request: BookingRequest;
  readonly onClosed: () => void;
}): ReactNode {
  const router = useRouter();
  const t = useI18n();
  const locale = useCurrentLocale();
  const lp = useLocalePath();
  const { cottages } = useContent();
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
    const keys = validate(form);
    const er: Errors = {};
    (Object.keys(keys) as (keyof Errors)[]).forEach((k) => {
      const key = keys[k];
      if (key !== undefined) {
        er[k] = t(`booking.${key}`);
      }
    });
    setErrors(er);
    setSent(Object.keys(er).length === 0);
  };

  const goLegal = (href: string): void => {
    close();
    router.push(lp(href));
  };

  const clip = `circle(${shown ? request.radius.toFixed(0) : "0"}px at ${request.x.toFixed(0)}px ${request.y.toFixed(0)}px)`;
  const cottageOptions = [
    { v: "any", l: t("booking.anyCottage"), short: t("booking.anyCottage") },
    ...cottages.map((c) => ({
      v: String(c.n),
      l: t("booking.cottageOption", { n: pad(c.n), guests: c.guests }),
      short: t("common.cottage", { n: pad(c.n) }),
    })),
  ];
  const cottageLabel = cottageOptions.find((o) => o.v === form.cottage)?.short ?? "";
  const nights =
    form.checkin === "" || form.checkout === "" || form.checkout <= form.checkin
      ? 0
      : nightsBetween(form.checkin, form.checkout);
  const estimate =
    nights === 0
      ? ""
      : t("booking.estimate", {
          nights: t("booking.nights", { count: nights }),
          price: formatPrice(locale, nights * PRICE_PER_NIGHT),
        });
  const minOut = form.checkin === "" ? null : addDays(form.checkin, 1);
  const range = [form.checkin, form.checkout] as const;

  return (
    <div className={styles.overlay} style={{ clipPath: clip }}>
      <div className={styles.backdrop} onClick={close} aria-hidden="true" />
      <div className={styles.center}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("booking.aria")}
          className={`${styles.card} ${shown ? styles.cardShown : ""}`}
        >
          <button
            type="button"
            className={styles.close}
            aria-label={t("common.close")}
            onClick={close}
          >
            ×
          </button>
          {sent ? (
            <div className={styles.done}>
              <h2 className={styles.title}>
                {t("booking.thanks", { name: form.name })} <span>{t("booking.received")}</span>
              </h2>
              <p className={styles.doneLead}>{t("booking.doneLead")}</p>
              <div className={ui.rowList}>
                <div className={styles.sumRow}>
                  <span>{t("booking.dates")}</span>
                  <span className={ui.strong}>
                    {shortLabel(form.checkin)} — {shortLabel(form.checkout)}
                  </span>
                </div>
                <div className={styles.sumRow}>
                  <span>{t("booking.cottage")}</span>
                  <span className={ui.strong}>{cottageLabel}</span>
                </div>
                <div className={styles.sumRow}>
                  <span>{t("common.guests")}</span>
                  <span className={ui.strong}>{form.guests}</span>
                </div>
              </div>
              <button type="button" className={styles.doneBtn} onClick={close}>
                {t("common.close")}
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit} noValidate>
              <div className={styles.head}>
                <h2 className={styles.title}>
                  {t("booking.title")} <span>{t("booking.titleNote")}</span>
                </h2>
                <p className={styles.intro}>{t("booking.intro")}</p>
              </div>
              <div className={styles.grid}>
                <label className={fields.label}>
                  {t("common.name")}
                  <input
                    name="name"
                    value={form.name}
                    onChange={onField}
                    autoComplete="name"
                    placeholder={t("common.namePlaceholder")}
                    className={`${fields.input} ${errors.name === undefined ? "" : fields.invalid}`}
                  />
                  <span className={fields.error}>{errors.name}</span>
                </label>
                <label className={fields.label}>
                  {t("common.phone")}
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
                  label={t("common.checkin")}
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
                  label={t("common.checkout")}
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
                  {t("common.guests")}
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
                  {t("booking.cottage")}
                  <select
                    name="cottage"
                    value={form.cottage}
                    onChange={onField}
                    className={fields.select}
                  >
                    {cottageOptions.map((o) => (
                      <option key={o.v} value={o.v}>
                        {o.l}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className={fields.label}>
                {t("booking.comment")}
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={onField}
                  rows={2}
                  placeholder={t("booking.commentPlaceholder")}
                  className={fields.textarea}
                />
              </label>
              <span className={styles.estimate}>{estimate}</span>
              <button type="submit" className={ui.btnBlock}>
                {t("common.sendRequest")}
              </button>
              <span className={fields.consent}>
                {t("booking.consent", {
                  privacy: (
                    <button
                      type="button"
                      className={ui.textLink}
                      onClick={() => {
                        goLegal("/privacy");
                      }}
                    >
                      {t("common.privacyLink")}
                    </button>
                  ),
                  terms: (
                    <button
                      type="button"
                      className={ui.textLink}
                      onClick={() => {
                        goLegal("/terms");
                      }}
                    >
                      {t("common.termsLink")}
                    </button>
                  ),
                })}
              </span>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

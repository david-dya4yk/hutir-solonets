"use client";

import { useState } from "react";

import { useContent } from "@/content/ContentProvider";
import { PRICE_PER_NIGHT, pad } from "@/content/site";
import { dayMonthLabel, nightsBetween, shortLabel } from "@/lib/dates";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { formatPrice } from "@/locales/config";

import { DatePicker } from "./DatePicker";
import { sendBooking } from "./sendBooking";

import type { ChangeEvent, SubmitEvent, ReactNode } from "react";

import styles from "./BookingForm.module.css";
import fields from "./fields.module.css";
import ui from "../ui/ui.module.css";

type Form = {
  name: string;
  phone: string;
  checkin: string;
  checkout: string;
  cottage: string;
  comment: string;
};

type Field = "name" | "phone" | "checkin" | "checkout";

type ErrorKey = "errName" | "errPhone" | "errCheckin" | "errCheckout" | "errOrder";

type Errors = Partial<Record<Field, string | undefined>>;

export type BookingSummary = {
  readonly name: string;
  readonly dates: string;
  readonly cottage: string;
};

const validate = (f: Form): Partial<Record<Field, ErrorKey>> => {
  const er: Partial<Record<Field, ErrorKey>> = {};
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

type BookingFormProps = {
  readonly cottage?: number;
  readonly comment?: string;
  readonly header?: ReactNode;
  readonly consent: ReactNode;
  readonly onSent: (summary: BookingSummary) => void;
};

export function BookingForm({
  cottage,
  comment,
  header,
  consent,
  onSent,
}: BookingFormProps): ReactNode {
  const t = useI18n();
  const locale = useCurrentLocale();
  const { cottages } = useContent();
  const [picker, setPicker] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    checkin: "",
    checkout: "",
    cottage: cottage === undefined ? "any" : String(cottage),
    comment: comment ?? "",
  });

  const cottageOptions = [
    { v: "any", l: t("booking.anyCottage"), short: t("booking.anyCottage") },
    ...cottages.map((c) => ({
      v: String(c.n),
      l: t("booking.cottageOption", { n: pad(c.n), guests: c.guests }),
      short: t("common.cottage", { n: pad(c.n) }),
    })),
  ];

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
    (Object.keys(keys) as Field[]).forEach((k) => {
      const key = keys[k];
      if (key !== undefined) {
        er[k] = t(`booking.${key}`);
      }
    });
    setErrors(er);
    if (Object.keys(er).length > 0 || status === "sending") {
      return;
    }
    const cottageLabel = cottageOptions.find((o) => o.v === form.cottage)?.short ?? "";
    setStatus("sending");
    void sendBooking({
      name: form.name,
      phone: form.phone,
      checkin: form.checkin,
      checkout: form.checkout,
      cottage: cottageLabel,
      comment: form.comment,
      locale,
    })
      .catch(() => false)
      .then((ok) => {
        if (!ok) {
          setStatus("failed");
          return;
        }
        onSent({
          name: form.name,
          dates: `${shortLabel(form.checkin)} — ${shortLabel(form.checkout)}`,
          cottage: cottageLabel,
        });
      });
  };

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
  const range = [form.checkin, form.checkout] as const;
  const datesLabel =
    form.checkin === ""
      ? t("datePicker.pick")
      : `${dayMonthLabel(locale, form.checkin)} — ${
          form.checkout === "" ? "…" : dayMonthLabel(locale, form.checkout)
        }`;
  const datesError = errors.checkin ?? errors.checkout;

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      {header}
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
          label={`${t("common.checkin")} — ${t("common.checkout")}`}
          value={form.checkout === "" ? form.checkin : form.checkout}
          display={datesLabel}
          min={null}
          range={range}
          open={picker}
          onOpenChange={setPicker}
          onPick={(v) => {
            // The first tap picks check-in, the second check-out; a tap on or before
            // check-in, or after a full range, starts a new range.
            const out = form.checkin !== "" && form.checkout === "" && v > form.checkin;
            setForm((f) => (out ? { ...f, checkout: v } : { ...f, checkin: v, checkout: "" }));
            setErrors((er) => ({ ...er, checkin: undefined, checkout: undefined }));
            setPicker(!out);
          }}
          error={datesError ?? ""}
          invalid={datesError !== undefined}
        />
        <label className={fields.label}>
          {t("booking.cottage")}
          <select name="cottage" value={form.cottage} onChange={onField} className={fields.select}>
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
      {status === "failed" && (
        <span className={styles.failed} role="alert">
          {t("booking.failed")}
        </span>
      )}
      <button type="submit" className={ui.btnBlock} disabled={status === "sending"}>
        {status === "sending" ? t("booking.sending") : t("common.sendRequest")}
      </button>
      <span className={fields.consent}>{consent}</span>
    </form>
  );
}

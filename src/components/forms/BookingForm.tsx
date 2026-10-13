"use client";

import { useState } from "react";

import { useContent } from "@/content/ContentProvider";
import { COTTAGE_SPECS, PRICE_PER_NIGHT, pad } from "@/content/site";
import { addDays, nightsBetween, shortLabel } from "@/lib/dates";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { formatPrice } from "@/locales/config";

import { DatePicker } from "./DatePicker";

import type { ChangeEvent, SubmitEvent, ReactNode } from "react";

import styles from "./BookingForm.module.css";
import fields from "./fields.module.css";
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

type Field = "name" | "phone" | "checkin" | "checkout";

type ErrorKey = "errName" | "errPhone" | "errCheckin" | "errCheckout" | "errOrder";

type Errors = Partial<Record<Field, string | undefined>>;

type Picker = "in" | "out" | null;

export type BookingSummary = {
  readonly name: string;
  readonly dates: string;
  readonly cottage: string;
  readonly guests: string;
};

const MAX_GUESTS = Math.max(...COTTAGE_SPECS.map((c) => c.guests));

const GUEST_OPTIONS = Array.from({ length: MAX_GUESTS }, (_, i) => String(i + 1));

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
  const [picker, setPicker] = useState<Picker>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: "8",
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
    if (Object.keys(er).length === 0) {
      onSent({
        name: form.name,
        dates: `${shortLabel(form.checkin)} — ${shortLabel(form.checkout)}`,
        cottage: cottageOptions.find((o) => o.v === form.cottage)?.short ?? "",
        guests: form.guests,
      });
    }
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
  const minOut = form.checkin === "" ? null : addDays(form.checkin, 1);
  const range = [form.checkin, form.checkout] as const;

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
          <select name="guests" value={form.guests} onChange={onField} className={fields.select}>
            {GUEST_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
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
      <button type="submit" className={ui.btnBlock}>
        {t("common.sendRequest")}
      </button>
      <span className={fields.consent}>{consent}</span>
    </form>
  );
}

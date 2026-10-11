import type { Locale } from "@/locales/config";

const MONTHS_UK = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
] as const;

const MONTHS_GENITIVE_UK = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
] as const;

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MONTHS: Readonly<Record<Locale, readonly string[]>> = { uk: MONTHS_UK, en: MONTHS_EN };

const MONTHS_GENITIVE: Readonly<Record<Locale, readonly string[]>> = {
  uk: MONTHS_GENITIVE_UK,
  en: MONTHS_EN,
};

const WEEKDAYS: Readonly<Record<Locale, readonly string[]>> = {
  uk: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
};

export const weekdays = (locale: Locale): readonly string[] => WEEKDAYS[locale];

const two = (n: number): string => String(n).padStart(2, "0");

export const toIso = (d: Date): string =>
  `${String(d.getFullYear())}-${two(d.getMonth() + 1)}-${two(d.getDate())}`;

export const todayIso = (): string => toIso(new Date());

export const addDays = (iso: string, days: number): string => {
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  return toIso(new Date(y, m - 1, d + days));
};

export const nightsBetween = (from: string, to: string): number =>
  Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);

export const longLabel = (locale: Locale, iso: string): string => {
  const [y = "", m = "1", d = "1"] = iso.split("-");
  return `${String(Number(d))} ${MONTHS_GENITIVE[locale][Number(m) - 1] ?? ""} ${y}`;
};

export const shortLabel = (iso: string): string => {
  if (iso === "") {
    return "";
  }
  const [, m = "", d = ""] = iso.split("-");
  return `${d}.${m}`;
};

export type CalendarDay = {
  readonly iso: string;
  readonly day: number;
};

export type CalendarMonth = {
  readonly title: string;
  readonly lead: number;
  readonly days: readonly CalendarDay[];
};

export const monthKey = (iso: string): string => iso.slice(0, 7);

export const shiftMonth = (key: string, delta: number): string => {
  const [y = 0, m = 1] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${String(d.getFullYear())}-${two(d.getMonth() + 1)}`;
};

export const buildMonth = (locale: Locale, key: string): CalendarMonth => {
  const [y = 0, m = 1] = key.split("-").map(Number);
  const lead = (new Date(y, m - 1, 1).getDay() + 6) % 7;
  const count = new Date(y, m, 0).getDate();
  const days = Array.from({ length: count }, (_, i) => ({
    iso: `${key}-${two(i + 1)}`,
    day: i + 1,
  }));
  return { title: `${MONTHS[locale][m - 1] ?? ""} ${String(y)}`, lead, days };
};

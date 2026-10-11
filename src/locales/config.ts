export const LOCALES = ["uk", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "uk";

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

const INTL: Readonly<Record<Locale, string>> = { uk: "uk-UA", en: "en-GB" };

export const intlLocale = (locale: Locale): string => INTL[locale];

export const localePath = (locale: Locale, path: string): string => {
  if (locale === DEFAULT_LOCALE) {
    return path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const stripLocale = (path: string): string => {
  const hit = LOCALES.find((l) => path === `/${l}` || path.startsWith(`/${l}/`));
  return hit === undefined ? path : path.slice(hit.length + 1) || "/";
};

export const formatPrice = (locale: Locale, amount: number): string =>
  locale === "uk"
    ? `${amount.toLocaleString(INTL.uk)} грн`
    : `UAH ${amount.toLocaleString(INTL.en)}`;

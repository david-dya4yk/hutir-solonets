import { notFound } from "next/navigation";
import { createI18nServer, setStaticParamsLocale } from "next-international/server";

import { isLocale } from "./config";

import type { Locale } from "./config";

export const { getI18n, getCurrentLocale } = createI18nServer({
  uk: async () => import("./uk"),
  en: async () => import("./en"),
});

export const initLocale = async (params: Promise<{ locale: string }>): Promise<Locale> => {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  setStaticParamsLocale(locale);
  return locale;
};

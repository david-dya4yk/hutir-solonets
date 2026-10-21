import { DEFAULT_LOCALE, LOCALES, localePath } from "@/locales/config";

import type { Locale } from "@/locales/config";
import type { Metadata } from "next";

export const SITE_URL = "https://hutirsolonets.com";

export const languages = (path: string): Record<string, string> => ({
  ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
  "x-default": localePath(DEFAULT_LOCALE, path),
});

export const alternates = (locale: Locale, path: string): NonNullable<Metadata["alternates"]> => ({
  canonical: localePath(locale, path),
  languages: languages(path),
});

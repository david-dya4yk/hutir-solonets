"use client";

import { createI18nClient } from "next-international/client";

import { localePath } from "./config";

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } =
  createI18nClient({
    uk: async () => import("./uk"),
    en: async () => import("./en"),
  });

export const useLocalePath = (): ((path: string) => string) => {
  const locale = useCurrentLocale();
  return (path) => localePath(locale, path);
};

"use client";

import { Fragment } from "react";

import { Icon } from "@/components/ui/Icon";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";
import { LOCALES } from "@/locales/config";

import { useSite } from "../booking/context";

import type { Locale } from "@/locales/config";
import type { ReactNode } from "react";

import styles from "./Footer.module.css";

const LABELS: Readonly<Record<Locale, string>> = { uk: "УКР", en: "ENG" };

export function CookieSettingsButton(): ReactNode {
  const { openCookieBar } = useSite();
  const t = useI18n();
  return (
    <button type="button" className={styles.legalLink} onClick={openCookieBar}>
      {t("footer.cookieSettings")}
    </button>
  );
}

export function ToTopButton(): ReactNode {
  const t = useI18n();
  return (
    <button
      type="button"
      className={styles.plainBtn}
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      {t("footer.toTop")} <Icon name="arrowUp" className={styles.toTopIcon} />
    </button>
  );
}

export function LangSwitch(): ReactNode {
  const t = useI18n();
  const current = useCurrentLocale();
  const changeLocale = useChangeLocale();
  return (
    <div className={styles.lang} role="group" aria-label={t("footer.language")}>
      {LOCALES.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span className={styles.langSep}>/</span>}
          <button
            type="button"
            lang={l}
            className={`${styles.langBtn} ${l === current ? styles.langOn : ""}`}
            aria-pressed={l === current}
            onClick={() => {
              changeLocale(l);
            }}
          >
            {LABELS[l]}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";

import { useSite } from "../booking/context";

import type { ReactNode } from "react";

import styles from "./Footer.module.css";

export function CookieSettingsButton(): ReactNode {
  const { openCookieBar } = useSite();
  return (
    <button type="button" className={styles.legalLink} onClick={openCookieBar}>
      Налаштування cookie
    </button>
  );
}

export function ToTopButton(): ReactNode {
  return (
    <button
      type="button"
      className={styles.plainBtn}
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      Повернутись угору ↑
    </button>
  );
}

export function LangSwitch(): ReactNode {
  const [lang, setLang] = useState<"uk" | "en">("uk");
  return (
    <div className={styles.lang}>
      <button
        type="button"
        className={`${styles.langBtn} ${lang === "uk" ? styles.langOn : ""}`}
        aria-pressed={lang === "uk"}
        onClick={() => {
          setLang("uk");
        }}
      >
        УКР
      </button>
      <span className={styles.langSep}>/</span>
      <button
        type="button"
        className={`${styles.langBtn} ${lang === "en" ? styles.langOn : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => {
          setLang("en");
        }}
      >
        ENG
      </button>
    </div>
  );
}

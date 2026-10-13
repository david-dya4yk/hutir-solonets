"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV, PHONE_DISPLAY, PHONE_HREF } from "@/content/site";
import { useI18n, useLocalePath } from "@/locales/client";
import { stripLocale } from "@/locales/config";

import { BookButton } from "../booking/BookButton";

import type { ReactNode } from "react";

import styles from "./Header.module.css";

const isActive = (path: string, href: string): boolean =>
  href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

export function Header(): ReactNode {
  const path = stripLocale(usePathname());
  const t = useI18n();
  const lp = useLocalePath();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) {
      return undefined;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menu]);

  const close = (): void => {
    setMenu(false);
  };

  return (
    <>
      <header className={`${styles.header} ${menu ? styles.menuOpen : ""}`}>
        <div className={styles.inner}>
          <Link href={lp("/")} className={styles.logo} onClick={close}>
            solonєts
          </Link>
          <nav className={styles.nav} aria-label={t("nav.aria")}>
            {NAV.slice(1).map((it) => (
              <Link
                key={it.href}
                href={lp(it.href)}
                className={`${styles.navLink} ${isActive(path, it.href) ? styles.navActive : ""}`}
              >
                {t(`nav.${it.key}`)}
              </Link>
            ))}
          </nav>
          <div className={styles.actions}>
            <BookButton className={styles.book} magnet />
            <button
              type="button"
              className={styles.burger}
              aria-label={t("nav.menu")}
              aria-expanded={menu}
              onClick={() => {
                setMenu((m) => !m);
              }}
            >
              <span className={styles.burgerTop} />
              <span className={styles.burgerBottom} />
            </button>
          </div>
        </div>
      </header>
      <div className={`${styles.menu} ${menu ? styles.menuShown : ""}`} aria-hidden={!menu}>
        <div className={styles.menuDecor} />
        <div className={styles.menuInner}>
          <nav className={styles.menuNav}>
            {NAV.map((it) => (
              <Link
                key={it.href}
                href={lp(it.href)}
                className={styles.menuLink}
                onClick={close}
                tabIndex={menu ? 0 : -1}
              >
                {t(`nav.${it.key}`)}
              </Link>
            ))}
          </nav>
          <div className={styles.menuContacts}>
            <a href={PHONE_HREF} className={styles.menuPhone} tabIndex={menu ? 0 : -1}>
              {PHONE_DISPLAY}
            </a>
            <span>{t("address.street")}</span>
          </div>
        </div>
      </div>
    </>
  );
}

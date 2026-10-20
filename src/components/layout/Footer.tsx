import Image from "next/image";
import Link from "next/link";

import { EMAIL, NAV, PHONE_DISPLAY, PHONE_HREF, ROUTE_HREF, SOCIALS } from "@/content/site";
import { localePath } from "@/locales/config";
import { getCurrentLocale, getI18n } from "@/locales/server";

import { CookieSettingsButton, LangSwitch, ToTopButton } from "./FooterControls";

import type { ReactNode } from "react";

import styles from "./Footer.module.css";

export async function Footer(): Promise<ReactNode> {
  const locale = await getCurrentLocale();
  const t = await getI18n();
  const lp = (path: string): string => localePath(locale, path);
  return (
    <footer className={styles.footer}>
      <div aria-hidden="true" className={styles.mountains} />
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.col}>
            <Link href={lp("/")} className={styles.logo}>
              <Image
                src="/logo.svg"
                alt={t("common.brand")}
                width={1571}
                height={426}
                unoptimized
                className={styles.logoImg}
              />
            </Link>
            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className={styles.social}
                >
                  <span className={styles.socialIcon} style={{ "--icon": `url('${s.icon}')` }} />
                </a>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>{t("footer.feedback")}</span>
            <span className={styles.bold}>{t("common.brand")}</span>
            <span className={styles.item}>{EMAIL}</span>
            <span className={styles.item}>{t("footer.phone", { phone: PHONE_DISPLAY })}</span>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>{t("footer.pages")}</span>
            {NAV.map((it) =>
              it.disabled === true ? (
                <span key={it.href} className={styles.pageLink} aria-disabled="true">
                  {t(`nav.${it.key}`)}
                </span>
              ) : (
                <Link key={it.href} href={lp(it.href)} className={styles.pageLink}>
                  {t(`nav.${it.key}`)}
                </Link>
              ),
            )}
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>{t("footer.address")}</span>
            <span className={styles.address}>
              {t("address.street")}
              <br />
              {t("address.region")}
            </span>
            <a href={ROUTE_HREF} target="_blank" rel="noopener" className={styles.route}>
              {t("common.route")}
            </a>
          </div>
        </div>
        <div className={styles.help}>
          <span>
            {t("footer.help")}{" "}
            <a href={PHONE_HREF} className={styles.call}>
              {t("footer.call")}
            </a>
          </span>
          <LangSwitch />
        </div>
        <div className={styles.bottom}>
          <ToTopButton />
          <span className={styles.muted}>{t("footer.copyright")}</span>
        </div>
        <div className={styles.legal}>
          <Link href={lp("/privacy")} className={styles.legalLink}>
            {t("footer.privacy")}
          </Link>
          <Link href={lp("/cookies")} className={styles.legalLink}>
            {t("footer.cookies")}
          </Link>
          <Link href={lp("/terms")} className={styles.legalLink}>
            {t("footer.terms")}
          </Link>
          <CookieSettingsButton />
          <span className={styles.fop}>{t("footer.fop")}</span>
        </div>
      </div>
    </footer>
  );
}

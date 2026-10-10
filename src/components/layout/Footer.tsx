import Link from "next/link";

import { EMAIL, NAV, PHONE_DISPLAY, ROUTE_HREF, SOCIALS } from "@/content/site";

import { CookieSettingsButton, LangSwitch, ToTopButton } from "./FooterControls";

import type { ReactNode } from "react";

import styles from "./Footer.module.css";

export function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div aria-hidden="true" className={styles.mountains} />
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.col}>
            <Link href="/" className={styles.logo}>
              solonєts
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
            <span className={styles.colTitle}>Зворотній зв&apos;язок</span>
            <span className={styles.bold}>Хутір Солонець</span>
            <span className={styles.item}>{EMAIL}</span>
            <span className={styles.item}>Тел.: {PHONE_DISPLAY}</span>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Сторінки</span>
            {NAV.map((it) => (
              <Link key={it.href} href={it.href} className={styles.pageLink}>
                {it.label}
              </Link>
            ))}
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Адреса</span>
            <span className={styles.address}>
              с. Мигове, вул. Солоницька
              <br />
              Чернівецька область, Україна
            </span>
            <a href={ROUTE_HREF} target="_blank" rel="noopener" className={styles.route}>
              Прокласти маршрут ↗
            </a>
          </div>
        </div>
        <div className={styles.help}>
          <span>
            Потрібна допомога з бронюванням? <b>Зателефонуйте нам.</b>
          </span>
          <LangSwitch />
        </div>
        <div className={styles.bottom}>
          <ToTopButton />
          <span className={styles.muted}>© 2026 Хутір Солонець</span>
        </div>
        <div className={styles.legal}>
          <Link href="/privacy" className={styles.legalLink}>
            Політика конфіденційності
          </Link>
          <Link href="/cookies" className={styles.legalLink}>
            Політика cookie
          </Link>
          <Link href="/terms" className={styles.legalLink}>
            Умови бронювання
          </Link>
          <CookieSettingsButton />
          <span className={styles.fop}>ФОП Прізвище І. П. · РНОКПП 0000000000</span>
        </div>
      </div>
    </footer>
  );
}

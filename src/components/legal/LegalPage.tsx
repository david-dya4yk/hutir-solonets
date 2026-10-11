import Link from "next/link";

import { getContent } from "@/content";
import { LEGAL_ORDER } from "@/content/site";
import { localePath } from "@/locales/config";
import { getI18n } from "@/locales/server";

import type { LegalKey } from "@/content/site";
import type { Locale } from "@/locales/config";
import type { ReactNode } from "react";

import styles from "./LegalPage.module.css";

export async function LegalPage({
  locale,
  doc,
}: {
  readonly locale: Locale;
  readonly doc: LegalKey;
}): Promise<ReactNode> {
  const t = await getI18n();
  const { legal } = getContent(locale);
  const cur = legal[doc];
  return (
    <section className={styles.page}>
      <nav className={styles.tabs} aria-label={t("legal.aria")}>
        {LEGAL_ORDER.map((k) => (
          <Link
            key={k}
            href={localePath(locale, `/${k}`)}
            className={k === doc ? styles.tabOn : styles.tab}
            aria-current={k === doc ? "page" : undefined}
          >
            {legal[k].tab}
          </Link>
        ))}
      </nav>
      <div className={styles.head}>
        <h1 className={styles.title}>{cur.title}</h1>
        <span className={styles.date}>{t("legal.revision")}</span>
        <p className={styles.lead}>{cur.lead}</p>
      </div>
      <div className={styles.items}>
        {cur.items.map(([h, t], i) => (
          <div key={h} className={styles.item}>
            <h2 className={styles.itemTitle}>
              {i + 1}. {h}
            </h2>
            <p className={styles.itemText}>{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";

import { LEGAL, LEGAL_ORDER } from "@/content/site";

import type { LegalKey } from "@/content/site";
import type { ReactNode } from "react";

import styles from "./LegalPage.module.css";

export function LegalPage({ doc }: { readonly doc: LegalKey }): ReactNode {
  const cur = LEGAL[doc];
  return (
    <section className={styles.page}>
      <nav className={styles.tabs} aria-label="Документи">
        {LEGAL_ORDER.map((k) => (
          <Link
            key={k}
            href={`/${k}`}
            className={k === doc ? styles.tabOn : styles.tab}
            aria-current={k === doc ? "page" : undefined}
          >
            {LEGAL[k].tab}
          </Link>
        ))}
      </nav>
      <div className={styles.head}>
        <h1 className={styles.title}>{cur.title}</h1>
        <span className={styles.date}>Редакція від 1 жовтня 2026 року</span>
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

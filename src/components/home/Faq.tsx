"use client";

import { useState } from "react";

import type { FaqItem } from "@/content/site";
import type { ReactNode } from "react";

import styles from "./Faq.module.css";

export function Faq({ items }: { readonly items: readonly FaqItem[] }): ReactNode {
  const [open, setOpen] = useState(1);
  return (
    <div data-reveal="">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <div key={item.q} className={`${styles.item} ${on ? styles.open : ""}`}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={on}
              onClick={() => {
                setOpen((cur) => (cur === i ? -1 : i));
              }}
            >
              <span className={styles.q}>{item.q}</span>
              <span className={styles.ring}>
                <span className={styles.barH} />
                <span className={styles.barV} />
              </span>
            </button>
            <div className={styles.answerWrap}>
              <div className={styles.answerClip}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

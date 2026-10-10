"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { ReactNode } from "react";

import styles from "./CookieBar.module.css";
import ui from "../ui/ui.module.css";

const KEY = "solonets_cookie";

const remember = (value: string): void => {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    return;
  }
};

const hasChoice = (): boolean => {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    return true;
  }
};

export function CookieBar({ request }: { readonly request: number }): ReactNode {
  const [auto, setAuto] = useState(false);
  const [handled, setHandled] = useState(0);

  useEffect(() => {
    if (hasChoice()) {
      return undefined;
    }
    const t = window.setTimeout(() => {
      setAuto(true);
    }, 2400);
    return () => {
      window.clearTimeout(t);
    };
  }, []);

  const visible = auto || request > handled;
  if (!visible) {
    return null;
  }

  const choose = (value: string): void => {
    remember(value);
    setHandled(request);
    setAuto(false);
  };

  return (
    <div role="dialog" aria-label="Cookie" className={styles.bar}>
      <span className={styles.title}>Ми використовуємо cookie</span>
      <p className={styles.text}>
        Необхідні cookie потрібні для роботи сайту. З вашої згоди ми також використовуємо аналітичні
        й рекламні cookie (Meta Pixel), щоб показувати вам актуальні пропозиції.{" "}
        <Link
          href="/cookies"
          className={ui.textLink}
          onClick={() => {
            setHandled(request);
            setAuto(false);
          }}
        >
          Детальніше
        </Link>
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={ui.btnSm}
          onClick={() => {
            choose("all");
          }}
        >
          Прийняти всі
        </button>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => {
            choose("necessary");
          }}
        >
          Лише необхідні
        </button>
      </div>
    </div>
  );
}

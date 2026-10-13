"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { useI18n, useLocalePath } from "@/locales/client";

import { BookingForm } from "../forms/BookingForm";

import type { BookingRequest } from "./SiteProvider";
import type { BookingSummary } from "../forms/BookingForm";
import type { ReactNode } from "react";

import styles from "./BookingModal.module.css";
import ui from "../ui/ui.module.css";

export function BookingModal({
  request,
  onClosed,
}: {
  readonly request: BookingRequest;
  readonly onClosed: () => void;
}): ReactNode {
  const router = useRouter();
  const t = useI18n();
  const lp = useLocalePath();
  const [shown, setShown] = useState(false);
  const [summary, setSummary] = useState<BookingSummary | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const close = (): void => {
    setShown(false);
    window.clearTimeout(closeTimer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = window.setTimeout(onClosed, reduced ? 0 : 700);
  };
  const onEscape = useEffectEvent(close);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setShown(true);
      });
    });
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      window.clearTimeout(closeTimer.current);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const goLegal = (href: string): void => {
    close();
    router.push(lp(href));
  };

  const clip = `circle(${shown ? request.radius.toFixed(0) : "0"}px at ${request.x.toFixed(0)}px ${request.y.toFixed(0)}px)`;
  return (
    <div className={styles.overlay} style={{ clipPath: clip }}>
      <div className={styles.backdrop} onClick={close} aria-hidden="true" />
      <div className={styles.center}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("booking.aria")}
          className={`${styles.card} ${shown ? styles.cardShown : ""}`}
        >
          <button
            type="button"
            className={styles.close}
            aria-label={t("common.close")}
            onClick={close}
          >
            ×
          </button>
          {summary !== null ? (
            <div className={styles.done}>
              <h2 className={styles.title}>
                {t("booking.thanks", { name: summary.name })} <span>{t("booking.received")}</span>
              </h2>
              <p className={styles.doneLead}>{t("booking.doneLead")}</p>
              <div className={ui.rowList}>
                <div className={styles.sumRow}>
                  <span>{t("booking.dates")}</span>
                  <span className={ui.strong}>{summary.dates}</span>
                </div>
                <div className={styles.sumRow}>
                  <span>{t("booking.cottage")}</span>
                  <span className={ui.strong}>{summary.cottage}</span>
                </div>
              </div>
              <button type="button" className={styles.doneBtn} onClick={close}>
                {t("common.close")}
              </button>
            </div>
          ) : (
            <BookingForm
              {...(request.cottage === undefined ? {} : { cottage: request.cottage })}
              {...(request.comment === undefined ? {} : { comment: request.comment })}
              onSent={setSummary}
              header={
                <div className={styles.head}>
                  <h2 className={styles.title}>
                    {t("booking.title")} <span>{t("booking.titleNote")}</span>
                  </h2>
                  <p className={styles.intro}>{t("booking.intro")}</p>
                </div>
              }
              consent={t("booking.consent", {
                privacy: (
                  <button
                    type="button"
                    className={ui.textLink}
                    onClick={() => {
                      goLegal("/privacy");
                    }}
                  >
                    {t("common.privacyLink")}
                  </button>
                ),
                terms: (
                  <button
                    type="button"
                    className={ui.textLink}
                    onClick={() => {
                      goLegal("/terms");
                    }}
                  >
                    {t("common.termsLink")}
                  </button>
                ),
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
}

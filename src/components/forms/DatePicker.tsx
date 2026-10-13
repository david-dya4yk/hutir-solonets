"use client";

import { useEffect, useRef, useState } from "react";

import { buildMonth, longLabel, monthKey, shiftMonth, todayIso, weekdays } from "@/lib/dates";
import { useCurrentLocale, useI18n } from "@/locales/client";

import type { ReactNode } from "react";

import styles from "./DatePicker.module.css";

type DatePickerProps = {
  readonly label: string;
  readonly value: string;
  /** Text shown in the field instead of the formatted value, e.g. a date range. */
  readonly display?: string;
  readonly min: string | null;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onPick: (iso: string) => void;
  readonly range?: readonly [string, string];
  readonly error?: string;
  readonly invalid?: boolean;
  readonly align?: "left" | "right";
};

const dayClass = (
  iso: string,
  value: string,
  range: readonly [string, string] | undefined,
  today: string,
): string => {
  const [from, to] = range ?? ["", ""];
  const edge = iso === value || (range !== undefined && (iso === from || iso === to));
  if (edge) {
    return styles.dayEdge;
  }
  if (from !== "" && to !== "" && iso > from && iso < to) {
    return styles.dayInRange;
  }
  if (iso === today) {
    return styles.dayToday;
  }
  return styles.day;
};

export function DatePicker({
  label,
  value,
  display,
  min,
  open,
  onOpenChange,
  onPick,
  range,
  error,
  invalid = false,
  align = "left",
}: DatePickerProps): ReactNode {
  const root = useRef<HTMLDivElement>(null);
  const t = useI18n();
  const locale = useCurrentLocale();
  const [view, setView] = useState<string | null>(null);
  const today = open ? todayIso() : "";
  const floor = min ?? today;
  const current = view ?? monthKey(value === "" ? floor : value);
  const month = open ? buildMonth(locale, current) : null;
  const atStart = current <= monthKey(floor);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onDown = (e: MouseEvent): void => {
      if (e.target instanceof Node && root.current?.contains(e.target) !== true) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, onOpenChange]);

  const toggle = (): void => {
    if (!open) {
      setView(null);
    }
    onOpenChange(!open);
  };

  const shift = (delta: number): void => {
    const next = shiftMonth(current, delta);
    if (next >= monthKey(floor)) {
      setView(next);
    }
  };

  const fieldClass = [styles.field, invalid ? styles.invalid : "", open ? styles.active : ""].join(
    " ",
  );

  return (
    <div ref={root} className={styles.root}>
      {label}
      <button type="button" className={fieldClass} onClick={toggle} aria-expanded={open}>
        <span>{display ?? (value === "" ? t("datePicker.pick") : longLabel(locale, value))}</span>
        <span className={open ? styles.chevOpen : styles.chev} />
      </button>
      {error !== undefined && <span className={styles.error}>{error}</span>}
      <div
        className={`${styles.pop} ${align === "right" ? styles.popRight : ""} ${open ? styles.popOpen : ""}`}
      >
        {month !== null && (
          <>
            <div className={styles.head}>
              <button
                type="button"
                className={`${styles.nav} ${atStart ? styles.navDim : ""}`}
                aria-label={t("datePicker.prev")}
                onClick={() => {
                  shift(-1);
                }}
              >
                ‹
              </button>
              <span className={styles.title}>{month.title}</span>
              <button
                type="button"
                className={styles.nav}
                aria-label={t("datePicker.next")}
                onClick={() => {
                  shift(1);
                }}
              >
                ›
              </button>
            </div>
            <div className={styles.grid}>
              {weekdays(locale).map((w) => (
                <span key={w} className={styles.weekday}>
                  {w}
                </span>
              ))}
            </div>
            <div className={styles.grid}>
              {Array.from({ length: month.lead }, (_, i) => (
                <span key={`lead-${String(i)}`} />
              ))}
              {month.days.map((d) => {
                const disabled = d.iso < floor;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    disabled={disabled}
                    className={disabled ? styles.dayDisabled : dayClass(d.iso, value, range, today)}
                    onClick={() => {
                      onPick(d.iso);
                    }}
                  >
                    {d.day}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

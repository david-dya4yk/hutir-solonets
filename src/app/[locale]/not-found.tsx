"use client";

import Link from "next/link";

import { useI18n, useLocalePath } from "@/locales/client";

import type { ReactNode } from "react";

import ui from "@/components/ui/ui.module.css";

export default function NotFound(): ReactNode {
  const t = useI18n();
  const lp = useLocalePath();
  return (
    <section className={ui.pageTop}>
      <h1 className={ui.displayLg}>{t("notFound.title")}</h1>
      <p className={ui.lead}>
        <Link href={lp("/")} className={ui.underline}>
          {t("notFound.back")}
        </Link>
      </p>
    </section>
  );
}

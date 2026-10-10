import Link from "next/link";

import type { ReactNode } from "react";

import ui from "@/components/ui/ui.module.css";

export default function NotFound(): ReactNode {
  return (
    <section className={ui.pageTop}>
      <h1 className={ui.displayLg}>Сторінку не знайдено.</h1>
      <p className={ui.lead}>
        <Link href="/" className={ui.underline}>
          Повернутись на головну
        </Link>
      </p>
    </section>
  );
}

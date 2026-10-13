import Image from "next/image";

import { getI18n } from "@/locales/server";

import type { ReactNode } from "react";

import styles from "./PlanMap.module.css";

export async function PlanMap(): Promise<ReactNode> {
  const t = await getI18n();
  return (
    <div className={styles.map} data-reveal="">
      <div className={styles.layer} data-parallax="0.08">
        <Image
          src="/assets/home-territory.jpg"
          alt={t("home.planCaption")}
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className={styles.photo}
        />
      </div>
    </div>
  );
}

import { LegalPage } from "@/components/legal/LegalPage";
import { getContent } from "@/content";
import { initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(props: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const locale = await initLocale(props.params);
  return { title: getContent(locale).legal.privacy.title };
}

export default async function PrivacyPage(
  props: PageProps<"/[locale]/privacy">,
): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  return <LegalPage locale={locale} doc="privacy" />;
}

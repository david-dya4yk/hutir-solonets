import { LegalPage } from "@/components/legal/LegalPage";
import { getContent } from "@/content";
import { alternates } from "@/lib/seo";
import { initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(props: PageProps<"/[locale]/cookies">): Promise<Metadata> {
  const locale = await initLocale(props.params);
  return {
    title: getContent(locale).legal.cookies.title,
    alternates: alternates(locale, "/cookies"),
  };
}

export default async function CookiesPage(
  props: PageProps<"/[locale]/cookies">,
): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  return <LegalPage locale={locale} doc="cookies" />;
}

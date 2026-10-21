import { LegalPage } from "@/components/legal/LegalPage";
import { getContent } from "@/content";
import { alternates } from "@/lib/seo";
import { initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(props: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const locale = await initLocale(props.params);
  return { title: getContent(locale).legal.terms.title, alternates: alternates(locale, "/terms") };
}

export default async function TermsPage(props: PageProps<"/[locale]/terms">): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  return <LegalPage locale={locale} doc="terms" />;
}

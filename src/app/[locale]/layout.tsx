import { Alice, Didact_Gothic, JetBrains_Mono } from "next/font/google";

import { SiteProvider } from "@/components/booking/SiteProvider";
import { Effects } from "@/components/effects/Effects";
import { Preloader } from "@/components/effects/Preloader";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { clientContent, getContent } from "@/content";
import { ContentProvider } from "@/content/ContentProvider";
import { I18nProviderClient } from "@/locales/client";
import { LOCALES } from "@/locales/config";
import { getI18n, initLocale } from "@/locales/server";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "../globals.css";

const alice = Alice({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-alice",
});

const didact = Didact_Gothic({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-didact",
});

const mono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
});

export function generateStaticParams(): { locale: string }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LayoutProps<"/[locale]">): Promise<Metadata> {
  await initLocale(props.params);
  const t = await getI18n();
  return {
    title: { default: t("meta.title"), template: t("meta.template") },
    description: t("meta.description"),
  };
}

export const viewport: Viewport = {
  themeColor: "#304534",
};

export default async function RootLayout(props: LayoutProps<"/[locale]">): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  return (
    <html lang={locale} className={`${alice.variable} ${didact.variable} ${mono.variable}`}>
      <body>
        <I18nProviderClient locale={locale}>
          <ContentProvider value={clientContent(getContent(locale))}>
            <SiteProvider>
              <Preloader />
              <Header />
              {props.children}
              <Footer />
              <Effects />
            </SiteProvider>
          </ContentProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}

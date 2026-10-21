import { Alice, Didact_Gothic, JetBrains_Mono } from "next/font/google";

import { SiteProvider } from "@/components/booking/SiteProvider";
import { Effects } from "@/components/effects/Effects";
import { Preloader } from "@/components/effects/Preloader";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { clientContent, getContent } from "@/content";
import { ContentProvider } from "@/content/ContentProvider";
import { SITE_URL } from "@/lib/seo";
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
  const locale = await initLocale(props.params);
  const t = await getI18n();
  const image = { url: "/og.jpg", width: 1200, height: 630, alt: t("meta.title") };
  const google = process.env["GOOGLE_SITE_VERIFICATION"];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("meta.title"), template: t("meta.template") },
    description: t("meta.description"),
    openGraph: {
      type: "website",
      siteName: t("common.brand"),
      locale: locale === "uk" ? "uk_UA" : "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
    ...(google === undefined || google === "" ? {} : { verification: { google } }),
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

import { Alice, Didact_Gothic, JetBrains_Mono } from "next/font/google";

import { SiteProvider } from "@/components/booking/SiteProvider";
import { Effects } from "@/components/effects/Effects";
import { Preloader } from "@/components/effects/Preloader";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Хутір Солонець — котеджі та SPA в Карпатах",
    template: "%s · Хутір Солонець",
  },
  description:
    "Котеджі для 8–12 гостей, басейни, джакузі та чан у лісі біля Мигового, Буковинські Карпати.",
};

export const viewport: Viewport = {
  themeColor: "#304534",
};

export default function RootLayout({ children }: LayoutProps<"/">): ReactNode {
  return (
    <html lang="uk" className={`${alice.variable} ${didact.variable} ${mono.variable}`}>
      <body>
        <SiteProvider>
          <Preloader />
          <Header />
          {children}
          <Footer />
          <Effects />
        </SiteProvider>
      </body>
    </html>
  );
}

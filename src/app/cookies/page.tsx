import { LegalPage } from "@/components/legal/LegalPage";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Політика cookie" };

export default function CookiesPage(): ReactNode {
  return <LegalPage doc="cookies" />;
}

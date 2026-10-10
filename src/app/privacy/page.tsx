import { LegalPage } from "@/components/legal/LegalPage";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Політика конфіденційності" };

export default function PrivacyPage(): ReactNode {
  return <LegalPage doc="privacy" />;
}

import { LegalPage } from "@/components/legal/LegalPage";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Умови бронювання" };

export default function TermsPage(): ReactNode {
  return <LegalPage doc="terms" />;
}

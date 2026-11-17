import type { ReactNode } from "react";

export function JsonLd({ data }: { readonly data: Readonly<Record<string, unknown>> }): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }}
    />
  );
}

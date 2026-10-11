"use client";

import { createContext, useContext } from "react";

import type { ClientContent } from "./index";
import type { ReactNode } from "react";

const ContentContext = createContext<ClientContent | null>(null);

export function ContentProvider({
  value,
  children,
}: {
  readonly value: ClientContent;
  readonly children: ReactNode;
}): ReactNode {
  return <ContentContext value={value}>{children}</ContentContext>;
}

export const useContent = (): ClientContent => {
  const ctx = useContext(ContentContext);
  if (ctx === null) {
    throw new Error("useContent must be used inside ContentProvider");
  }
  return ctx;
};

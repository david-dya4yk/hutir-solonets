"use client";

import { createContext, useContext } from "react";

import type { MouseEvent } from "react";

export type BookingOptions = {
  readonly cottage?: number;
  readonly comment?: string;
};

export type SiteActions = {
  readonly openBooking: (event: MouseEvent<HTMLElement> | null, options?: BookingOptions) => void;
  readonly openCookieBar: () => void;
};

export const SiteContext = createContext<SiteActions | null>(null);

export const useSite = (): SiteActions => {
  const ctx = useContext(SiteContext);
  if (ctx === null) {
    throw new Error("useSite must be used inside SiteProvider");
  }
  return ctx;
};

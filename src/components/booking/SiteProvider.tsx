"use client";

import { useCallback, useMemo, useState } from "react";

import { BookingModal } from "./BookingModal";
import { SiteContext } from "./context";
import { CookieBar } from "../layout/CookieBar";

import type { BookingOptions, SiteActions } from "./context";
import type { MouseEvent, ReactNode } from "react";

export type BookingRequest = BookingOptions & {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly radius: number;
};

export function SiteProvider({ children }: { readonly children: ReactNode }): ReactNode {
  const [booking, setBooking] = useState<BookingRequest | null>(null);
  const [cookieRequest, setCookieRequest] = useState(0);

  const openBooking = useCallback(
    (event: MouseEvent<HTMLElement> | null, options: BookingOptions = {}): void => {
      const rect = event?.currentTarget.getBoundingClientRect();
      const x = rect === undefined ? window.innerWidth / 2 : rect.left + rect.width / 2;
      const y = rect === undefined ? window.innerHeight / 2 : rect.top + rect.height / 2;
      setBooking({
        ...options,
        id: Date.now(),
        x,
        y,
        radius: Math.hypot(window.innerWidth, window.innerHeight) * 1.1,
      });
    },
    [],
  );

  const openCookieBar = useCallback((): void => {
    setCookieRequest((n) => n + 1);
  }, []);

  const closeBooking = useCallback((): void => {
    setBooking(null);
  }, []);

  const actions = useMemo<SiteActions>(
    () => ({ openBooking, openCookieBar }),
    [openBooking, openCookieBar],
  );

  return (
    <SiteContext value={actions}>
      {children}
      {booking !== null && (
        <BookingModal key={booking.id} request={booking} onClosed={closeBooking} />
      )}
      <CookieBar request={cookieRequest} />
    </SiteContext>
  );
}

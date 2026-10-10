"use client";

import { useSite } from "./context";

import type { BookingOptions } from "./context";
import type { ReactNode } from "react";

type BookButtonProps = BookingOptions & {
  readonly className: string;
  readonly children?: ReactNode;
  readonly magnet?: boolean;
  readonly reveal?: boolean;
};

export function BookButton({
  className,
  children = "Забронювати",
  magnet = false,
  reveal = false,
  cottage,
  comment,
}: BookButtonProps): ReactNode {
  const { openBooking } = useSite();
  const options = {
    ...(cottage === undefined ? {} : { cottage }),
    ...(comment === undefined ? {} : { comment }),
  };
  return (
    <button
      type="button"
      className={className}
      data-magnet={magnet ? "" : undefined}
      data-reveal={reveal ? "" : undefined}
      onClick={(e) => {
        openBooking(e, options);
      }}
    >
      {children}
    </button>
  );
}

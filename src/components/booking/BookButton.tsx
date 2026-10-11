"use client";

import { useI18n } from "@/locales/client";

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
  children,
  magnet = false,
  reveal = false,
  cottage,
  comment,
}: BookButtonProps): ReactNode {
  const { openBooking } = useSite();
  const t = useI18n();
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
      {children ?? t("common.book")}
    </button>
  );
}

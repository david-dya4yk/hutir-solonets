import type { ReactNode } from "react";

const PATHS = {
  play: (
    <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.27-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
  ),
  star: (
    <path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5Z" />
  ),
  arrowUp: (
    <path
      d="M12 19V5m0 0-6 6m6-6 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  className,
  size = "1em",
}: {
  readonly name: IconName;
  readonly className?: string;
  readonly size?: string;
}): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

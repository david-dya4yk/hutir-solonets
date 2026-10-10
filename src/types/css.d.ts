import "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style -- module augmentation requires interface merging
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

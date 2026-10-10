import { Fragment } from "react";

import type { ReactNode } from "react";

import ui from "./ui.module.css";

export function FeatureDots({
  className,
  items,
}: {
  readonly className: string;
  readonly items: readonly string[];
}): ReactNode {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && <span className={ui.dot} />}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}

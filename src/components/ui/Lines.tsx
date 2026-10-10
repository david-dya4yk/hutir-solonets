import { createElement } from "react";

import type { ReactNode } from "react";

import ui from "./ui.module.css";

type LinesProps = {
  readonly as?: "h1" | "h2" | "h3";
  readonly className: string;
  readonly lines: readonly string[];
};

export function Lines({ as = "h2", className, lines }: LinesProps): ReactNode {
  return createElement(
    as,
    { className, "data-reveal": "lines" },
    lines.map((line) => (
      <span key={line} className={ui.line}>
        {line}
      </span>
    )),
  );
}

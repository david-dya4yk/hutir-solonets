import type { ReactNode } from "react";

import styles from "./template.module.css";

export default function Template({ children }: { readonly children: ReactNode }): ReactNode {
  return <main className={styles.main}>{children}</main>;
}

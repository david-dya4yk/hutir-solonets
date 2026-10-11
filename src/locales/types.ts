import type uk from "./uk";

type Widen<T> = { readonly [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

export type Messages = Widen<typeof uk>;

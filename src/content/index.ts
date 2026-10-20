import { en } from "./en";
import { COTTAGE_SPECS, PLAN_AMENITY_SPOTS, REVIEW_SOURCES } from "./site";
import { uk } from "./uk";

import type { Cottage, PlanPoint, Review } from "./site";
import type { LocalContent } from "./types";
import type { Locale } from "@/locales/config";

export type Content = Omit<LocalContent, "cottages" | "planAmenities"> & {
  readonly cottages: readonly Cottage[];
  readonly reviews: readonly Review[];
  readonly planAmenities: readonly PlanPoint[];
};

export type ClientContent = Pick<Content, "cottages" | "rooms" | "reviews" | "planAmenities">;

const build = (c: LocalContent): Content => ({
  ...c,
  cottages: COTTAGE_SPECS.map((spec, i) => ({
    ...spec,
    shot: c.cottages[i]?.shot ?? "",
    tagline: c.cottages[i]?.tagline ?? "",
    desc: c.cottages[i]?.desc ?? "",
    ...(c.cottages[i]?.rooms === undefined ? {} : { rooms: c.cottages[i].rooms }),
  })),
  reviews: REVIEW_SOURCES,
  planAmenities: PLAN_AMENITY_SPOTS.map(([x, y], i) => ({ t: c.planAmenities[i] ?? "", x, y })),
});

const CONTENT: Readonly<Record<Locale, Content>> = { uk: build(uk), en: build(en) };

export const getContent = (locale: Locale): Content => CONTENT[locale];

export const clientContent = (c: Content): ClientContent => ({
  cottages: c.cottages,
  rooms: c.rooms,
  reviews: c.reviews,
  planAmenities: c.planAmenities,
});

export const findCottage = (c: Content, n: number): Cottage | undefined =>
  c.cottages.find((x) => x.n === n);

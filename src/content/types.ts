import type {
  CottageText,
  FaqItem,
  Feature,
  LegalDoc,
  LegalKey,
  OfferGroup,
  Room,
  SpaBlock,
} from "./site";

export type LocalContent = {
  readonly cottages: readonly CottageText[];
  readonly features: readonly Feature[];
  readonly rooms: readonly Room[];
  readonly spa: readonly SpaBlock[];
  readonly faq: readonly FaqItem[];
  readonly offers: readonly OfferGroup[];
  readonly reviews: readonly string[];
  readonly planAmenities: readonly string[];
  readonly homeCottageDots: readonly string[];
  readonly homeSpaDots: readonly string[];
  readonly legal: Readonly<Record<LegalKey, LegalDoc>>;
};

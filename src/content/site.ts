import type { Locale } from "@/locales/config";

export type CottageRoom =
  "exterior" | "dining" | "living" | "kitchen" | "bedroom" | "bathroom" | "terrace";

export type CottagePhoto = {
  readonly src: string;
  readonly position?: string;
  readonly room?: CottageRoom;
};

export type CottageSpec = {
  readonly n: number;
  readonly area: number;
  readonly guests: number;
  readonly beds: number;
  readonly photo?: CottagePhoto;
  readonly gallery?: readonly CottagePhoto[];
};

export type CottageText = {
  readonly shot: string;
  readonly tagline: string;
  readonly desc: string;
  /** This cottage's own rooms; cottages without them show the shared `rooms`. */
  readonly rooms?: readonly Room[];
};

export type Cottage = CottageSpec & CottageText;

export type Feature = {
  readonly num: string;
  readonly title: string;
  readonly text: string;
};

export type Room = {
  readonly title: string;
  readonly shot: string;
  readonly text: string;
  readonly items: readonly string[];
};

export type SlideImage = {
  readonly src: string;
  readonly alt: string;
  readonly position?: string;
};

export type SpaBlock = {
  readonly title: string;
  readonly text: string;
  readonly slides: readonly string[];
  readonly images?: readonly (SlideImage | undefined)[];
};

export type FaqItem = {
  readonly q: string;
  readonly a: string;
};

export type Offer = {
  readonly tag: string;
  readonly title: string;
  readonly text: string;
  readonly shot: string;
  readonly cta: string;
  readonly cert: boolean;
};

export type OfferGroup = {
  readonly title: string;
  readonly items: readonly Offer[];
};

export type Social = {
  readonly label: string;
  readonly icon: string;
  readonly handle: string;
  readonly href: string;
};

export type ReviewClip = {
  readonly src: string;
  readonly poster: string;
};

export type ReviewSource = {
  readonly handle: string;
  readonly video: boolean;
  readonly clip?: ReviewClip;
  readonly photo?: string;
};

export type Review = ReviewSource;

export type PlanPoint = {
  readonly t: string;
  readonly x: string;
  readonly y: string;
};

export type LegalKey = "privacy" | "cookies" | "terms";

export type LegalDoc = {
  readonly title: string;
  readonly tab: string;
  readonly lead: string;
  readonly items: readonly (readonly [string, string])[];
};

export type NavKey = "home" | "cottages" | "spa" | "offers" | "contacts";

export const PHONE_DISPLAY = "+38 050 743 77 72";
export const PHONE_HREF = "tel:+380507437772";
export const EMAIL = "hello@solonets.com.ua";
export const INSTAGRAM_URL = "https://www.instagram.com/hutir_solonets?cplk=MmVkanRqbXY2NXMy";
export const mapEmbedSrc = (locale: Locale): string =>
  `https://www.google.com/maps?q=${encodeURIComponent('Котеджний комплекс "Хутір Солонець", Мигове')}&hl=${locale}&z=14&output=embed`;
export const ROUTE_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Мигове, вулиця Солоницька, Чернівецька область")}`;
export const GOOGLE_PLACE_ID = "ChIJWZ1xnFKfNkcRFrbqxyx6lzg";
export const REVIEW_HREF = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
export const GOOGLE_RATING = { value: 4.3, count: 244 } as const;
export const PRICE_PER_NIGHT = 14000;

export const pad = (n: number): string => String(n).padStart(2, "0");

export const COTTAGE_SPECS: readonly CottageSpec[] = [
  {
    n: 1,
    area: 140,
    guests: 8,
    beds: 4,
    photo: { src: "/assets/cottage-1-2.jpg", position: "center 60%" },
  },
  {
    n: 2,
    area: 160,
    guests: 10,
    beds: 4,
    photo: { src: "/assets/cottage-1-2.jpg", position: "center 60%" },
  },
  {
    n: 3,
    area: 150,
    guests: 8,
    beds: 3,
    photo: { src: "/assets/cottage-3-ext.jpg", position: "center 62%", room: "exterior" },
    gallery: [
      { src: "/assets/cottage-3-dining.jpg", position: "center 62%", room: "dining" },
      { src: "/assets/cottage-3-living.jpg", position: "center 62%", room: "living" },
      { src: "/assets/cottage-3-kitchen.jpg", position: "center 55%", room: "kitchen" },
      { src: "/assets/cottage-3-bedroom-1.jpg", position: "center 62%", room: "bedroom" },
      { src: "/assets/cottage-3-bedroom-2.jpg", position: "center 62%", room: "bedroom" },
      { src: "/assets/cottage-3-bath.jpg", position: "center 55%", room: "bathroom" },
      { src: "/assets/cottage-3-ext.jpg", position: "center 62%", room: "exterior" },
    ],
  },
  {
    n: 4,
    area: 190,
    guests: 14,
    beds: 5,
    photo: { src: "/assets/cottage-4-exterior.jpg", position: "center 60%", room: "exterior" },
    gallery: [
      { src: "/assets/cottage-4-exterior.jpg", position: "center 60%", room: "exterior" },
      { src: "/assets/cottage-4-dining.jpg", position: "center 60%", room: "dining" },
      { src: "/assets/cottage-4-terrace-view.jpg", position: "center 55%", room: "terrace" },
      { src: "/assets/cottage-4-bedroom.jpg", position: "center 60%", room: "bedroom" },
      { src: "/assets/cottage-4-kitchen.jpg", position: "center 55%", room: "kitchen" },
      { src: "/assets/cottage-4-bedroom-2.jpg", position: "center 65%", room: "bedroom" },
      { src: "/assets/cottage-4-dining-2.jpg", position: "center 55%", room: "dining" },
      { src: "/assets/cottage-4-kitchen-2.jpg", position: "center 50%", room: "kitchen" },
      { src: "/assets/cottage-4-terrace.jpg", position: "center 60%", room: "terrace" },
    ],
  },
  {
    n: 5,
    area: 165,
    guests: 10,
    beds: 5,
    photo: { src: "/assets/cottage-5-exterior.jpg", position: "center 55%", room: "exterior" },
    gallery: [
      { src: "/assets/cottage-5-exterior.jpg", position: "center 55%", room: "exterior" },
      { src: "/assets/cottage-5-dining.jpg", position: "center 55%", room: "dining" },
      { src: "/assets/cottage-5-living.jpg", position: "center 60%", room: "living" },
      { src: "/assets/cottage-5-bedroom.jpg", position: "center 60%", room: "bedroom" },
      { src: "/assets/cottage-5-kitchen.jpg", position: "center 55%", room: "kitchen" },
      { src: "/assets/cottage-5-bedroom-2.jpg", position: "center 55%", room: "bedroom" },
      { src: "/assets/cottage-5-bath.jpg", position: "center 50%", room: "bathroom" },
      { src: "/assets/cottage-5-dining-2.jpg", position: "center 60%", room: "dining" },
      { src: "/assets/cottage-5-kitchen-2.jpg", position: "center 60%", room: "kitchen" },
      { src: "/assets/cottage-5-bedroom-3.jpg", position: "center 55%", room: "bedroom" },
      { src: "/assets/cottage-5-kitchen-3.jpg", position: "center 55%", room: "kitchen" },
      { src: "/assets/cottage-5-exterior-2.jpg", position: "center 55%", room: "exterior" },
    ],
  },
  { n: 6, area: 200, guests: 12, beds: 5 },
  {
    n: 7,
    area: 175,
    guests: 10,
    beds: 4,
    photo: { src: "/assets/cottage-7-exterior.jpg", position: "center 60%", room: "exterior" },
    gallery: [
      { src: "/assets/cottage-7-exterior.jpg", position: "center 60%", room: "exterior" },
      { src: "/assets/cottage-7-dining.jpg", position: "center 55%", room: "dining" },
      { src: "/assets/cottage-7-bedroom.jpg", position: "center 60%", room: "bedroom" },
      { src: "/assets/cottage-7-living.jpg", position: "center 55%", room: "living" },
      { src: "/assets/cottage-7-bedroom-2.jpg", position: "center 60%", room: "bedroom" },
      { src: "/assets/cottage-7-dining-2.jpg", position: "center 60%", room: "dining" },
      { src: "/assets/cottage-7-bedroom-3.jpg", position: "center 55%", room: "bedroom" },
      { src: "/assets/cottage-7-bath.jpg", position: "center 50%", room: "bathroom" },
      { src: "/assets/cottage-7-bedroom-4.jpg", position: "center 55%", room: "bedroom" },
      { src: "/assets/cottage-7-living-2.jpg", position: "center 55%", room: "living" },
      { src: "/assets/cottage-7-bedroom-5.jpg", position: "center 55%", room: "bedroom" },
      { src: "/assets/cottage-7-bath-2.jpg", position: "center 50%", room: "bathroom" },
    ],
  },
];

export const cottageHref = (c: CottageSpec): string => `/cottages/${String(c.n)}`;

/** The offers page is hidden for now: its nav item is not a link, and /offers redirects home. */
export const OFFERS_ENABLED = false as boolean;

type NavItem = { readonly href: string; readonly key: NavKey; readonly disabled?: boolean };

const ALL_NAV: readonly NavItem[] = [
  { href: "/", key: "home" },
  { href: "/cottages", key: "cottages" },
  { href: "/spa", key: "spa" },
  { href: "/offers", key: "offers" },
  { href: "/contacts", key: "contacts" },
];

export const NAV: readonly NavItem[] = ALL_NAV.map((it) =>
  it.key === "offers" && !OFFERS_ENABLED ? { ...it, disabled: true } : it,
);

export const LEGAL_ORDER: readonly LegalKey[] = ["privacy", "cookies", "terms"];

export const SOCIALS: readonly Social[] = [
  {
    label: "Instagram",
    icon: "https://cdn.simpleicons.org/instagram/ffffff",
    handle: "@hutir_solonets",
    href: INSTAGRAM_URL,
  },
  {
    label: "Telegram",
    icon: "https://cdn.simpleicons.org/telegram/ffffff",
    handle: "@kristina_semenovich",
    href: "https://t.me/kristina_semenovich",
  },
  {
    label: "Viber",
    icon: "https://cdn.simpleicons.org/viber/ffffff",
    handle: "+380 50 743 77 72",
    href: "viber://chat?number=%2B380507437772",
  },
  {
    label: "WhatsApp",
    icon: "https://cdn.simpleicons.org/whatsapp/ffffff",
    handle: "+380 50 743 77 72",
    href: "https://wa.me/380507437772",
  },
];

const reviewClip = (n: number): ReviewClip => ({
  src: `/assets/review-${String(n)}.mp4`,
  poster: `/assets/review-${String(n)}.jpg`,
});

export const REVIEW_SOURCES: readonly ReviewSource[] = [
  { handle: "@hutir_solonets", video: true, clip: reviewClip(1) },
  { handle: "@petrashescu8888", video: false, photo: "/assets/review-photo-1.jpg" },
  { handle: "@syvous.y", video: true, clip: reviewClip(2) },
  { handle: "@andrey_yuvchenko_lawyer", video: false, photo: "/assets/review-photo-8.jpg" },
  { handle: "@hutir_solonets", video: true, clip: reviewClip(3) },
  { handle: "@alionadovganych", video: false, photo: "/assets/review-photo-2.jpg" },
  { handle: "@hutir_solonets", video: true, clip: reviewClip(4) },
  { handle: "@dara_statkevych", video: false, photo: "/assets/review-photo-7.jpg" },
  { handle: "@alionadovganych", video: true, clip: reviewClip(5) },
  { handle: "@o.krupenna", video: false, photo: "/assets/review-photo-3.jpg" },
  { handle: "@mama_lessyka", video: true, clip: reviewClip(6) },
  { handle: "@_natashkkaa__04", video: false, photo: "/assets/review-photo-6.jpg" },
  { handle: "@vitakilimnik", video: true, clip: reviewClip(7) },
  { handle: "@nataliiaagatii", video: false, photo: "/assets/review-photo-4.jpg" },
  { handle: "@hutir_solonets", video: true, clip: reviewClip(8) },
  { handle: "@k_.karinaa", video: false, photo: "/assets/review-photo-5.jpg" },
];

export const PLAN_AMENITY_SPOTS: readonly (readonly [string, string])[] = [
  ["44%", "47%"],
  ["58%", "58%"],
  ["71%", "50%"],
  ["83%", "62%"],
  ["27%", "54%"],
  ["36%", "72%"],
  ["14%", "85%"],
  ["62%", "82%"],
];

export const PLAN_COTTAGES: readonly (readonly [string, string])[] = [
  ["22%", "30%"],
  ["36%", "22%"],
  ["52%", "28%"],
  ["66%", "20%"],
  ["80%", "30%"],
  ["20%", "68%"],
  ["88%", "78%"],
];

import { COTTAGE_SPECS, EMAIL, GOOGLE_PLACE_ID, PHONE_HREF, PRICE_PER_NIGHT } from "@/content/site";
import { SITE_URL } from "@/lib/seo";
import { localePath } from "@/locales/config";

import type { BlogPost } from "@/content/blog";
import type { Locale } from "@/locales/config";

type Schema = Readonly<Record<string, unknown>>;

const INSTAGRAM = "https://www.instagram.com/hutir_solonets";

const PLACE: Readonly<
  Record<Locale, { name: string; alternate: string; locality: string; region: string }>
> = {
  uk: {
    name: "Хутір Солонець",
    alternate: "Hutir Solonets",
    locality: "Мигове",
    region: "Чернівецька область",
  },
  en: {
    name: "Hutir Solonets",
    alternate: "Хутір Солонець",
    locality: "Myhove",
    region: "Chernivtsi Oblast",
  },
};

const AMENITIES: Readonly<Record<Locale, readonly string[]>> = {
  uk: [
    "Криті басейни",
    "Відкритий басейн",
    "Джакузі",
    "Чан на дровах",
    "Сауна",
    "Безкоштовний паркінг",
    "Дитячий майданчик",
    "Мангальні зони",
  ],
  en: [
    "Indoor pools",
    "Outdoor pool",
    "Jacuzzi",
    "Wood-fired hot tub",
    "Sauna",
    "Free parking",
    "Playground",
    "Barbecue areas",
  ],
};

export const absoluteUrl = (path: string): string =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`;

const BUSINESS_ID = `${SITE_URL}/#lodging`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const business = (locale: Locale): Schema => {
  const p = PLACE[locale];
  return {
    "@type": "LodgingBusiness",
    "@id": BUSINESS_ID,
    name: p.name,
    alternateName: p.alternate,
    url: absoluteUrl(localePath(locale, "/")),
    logo: absoluteUrl("/logo.svg"),
    image: [
      absoluteUrl("/og.jpg"),
      absoluteUrl("/assets/hero.jpg"),
      absoluteUrl("/assets/territory-map.jpg"),
    ],
    telephone: PHONE_HREF.replace("tel:", ""),
    email: EMAIL,
    priceRange:
      locale === "uk"
        ? `від ${String(PRICE_PER_NIGHT)} грн за ніч`
        : `from UAH ${String(PRICE_PER_NIGHT)} per night`,
    currenciesAccepted: "UAH",
    numberOfRooms: COTTAGE_SPECS.length,
    petsAllowed: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "uk" ? "вул. Солоницька" : "Solonytska St.",
      addressLocality: p.locality,
      addressRegion: p.region,
      addressCountry: "UA",
    },
    hasMap: `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`,
    sameAs: [INSTAGRAM],
    amenityFeature: AMENITIES[locale].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };
};

export const homeSchema = (locale: Locale): Schema => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: absoluteUrl("/"),
      name: PLACE[locale].name,
      alternateName: PLACE[locale].alternate,
      inLanguage: locale,
      publisher: { "@id": BUSINESS_ID },
    },
    business(locale),
  ],
});

export const breadcrumbSchema = (items: readonly (readonly [string, string])[]): Schema => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
});

export const postSchema = (locale: Locale, post: BlogPost, path: string): Schema => {
  const text = post[locale];
  const org = {
    "@type": "Organization",
    name: PLACE[locale].name,
    url: SITE_URL,
    logo: absoluteUrl("/logo.svg"),
  };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: text.title,
    description: text.excerpt,
    image: absoluteUrl(post.cover),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(path),
    author: org,
    publisher: org,
    about: { "@id": BUSINESS_ID },
  };
};

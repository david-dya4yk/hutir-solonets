import { BLOG_POSTS, blogPath } from "@/content/blog";
import { COTTAGE_SPECS, cottageHref, LEGAL_ORDER, OFFERS_ENABLED } from "@/content/site";
import { languages, SITE_URL } from "@/lib/seo";
import { LOCALES, localePath } from "@/locales/config";

import type { MetadataRoute } from "next";

const PATHS: readonly string[] = [
  "/",
  "/cottages",
  ...COTTAGE_SPECS.map(cottageHref),
  "/spa",
  ...(OFFERS_ENABLED ? ["/offers"] : []),
  "/contacts",
  blogPath(),
  ...BLOG_POSTS.map((p) => blogPath(p.slug)),
  ...LEGAL_ORDER.map((k) => `/${k}`),
];

const absolute = (path: string): string => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absolute(localePath(locale, path)),
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languages(path)).map(([l, p]) => [l, absolute(p)]),
        ),
      },
    })),
  );
}

import { NextResponse } from "next/server";

import { SITE_URL } from "@/lib/seo";
import { DEFAULT_LOCALE, isLocale } from "@/locales/config";

import type { NextRequest } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  if (request.headers.get("host")?.startsWith("www.") === true) {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(new URL(`${pathname}${search}`, SITE_URL), 308);
  }
  const url = request.nextUrl.clone();
  const [, first = ""] = url.pathname.split("/", 2);

  if (first === DEFAULT_LOCALE) {
    url.pathname = url.pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url);
  }
  if (isLocale(first)) {
    return NextResponse.next();
  }
  url.pathname = `/${DEFAULT_LOCALE}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|assets|favicon.ico|.*\\..*).*)"],
};

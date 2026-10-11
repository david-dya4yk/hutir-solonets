import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, isLocale } from "@/locales/config";

import type { NextRequest } from "next/server";

export function proxy(request: NextRequest): NextResponse {
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

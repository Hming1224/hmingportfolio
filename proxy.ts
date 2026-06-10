import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /zh and /zh/... to /zh-TW permanently (301)
  if (pathname === "/zh") {
    return NextResponse.redirect(new URL("/zh-TW", request.url), 301);
  }
  if (pathname.startsWith("/zh/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh\//, "/zh-TW/");
    return NextResponse.redirect(url, 301);
  }

  if (
    pathname === "/" &&
    !request.cookies.has("NEXT_LOCALE")
  ) {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

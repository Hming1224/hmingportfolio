import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/" &&
    !request.cookies.has("NEXT_LOCALE")
  ) {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

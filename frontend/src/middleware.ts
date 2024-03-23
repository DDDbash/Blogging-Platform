import { NextRequest, NextResponse } from "next/server";

import { ACCESS_TOKEN } from "./utils/constants";

const publicRoutes = ["/signin", "/signup"];
const privateRoutes = ["/blog/create", "/blog/edit/"];

function checkIfElementExists(string: string, array: string[]) {
  for (let i = 0; i < array.length; i++) {
    if (string.includes(array[i])) {
      return true;
    }
  }
  return false;
}

function verifyOrRedirectRoute(
  request: NextRequest,
  condition: boolean,
  redirectUrl: string,
): NextResponse {
  if (!condition) {
    const url = request.nextUrl.clone();
    url.pathname = redirectUrl;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  const pageName = request.nextUrl.pathname;
  if (!pageName) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  if (accessToken) {
    return verifyOrRedirectRoute(
      request,
      !publicRoutes.includes(pageName),
      "/",
    );
  }

  return verifyOrRedirectRoute(
    request,
    !checkIfElementExists(pageName, privateRoutes),
    "/",
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|logo|images|favicon.ico).*)"],
};

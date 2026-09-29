import { NextResponse, type NextRequest } from "next/server";

/**
 * First line of defence for /command: requests without a session cookie are
 * redirected to the login gate. Full token verification happens server-side
 * in the page/route handlers (Node crypto is unavailable at the edge).
 */
export function middleware(req: NextRequest) {
  const session = req.cookies.get("jk_command_session")?.value;
  const isLogin = req.nextUrl.pathname === "/command/login";
  if (!session && !isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/command/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (session && isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/command";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/command/:path*"] };

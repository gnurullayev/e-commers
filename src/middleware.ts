import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { PUBLIC_ROUTES, routes } from "./constants/routes";

export const config = {
  matcher: ["/:path*"],
};

export default withAuth(
  function middleware(req) {
    const pathName = req.nextUrl.pathname;
    const response = NextResponse.next();

    if (!pathName.includes("/auth")) {
      const path = pathName.split("/").slice(0, 2).join("/");
      if (!req.nextauth.token?.token && !PUBLIC_ROUTES.includes(path)) {
        return NextResponse.redirect(new URL(routes.LOGIN, req.url));
      }
    } else {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token === null) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: routes.LOGIN,
      signOut: "/auth/signout",
    },
  }
);

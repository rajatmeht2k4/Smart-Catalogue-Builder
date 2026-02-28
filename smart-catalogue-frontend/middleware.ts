import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/signup(.*)",
  "/catalogue(.*)",
]);

const isDashboardRoute = createRouteMatcher([
  "/admin(.*)",
  "/products(.*)",
  "/settings(.*)",
  "/catalogue-builder(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Not logged in but accessing dashboard
  if (isDashboardRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // // Logged in but onboarding not completed
  // if (userId && isDashboardRoute(req)) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/onboarding";
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
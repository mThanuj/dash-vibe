import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard"]);

export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
    if (isProtectedRoute(req)) {
      await auth.protect({
        unauthenticatedUrl: `${req.nextUrl.origin}/`,
      });
    }
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

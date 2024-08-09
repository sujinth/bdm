export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home/:path*",
    "/actions/:path*",
    "/coaching/:path*",
    "/page/:path*",
    "/resources/:path*",
    "/visit-reports/:path*",
    "/update-password",
  ],
};

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/conversation", "/music", "/audio", "/video", "/code", "/settings", "/api/conversation", "/api/stripe"],
};

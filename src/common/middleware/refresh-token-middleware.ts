import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import type { CustomMiddleware } from "./chain";
import { ACCESS_TOKEN_SECRET_KEY, decrypt } from "@/lib/jwt";
import { isTokenExpired } from "@/utils/is-token-expired";
import { refreshNewToken } from "@/api/refresh-token/actions";

export function refreshTokenMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const payload = await decrypt(accessToken, ACCESS_TOKEN_SECRET_KEY);

    if (isTokenExpired(payload) && refreshToken) {
      const { access_token, refresh_token } = await refreshNewToken(
        refreshToken
      );
      if (access_token && refresh_token) {
        response = NextResponse.next();
        response.cookies.set("accessToken", access_token, {
          maxAge: 60 * 60 * 24 * 7, // The cookie will be automatically removed after 7 days
          httpOnly: process.env.NEXT_PUBLIC_NODE_ENV === "production",
          secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
          sameSite: "lax" as const,
          path: "/",
        });

        response.cookies.set("refreshToken", refresh_token, {
          maxAge: 60 * 60 * 24 * 7, // The cookie will be automatically removed after 7 days
          httpOnly: process.env.NEXT_PUBLIC_NODE_ENV === "production",
          secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
          sameSite: "lax" as const,
          path: "/",
        });

        return response;
      }
    }
    return middleware(request, event, response);
  };
}

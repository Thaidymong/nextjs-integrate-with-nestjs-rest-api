'use server';

import { REFRESH_TOKEN_API_ENDPOINT } from "@/common/constants/api";

export async function refreshNewToken(refreshToken: string) {
  console.log("[refreshNewToken] Called with refreshToken:", refreshToken);

  try {
    // Adjust key to match API requirement if needed (camelCase or snake_case)
    const data = { refreshToken: refreshToken };
    console.log("[refreshNewToken] Sending request body:", data);

    const response = await fetch(REFRESH_TOKEN_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    const responseData = await response.json();
    console.log("[refreshNewToken] Raw API Response:", responseData);

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: responseData?.message || "Failed to refresh token",
          extensions: {
            statusCode: response.status,
            code: responseData?.error || "REFRESH_FAILED",
          },
        },
      };
    }

    const tokenData = responseData?.data;
    if (!tokenData?.access_token || !tokenData?.refresh_token) {
      return {
        data: null,
        error: {
          message: "Invalid token response from server",
          extensions: { code: "INVALID_TOKEN_RESPONSE", statusCode: 500 },
        },
      };
    }

    return {
      data: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
      },
      error: null,
    };
  } catch (err: any) {
    console.error("[refreshNewToken] Error:", err);
    return {
      data: null,
      error: {
        message: err?.message || "Unexpected error during token refresh",
        extensions: { code: "UNKNOWN_ERROR" },
      },
    };
  }
}

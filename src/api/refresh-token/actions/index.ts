"use server";

import axios from "axios";
import { REFRESH_TOKEN_API_ENDPOINT } from "@/common/constants/api";

export async function refreshNewToken(refreshToken: string) {
  try {
    const { data } = await axios.post(
      REFRESH_TOKEN_API_ENDPOINT,
      { refreshToken },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const { data: res } = data;
    return res;
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err?.message || "Unexpected error during token refresh",
        extensions: { code: "UNKNOWN_ERROR" },
      },
    };
  }
}

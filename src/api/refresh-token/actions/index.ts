'use server';

import { REFRESH_TOKEN_API_ENDPOINT } from "@/common/constants/api";
import { fetchAuthenticatedApi } from "@/lib/api";
import { RefreshTokenActionResponse, RefreshTokenSuccessResponse } from "@/types";

export const refreshNewToken = async (refreshToken: string): Promise<RefreshTokenActionResponse> => {
  console.log('acton refresh token: ', refreshToken);
  try {
    // Correctly pass arguments to fetchAuthenticatedApi
    const apiResponse = await fetchAuthenticatedApi<RefreshTokenSuccessResponse>(
      REFRESH_TOKEN_API_ENDPOINT,
      "POST",
      { refreshToken: refreshToken }, // Body as the third argument
      { cache: "no-store" }, // Options as the fourth argument
    );

    console.log({ apiResponse }); // Log the full API apiResponse for debugging

    if (apiResponse.error) {
      // Directly return the error from fetchAuthenticatedApi
      return {
        // error: apiResponse.error,
        error: {
          message: "Unknown error from API",
          extensions: {
            statusCode: apiResponse.error?.extensions?.statusCode,
          },
        },
        data: null,
      };
    }

    // Check if data.data exists and return the tokens
    if (apiResponse.data?.data) {
      // console.log('access token: ', apiResponse.data.data.access_token);
      // console.log('refresh token: ', apiResponse.data.data.refresh_token);
      return {
        error: null,
        data: {
          accessToken: apiResponse.data.data.access_token,
          refreshToken: apiResponse.data.data.refresh_token,
        },
      };
    } else {
      // Handle cases where the API call was successful but token data is missing
      return {
        error: {
          message: "Token data not found in the API apiResponse.",
          extensions: {
            code: "TOKEN_DATA_MISSING",
            statusCode: 200,
          },
        },
        data: null,
      };
    }
  } catch (error: any) {
    // This catch block is a fallback for unexpected issues before fetchAuthenticatedApi is called,
    // or if fetchAuthenticatedApi itself throws an unhandled error (e.g., network issues).
    let errorMessage = 'An unexpected error occurred during token refresh.';
    let statusCode: number | null = null;
    let code = 'UNEXPECTED_ERROR';

    if (error instanceof Error) {
      errorMessage = error.message;
      // You can add more specific error handling here if needed,
      // e.g., checking for network errors like "Failed to fetch"
    }

    return {
      error: {
        message: errorMessage,
        extensions: {
          code,
          statusCode,
        },
      },
      data: null,
    };
  }
};

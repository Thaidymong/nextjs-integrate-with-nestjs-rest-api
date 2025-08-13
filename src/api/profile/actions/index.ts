"use server"

import { fetchAuthenticatedApi } from "@/lib/api" // Import the new utility
import { GetProfileActionResponse, ProfileSuccessResponse } from "../type"
import { PROFILE_API_ENDPOINT } from "@/common/constants/api"

export const getProfile = async (): Promise<GetProfileActionResponse> => {
  const apiResponse = await fetchAuthenticatedApi<ProfileSuccessResponse>(
    PROFILE_API_ENDPOINT,
    "GET",
    undefined,
    { cache: "no-store" },
  )

  if (apiResponse.error) {
    return {
      data: null,
      error: {
        message: "Authentication token not found. Please log in.",
        extensions: {
          code: "NO_AUTH_TOKEN",
          statusCode: 401,
        },
      },
    }
  }

  if (apiResponse.data?.data) {
    return {
      error: null,
      data: apiResponse.data.data,
    }
  } else {
    return {
      error: {
        message: "Profile data not found in the API response.",
        extensions: {
          code: "PROFILE_DATA_MISSING",
          statusCode: 200,
        },
      },
      data: null,
    }
  }
}

"use server"

import { fetchAuthenticatedApi } from "@/lib/api" // Import the new utility
import { GetProfileActionResponse, ProfileSuccessResponse } from "../type"

const PROFILE_API_ENDPOINT = "http://localhost:8080/api/v1/authentication/profile"

export const getProfile = async (): Promise<GetProfileActionResponse> => {
  const apiResponse = await fetchAuthenticatedApi<ProfileSuccessResponse>(
    PROFILE_API_ENDPOINT,
    "GET",
    undefined,
    { cache: "no-store" },
  )

  if (apiResponse.error) {
    return {
      error: apiResponse.error,
      data: null,
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

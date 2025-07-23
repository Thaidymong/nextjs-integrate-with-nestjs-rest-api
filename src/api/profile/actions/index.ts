// "use server"

// import { RestErrorResponse } from "@/app/features/auth/login/type/login"
// import { cookies } from "next/headers"
// import { GetProfileActionResponse, ProfileSuccessResponse } from "../type"

// const PROFILE_API_ENDPOINT = "http://localhost:8080/api/v1/authentication/profile"

// export const getProfile = async (): Promise<GetProfileActionResponse> => {
//   const cookieStore = cookies()
//   // const accessToken = cookieStore.get("accessToken")?.value
//   const accessToken = (await cookieStore).get("accessToken")?.value

//   if (!accessToken) {
//     return {
//       error: {
//         message: "Authentication token not found. Please log in.",
//         extensions: {
//           code: "NO_AUTH_TOKEN",
//           statusCode: 401,
//         },
//       },
//       data: null,
//     }
//   }
//   console.log({accessToken})

//   try {
//     const response = await fetch(PROFILE_API_ENDPOINT, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`, // Include the access token for authentication
//       },
//       // Consider adding cache: 'no-store' if you want to always fetch fresh data
//       // cache: 'no-store',
//     })

// console.log({response})


//     if (!response.ok) {
//       let errorData: RestErrorResponse | null = null
//       try {
//         errorData = await response.json()
//       } catch (jsonError) {
//         console.error("Failed to parse error response JSON for profile:", jsonError)
//         return {
//           error: {
//             message: response.statusText || "Unknown error fetching profile from API",
//             extensions: {
//               statusCode: response.status,
//             },
//           },
//           data: null,
//         }
//       }

//       console.error("API Error Response (Status:", response.status, ") for profile:", errorData)

//       const errorMessage = errorData?.error?.message || response.statusText || "Failed to fetch profile"
//       const errorCode = errorData?.error?.error || "PROFILE_FETCH_ERROR"

//       return {
//         error: {
//           message: errorMessage,
//           extensions: {
//             code: errorCode,
//             statusCode: response.status,
//           },
//         },
//         data: null,
//       }
//     }

//     const responseBody: ProfileSuccessResponse = await response.json()

//     if (responseBody?.data) {
//       return {
//         error: null,
//         data: responseBody.data,
//       }
//     } else {
//       return {
//         error: {
//           message: "Profile data not found in the API response.",
//           extensions: {
//             code: "PROFILE_DATA_MISSING",
//             statusCode: 200, // Still a 200 OK, but data is incomplete
//           },
//         },
//         data: null,
//       }
//     }
//   } catch (error) {
//     let errorMessage = "An unexpected error occurred while fetching profile."
//     let statusCode: number | null = null
//     let code = "UNKNOWN_PROFILE_ERROR"

//     if (error instanceof Error) {
//       errorMessage = error.message
//       if (error.name === "TypeError" && error.message === "Failed to fetch") {
//         errorMessage = "Network error: Could not connect to the profile server."
//         code = "NETWORK_UNREACHABLE"
//         statusCode = 503
//       }
//     }
//     console.error("Catch block error for profile:", error)

//     return {
//       error: {
//         message: errorMessage,
//         extensions: {
//           code,
//           // statusCode,
//         },
//       },
//       data: null,
//     }
//   }
// }



"use server"

// import type { ProfileSuccessResponse, GetProfileActionResponse } from "@/types/auth"
import { fetchAuthenticatedApi } from "@/lib/api" // Import the new utility
import { GetProfileActionResponse, ProfileSuccessResponse } from "../type"

const PROFILE_API_ENDPOINT = "http://localhost:8080/api/v1/authentication/profile"

export const getProfile = async (): Promise<GetProfileActionResponse> => {
  // Use the new utility function
  const apiResponse = await fetchAuthenticatedApi<ProfileSuccessResponse>(
    PROFILE_API_ENDPOINT,
    "GET",
    undefined, // No body for GET request
    { cache: "no-store" }, // Example: Add cache option if needed
  )

  if (apiResponse.error) {
    // If the utility returned an error, propagate it
    return {
      error: apiResponse.error,
      data: null,
    }
  }

  // If successful, check if the nested 'data' exists as per your API response structure
  if (apiResponse.data?.data) {
    return {
      error: null,
      data: apiResponse.data.data, // Return the nested UserProfile object
    }
  } else {
    // Handle cases where API returns 200 OK but data is missing or malformed
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

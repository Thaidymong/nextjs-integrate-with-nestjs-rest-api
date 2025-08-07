"use server"

import { cookies } from "next/headers"
import { LoginActionResponse, LoginInput, LoginSuccessData, RestErrorResponse } from "../type/login"
import { LOGIN_API_ENDPOINT } from "@/common/constants/api"

export const login = async (input: LoginInput): Promise<LoginActionResponse> => {
  const cookieStore = cookies()

  try {
    const response = await fetch(LOGIN_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      let errorData: RestErrorResponse | null = null
      try {
        errorData = await response.json()
      } catch (jsonError) {
        return {
          error: {
            message: response.statusText || "Unknown error from API",
            extensions: {
              statusCode: response.status,
            },
          },
          data: null,
        }
      }

      const errorMessage = errorData?.error?.message || response.statusText || "Authentication failed"
      const errorCode = errorData?.error?.error || "AUTHENTICATION_ERROR"

      return {
        error: {
          message: errorMessage,
          extensions: {
            code: errorCode,
            statusCode: response.status,
          },
        },
        data: null,
      }
    }

    // Parse the successful response, expecting LoginSuccessData structure
    const responseBody: LoginSuccessData = await response.json()

    // Access tokens from the nested 'data' object
    const accessToken = responseBody?.data?.access_token
    const refreshToken = responseBody?.data?.refresh_token
    console.log({ refreshToken })
    console.log({ accessToken })

    if (accessToken && refreshToken) {
      const cookieOptions = {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
      };

      (await cookieStore).set("accessToken", accessToken, cookieOptions),
        (await cookieStore).set("refreshToken", refreshToken, cookieOptions)
    } else {
      return {
        error: {
          message: "Login successful, but tokens were not provided by the API.",
          extensions: {
            code: "MISSING_TOKENS",
            statusCode: 200,
          },
        },
        data: null,
      }
    }

    return {
      error: null,
      data: responseBody.data, // Return only the nested 'data' object
    }
  } catch (error) {
    let errorMessage = "An unexpected error occurred during login."
    let statusCode: number | null = null
    let code = "UNKNOWN_ERROR"

    if (error instanceof Error) {
      errorMessage = error.message
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        errorMessage = "Network error: Could not connect to the authentication server."
        code = "NETWORK_UNREACHABLE"
        statusCode = 503
      }
    }

    return {
      error: {
        message: errorMessage,
        extensions: {
          code,
          // statusCode,
        },
      },
      data: null,
    }
  }
}

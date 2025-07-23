import { RestErrorResponse } from "@/app/features/auth/login/type/login"
import { cookies } from "next/headers"

// Define a generic response type for our API utility
export interface ApiResponse<T> {
    data: T | null
    error: {
        message: string
        extensions?: {
            code?: string
            statusCode?: number
        }
    } | null
}

/**
 * Makes an authenticated API request.
 * Automatically retrieves the access token from cookies and includes it in the Authorization header.
 *
 * @param url The full URL of the API endpoint.
 * @param method The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param body Optional request body for POST/PUT requests.
 * @param options Optional fetch options to override or extend.
 * @returns A structured ApiResponse containing data or error.
 */
export async function fetchAuthenticatedApi<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: Record<string, any>,
    options?: RequestInit,
): Promise<ApiResponse<T>> {
    const cookieStore = cookies()
    // const accessToken = cookieStore.get("accessToken")?.value
    const accessToken = (await cookieStore).get("accessToken")?.value

    if (!accessToken) {
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

    const defaultHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...defaultHeaders,
                ...options?.headers, // Allow overriding or adding headers
            },
            body: body ? JSON.stringify(body) : undefined,
            ...options, // Spread any other fetch options
        })

        if (!response.ok) {
            let errorData: RestErrorResponse | null = null
            try {
                errorData = await response.json()
            } catch (jsonError) {
                console.error(`Failed to parse error response JSON from ${url}:`, jsonError)
                return {
                    data: null,
                    error: {
                        message: response.statusText || `Unknown error from API: ${url}`,
                        extensions: {
                            statusCode: response.status,
                        },
                    },
                }
            }

            console.error(`API Error Response (Status: ${response.status}) from ${url}:`, errorData)

            const errorMessage = errorData?.error?.message || response.statusText || `Failed request to ${url}`
            const errorCode = errorData?.error?.error || "API_ERROR"

            return {
                data: null,
                error: {
                    message: errorMessage,
                    extensions: {
                        code: errorCode,
                        statusCode: response.status,
                    },
                },
            }
        }

        // Assuming successful responses always return JSON
        const data: T = await response.json()
        return { data, error: null }
    } catch (error) {
        let errorMessage = `An unexpected error occurred during request to ${url}.`
        let statusCode: number | null = null
        let code = "UNKNOWN_FETCH_ERROR"

        if (error instanceof Error) {
            errorMessage = error.message
            if (error.name === "TypeError" && error.message === "Failed to fetch") {
                errorMessage = `Network error: Could not connect to ${url}.`
                code = "NETWORK_UNREACHABLE"
                statusCode = 503
            }
        }
        console.error(`Catch block error for ${url}:`, error)

        return {
            data: null,
            error: {
                message: errorMessage,
                extensions: {
                    code,
                    // statusCode,
                },
            },
        }
    }
}

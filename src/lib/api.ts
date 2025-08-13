import { refreshNewToken } from "@/api/refresh-token/actions"
import { cookies } from "next/headers"

// Generic API response type
interface ApiResponse<T> {
    data: T | null
    error: {
        message: string
        extensions?: {
            code?: string
            statusCode?: number
        }
    } | null
}

export async function fetchAuthenticatedApi<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any,
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

    const makeRequest = async (token: string): Promise<ApiResponse<T>> => {
        try {
            const config: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    ...options?.headers,
                },
                ...options,
            }

            if (body && (method === "POST" || method === "PUT")) {
                config.body = JSON.stringify(body)
            }

            const response = await fetch(url, config)

            if (!response.ok) {
                let errorData: any = {}
                try {
                    errorData = await response.json()
                } catch (jsonError) {
                    console.error(`Failed to parse error response JSON from ${url}:`, jsonError)
                }

                const errorMessage =
                    errorData?.error?.message || errorData?.message || response.statusText || `Failed request to ${url}`
                const errorCode = errorData?.error?.error || errorData?.code || "API_ERROR"

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

            const data = await response.json()
            return {
                data,
                error: null,
            }
        } catch (error) {
            let errorMessage = `An unexpected error occurred during request to ${url}.`
            let code = "UNKNOWN_FETCH_ERROR"

            if (error instanceof Error) {
                errorMessage = error.message
                if (error.name === "TypeError" && error.message === "Failed to fetch") {
                    errorMessage = `Network error: Could not connect to ${url}.`
                    code = "NETWORK_UNREACHABLE"
                }
            }

            return {
                data: null,
                error: {
                    message: errorMessage,
                    extensions: {
                        code,
                    },
                },
            }
        }
    }

    const firstAttempt = await makeRequest(accessToken)

    if (firstAttempt.error?.extensions?.statusCode === 401) {
        console.log("Access token expired, attempting refresh...")

        const refreshResult = await refreshNewToken(accessToken)

        if (refreshResult.error || !refreshResult.data?.accessToken) {
            return {
                data: null,
                error: {
                    message: "Session expired. Please log in again.",
                    extensions: {
                        code: "SESSION_EXPIRED",
                        statusCode: 401,
                    },
                },
            }
        }

        // Retry with new access token
        return makeRequest(refreshResult.data.accessToken)
    }

    return firstAttempt
}

// Helper function to make authenticated requests with token
export async function fetchWithAuth<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any,
    accessToken?: string,
): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    }

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
    }

    return fetchAuthenticatedApi<T>(url, method, body, { headers })
}

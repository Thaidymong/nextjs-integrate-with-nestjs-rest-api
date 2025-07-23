// Define the input type for the login action
export interface LoginInput {
    username: string // Changed from email to username
    password: string
}

// Define the expected successful response structure from your REST API
export interface LoginSuccessData {
    message: string
    data: {
        access_token: string
        refresh_token: string
        // Add any other user data or fields your API returns within this 'data' object
        user?: {
            id: string
            username: string // Assuming username is returned here
            // ... other user details
        }
    }
}

// Define the exact error response structure from your REST API
export interface BackendErrorDetails {
    statusCode: number
    error: string // e.g., 'Unauthorized'
    message: string // The actual message to display, e.g., 'Invalid username or password'
    errors: any // Can be null or an array of validation errors
    timestamp: string
    path: string
}

export interface RestErrorResponse {
    error: BackendErrorDetails // The top-level 'error' key containing details
}

// Define the return type for the server action
export interface LoginActionResponse {
    error: {
        message: string
        extensions?: {
            code?: string
            statusCode?: number
        }
    } | null
    data: LoginSuccessData["data"] | null // Return only the nested 'data' part
}

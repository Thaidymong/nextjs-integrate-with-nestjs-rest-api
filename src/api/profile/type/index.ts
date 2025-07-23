
// NEW: Define the structure for the user profile data
export interface UserProfile {
    id: number
    created_at: string
    updated_at: string
    username: string
    fullname: string
    fullnameEn: string
    profile: string // Assuming this is a URL or path to a profile image
    phoneNumber: string
    gender: string
    nationality: string
    nationalId: string
    positionLevel: string
}

// NEW: Define the expected successful response structure for the profile API
export interface ProfileSuccessResponse {
    message: string
    data: UserProfile
}

// NEW: Define the return type for the getProfile server action
export interface GetProfileActionResponse {
    error: {
        message: string
        extensions?: {
            code?: string
            statusCode?: number
        }
    } | null
    data: UserProfile | null
}

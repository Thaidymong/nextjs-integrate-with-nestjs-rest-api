// Generic API error type
export type ApiError = {
    message: string;
    extensions?: {
        code?: string;
        statusCode?: number | null;
        [key: string]: any;
    };
};

// Generic API response wrapper
export type ApiResponse<T> = {
    data: T | null;
    error: ApiError | null;
};

// --- Profile endpoint types ---
export type ProfileData = {
    id: string;
    name: string;
    email: string;
    // Add other profile fields as needed
};

export type ProfileSuccessResponse = {
    message: string;
    data: ProfileData;
};

export type GetProfileActionResponse = ApiResponse<ProfileData>;

// --- Refresh token types ---
export type RefreshTokenData = {
    access_token: string; // API snake_case
    refresh_token: string; // API snake_case
};

export type RefreshTokenSuccessResponse = {
    message: string;
    data: RefreshTokenData;
};

// --- Internal action response (camelCase for frontend usage) ---
export type RefreshTokenActionResponse = ApiResponse<{
    accessToken: string; // converted to camelCase
    refreshToken: string; // converted to camelCase
}>;

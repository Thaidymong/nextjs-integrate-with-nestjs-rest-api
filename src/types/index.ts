// export type ApiError = {
//     message: string;
//     extensions: {
//         code: string;
//         statusCode: number;
//         [key: string]: any; // Allow for additional custom error properties
//     };
// };

// export type ApiResponse<T> = {
//     data: T | null;
//     error: ApiError | null;
// };

// // Specific types for the profile endpoint
// export type ProfileData = {
//     id: string;
//     name: string;
//     email: string;
//     // Add other profile fields as needed
// };

// export type ProfileSuccessResponse = {
//     data: ProfileData;
//     message?: string;
// };

// export type GetProfileActionResponse = ApiResponse<ProfileData>;


// // Updated types for refresh token based on the provided response body
// export type RefreshTokenData = {
//     access_token: string; // Changed to snake_case
//     refresh_token: string; // Changed to snake_case
// };

// export type RefreshTokenSuccessResponse = {
//     message: string; // Added message field
//     data: RefreshTokenData; // Data field now directly contains RefreshTokenData
// };

// export type RefreshTokenActionResponse = ApiResponse<{
//     accessToken: string; // Keep camelCase for internal use in the action's return
//     refreshToken: string; // Keep camelCase for internal use in the action's return
// }>;
export type ApiError = {
    message: string;
    extensions?: {
        code?: string;
        statusCode?: number | null;
        [key: string]: any;
    };
};

export type ApiResponse<T> = {
    data: T | null;
    error: ApiError | null;
};

// Specific types for the profile endpoint
export type ProfileData = {
    id: string;
    name: string;
    email: string;
    // Add other profile fields as needed
};

export type ProfileSuccessResponse = {
    data: ProfileData;
    message?: string;
};

export type GetProfileActionResponse = ApiResponse<ProfileData>;

// Types for refresh token, matching your API response
export type RefreshTokenData = {
    access_token: string; // Matches "access_token" from your API
    refresh_token: string; // Matches "refresh_token" from your API
};

export type RefreshTokenSuccessResponse = {
    message: string; // Matches "message" from your API
    // data: RefreshTokenData; // Matches "data" object from your API
    data: {
        access_token: string; // Matches "access_token" from your API
        refresh_token: string; // Matches "refresh_token" from your AP
    }
};

export type RefreshTokenActionResponse = ApiResponse<{
    accessToken: string; // Internal camelCase for action's return
    refreshToken: string; // Internal camelCase for action's return
}>;

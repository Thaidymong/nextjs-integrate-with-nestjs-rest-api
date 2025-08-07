// API Base URL from environment variables
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// API Endpoints
export const LOGIN_API_ENDPOINT = `${API_BASE_URL}/api/v1/authentication/login`;
export const PROFILE_API_ENDPOINT = `${API_BASE_URL}/api/v1/authentication/profile`;
export const REFRESH_TOKEN_API_ENDPOINT = `${API_BASE_URL}/api/v1/authentication/refresh-token`;

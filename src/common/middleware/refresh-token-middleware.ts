import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';
import { ACCESS_TOKEN_SECRET_KEY, decrypt } from '@/lib/jwt';
import { isTokenExpired } from '@/utils/is-token-expired';
import { refreshNewToken } from '@/api/refresh-token/actions';
import { ROUTES } from '../constants';

/**
 * Middleware to automatically refresh access tokens when they expire.
 * This middleware should run before the main authentication check.
 *
 * @param middleware The next middleware in the chain.
 * @returns A chained middleware function.
 */
export function refreshTokenMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // Only attempt to decrypt if an access token exists
    const payload = accessToken ? await decrypt(accessToken, ACCESS_TOKEN_SECRET_KEY) : null;
    // Check if access token is expired AND a refresh token exists
    if (isTokenExpired(payload) && refreshToken) {
      const { data, error } = await refreshNewToken(refreshToken); // Call the Server Action

      if (data?.accessToken && data.refreshToken) {
        console.log('Tokens refreshed successfully!');
        // Create a new response object to set cookies
        const newResponse = NextResponse.next();

        const cookieOptions = {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          httpOnly: process.env.NODE_ENV === 'production', // Use NODE_ENV for server-side
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax' as const,
        };

        newResponse.cookies.set('accessToken', data.accessToken, cookieOptions);
        newResponse.cookies.set('refreshToken', data.refreshToken, cookieOptions);

        // Continue the middleware chain with the new response (containing updated cookies)
        return middleware(request, event, newResponse);
      } else {
        // If refresh failed (e.g., refresh token invalid/expired), clear tokens and redirect to login
        console.error('Failed to refresh tokens:', error?.message || 'Unknown error');
        const redirectResponse = NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
        redirectResponse.cookies.delete('accessToken');
        redirectResponse.cookies.delete('refreshToken');
        return redirectResponse;
      }
    }

    // If access token is not expired, or no refresh token, proceed with the original response
    return middleware(request, event, response);
  };
}

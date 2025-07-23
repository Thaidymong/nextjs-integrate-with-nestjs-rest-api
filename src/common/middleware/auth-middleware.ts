import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';
import { ACCESS_TOKEN_SECRET_KEY, decrypt } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { ROUTES } from '../constants';
import { isMatchingRoute } from '@/utils/is-matching-route';

const publicRoutes = ['/login'];
const homeRoutes = ['/'];
const protectedRoutes = [
  '/profile',
];

export function authMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const { pathname } = request.nextUrl;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const isProtectedRoutes =
      protectedRoutes.some((route) => pathname.startsWith(route)) ||
      isMatchingRoute(homeRoutes, pathname);
    const isPublicRoutes = publicRoutes.some((route) => pathname.startsWith(route));

    // if (isPublicRoutes && accessToken) {
    //   // If the user is already logged in and trying to access the login page, redirect them to the dashboard
    //   if (pathname === `${ROUTES.LOGIN}`) {
    //     return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    //   }
    // }

    // If the route is public and there is no access token, proceed with the next middleware
    if (isPublicRoutes && !accessToken) {
      return middleware(request, event, response);
    }

    if (isProtectedRoutes && !accessToken) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    const payload = await decrypt(accessToken, ACCESS_TOKEN_SECRET_KEY);

    if (isProtectedRoutes && !payload?.sub) {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    // if (isPublicRoutes && payload?.sub) {
    //   return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    // }

    return middleware(request, event, response);
  };
}

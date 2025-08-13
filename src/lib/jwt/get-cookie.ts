'use server';

import { cookies } from 'next/headers';

export const getCookie = async () => {
  const cookiesStore = await cookies();

  return cookiesStore.get('accessToken')?.value;
};

export const removeCookie = async (keys: Array<string>) => {
  const cookiesStore = await cookies();
  keys.forEach((key) => cookiesStore.delete(key));
};

/**
 * Sets a cookie with a specified key and value, and optional expiration time.
 *
 * @param key - The name of the cookie to set.
 * @param value - The value to assign to the cookie.
 * @param expires - Optional. The number of minutes until the cookie expires. Defaults to 3 minutes.
 */

export const setCookie = async (key: string, value: string, expires = 3) => {
  const cookiesStore = await cookies();
  cookiesStore.set(key, value, {
    path: '/',
    maxAge: 60 * expires, // The cookie will be automatically removed after expires minutes
    httpOnly: process.env.NEXT_PUBLIC_ENV === 'production',
    secure: process.env.NEXT_PUBLIC_ENV === 'production',
    sameSite: 'lax',
  });
};

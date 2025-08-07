import { JWTPayload, jwtVerify } from 'jose';
import { JwtPayload } from './types';

export const accessTokenSecret = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET;

export const ACCESS_TOKEN_SECRET_KEY = new TextEncoder().encode(accessTokenSecret);
export const REFRESH_TOKEN_SECRET_KEY = new TextEncoder().encode(refreshTokenSecret);

export const decrypt = async (
  token: string | undefined = '',
  key: Uint8Array
): Promise<(JwtPayload & JWTPayload) | null> => {
  try {
    const { payload } = await jwtVerify<JwtPayload>(token, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
};

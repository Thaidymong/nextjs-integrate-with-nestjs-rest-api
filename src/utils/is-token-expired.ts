
import { JwtPayload } from '@/types/jwt-payload';
import { JWTPayload } from 'jose';

export const isTokenExpired = (payload: (JwtPayload & JWTPayload) | null): boolean => {
  if (!payload?.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

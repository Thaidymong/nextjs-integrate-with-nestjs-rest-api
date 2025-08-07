// import { JwtPayload } from '@/types/jwt-payload';
// import { JWTPayload } from 'jose';

import { JwtPayload } from "@/types/jwt-payload";
import { JWTPayload } from "jose";

// export const isTokenExpired = (payload: (JwtPayload & JWTPayload) | null): boolean => {
//   if (!payload?.exp) return true;
//   const currentTime = Math.floor(Date.now() / 1000);
//   return payload.exp < currentTime;
// };


/**
 * Checks if a JWT payload indicates an expired token.
 *
 * @param payload The decrypted JWT payload.
 * @returns True if the token is expired, false otherwise.
 */
export function isTokenExpired(payload: (JwtPayload & JWTPayload) | null): boolean {
  if (!payload) {
    return true;
}
  if (!payload || !payload.exp) {
    return true; // Treat as expired if no payload or no expiration time
  }
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return payload.exp < currentTime;
}

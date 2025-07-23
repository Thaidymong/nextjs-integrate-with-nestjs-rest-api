import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;
/**
 * Chains an array of middleware functions, allowing each middleware to call the next in sequence.
 *
 * @param functions - An array of middleware factories that produce custom middleware functions.
 * @param index - The current index in the functions array to chain from. Defaults to 0.
 *
 * @returns A custom middleware function that sequentially applies each middleware in the list.
 */
export function chain(functions: MiddlewareFactory[], index = 0): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    return response;
  };
}

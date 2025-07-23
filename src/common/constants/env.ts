export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api-docs',
  NODE_ENV: process.env.NEXT_PUBLIC_ENV ?? 'development',
  JWT_ACCESS_TOKEN_SECRET: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET ?? 'secret',
  JWT_REFRESH_TOKEN_SECRET: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET ?? 'secret',
};

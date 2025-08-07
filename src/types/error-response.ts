export type Extensions = {
  code?: string;
  statusCode: number | null;
};

export type ErrorResponse = {
  message?: string;
  extensions?: Extensions;
};

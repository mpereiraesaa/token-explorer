import { Response } from 'node-fetch';

enum ErrorType {
  ProviderError = 'ProviderError',
  AuthError = 'AuthError',
  TokenMetadataError = 'TokenServiceError',
  TokenBalancesError = 'TokenBalancesError',
  UnknownError = 'UnknownError',
}

export enum ErrorCode {
  ProviderError = 1,
  AuthError = 2,
  TokenMetadataError = 3,
  TokenBalancesError = 4,
  UnknownError = 5,
}

export class BaseError extends Error {
  code: ErrorCode;
  htmlMessage?: string;

  constructor(type: ErrorType, code: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);

    this.code = code;
    this.name = type.toString();
  }
}

export class UnknownError extends BaseError {
  constructor(code: ErrorCode, message: string) {
    super(ErrorType.UnknownError, code, message);
  }
}

export class ProviderError extends BaseError {
  constructor(code: ErrorCode, message: string) {
    super(ErrorType.ProviderError, code, message);
  }
}

export class TokenBalancesError extends BaseError {
  constructor(code: ErrorCode, message: string) {
    super(ErrorType.TokenBalancesError, code, message);
  }
}

export class TokenMetadataError extends BaseError {
  constructor(code: ErrorCode, message: string) {
    super(ErrorType.TokenMetadataError, code, message);
  }
}

export class AuthError extends BaseError {
  constructor(code: ErrorCode, message: string) {
    super(ErrorType.AuthError, code, message);
  }
}

export class HTTPError extends Error {
  public response: Response;
  public status: number;

  constructor(response: Response) {
    const code = response.status || response.status === 0 ? response.status : '';
    const title = response.statusText || '';
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : 'an unknown error';

    super(`Request failed with ${reason}`);

    this.name = 'HTTPError';
    this.response = response;
    this.status = response.status;
  }
}

import { Response } from 'node-fetch';

export class AlchemyRpcError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AlchemyRpcError';
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

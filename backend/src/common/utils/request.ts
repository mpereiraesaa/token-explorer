import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';

import { HTTPError } from '@/common/utils/errors';
import { sleep } from '@/common/utils/utils';

export const requestSettings = {
  retries: 1,
};

interface ExtendedRequestInit extends RequestInit {
  retries?: number;
  skipTrackingHeaders?: boolean;
}

export const request = async <T = Response>(
  url: RequestInfo | URL,
  options: ExtendedRequestInit = {
    retries: requestSettings.retries,
  }
): Promise<T> => {
  options.retries = options.retries ?? requestSettings.retries;
  try {
    const response: Response = await fetch(url, options);
    if (!response.ok) {
      throw new HTTPError(response);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (options.retries > 0 && (error as HTTPError)?.status === 500) {
      await sleep(500);
      return request<T>(url, { ...options, retries: options.retries - 1 });
    }
    throw error;
  }
};

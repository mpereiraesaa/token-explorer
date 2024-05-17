import { createClient } from 'redis';

import { env } from '@/common/utils/envConfig';

export const getRedisClient = () => {
  const client = createClient({ url: env.REDIS_URI });

  client.on('error', (err) => {
    console.error('Redis error:', err);
  });

  return client;
};

export const getCachedData = async <T>(
  cacheKey: string,
  expiry: number,
  fetch_fn: (...args: any[]) => Promise<T>,
  ...args: any[]
) => {
  const client = getRedisClient();
  const cachedData = await client.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData) as T;
  }

  const data = await fetch_fn(...args);
  client.set(cacheKey, JSON.stringify(data), expiry > 0 ? { EX: expiry } : {});
  return data;
};

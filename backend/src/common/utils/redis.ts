import Redis from 'redis';

import { env } from '@/common/utils/envConfig';

export const getRedisClient = () => {
  const client = Redis.createClient({ url: env.REDIS_URI });

  client.on('error', (err) => {
    console.error('Redis error:', err);
  });

  return client;
};

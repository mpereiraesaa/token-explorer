import jwt from 'jsonwebtoken';

import { env } from '@/common/utils/envConfig';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION });
};

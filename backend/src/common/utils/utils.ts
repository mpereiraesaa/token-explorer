import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

import { env } from '@/common/utils/envConfig';
import { VerifySignatureFunc } from '@/interfaces/IWeb3Provider';

export const verifySignature: VerifySignatureFunc = (address: string, message: string, signature: string): boolean => {
  return ethers.getAddress(address) === ethers.verifyMessage(message, signature);
};

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION });
};

export const sleep = (ms: number): Promise<undefined> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

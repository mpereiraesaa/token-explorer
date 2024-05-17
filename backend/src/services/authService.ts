import { sign } from 'jsonwebtoken';

import { env } from '@/common/utils/envConfig';
import { AuthError, ErrorCode, UnknownError } from '@/common/utils/errors';
import { Account } from '@/entities/account';
import { accountRepository } from '@/repositories/';

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRATION = env.JWT_EXPIRATION;

export const generateJwt = (address: string): string => {
  return sign({ address }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const registerUser = async (address: string, chainId: number): Promise<string> => {
  try {
    let user = await accountRepository.findOne({ where: { address } });

    if (!user) {
      user = new Account();
      user.address = address;
      user.chain = chainId.toString();
      await accountRepository.save(user);
    }

    const jwt = generateJwt(address);
    return jwt;
  } catch (err) {
    if (err instanceof Error) {
      throw new AuthError(ErrorCode.AuthError, `Unexpected error while onboarding: ${err.message}`);
    } else {
      throw new UnknownError(ErrorCode.UnknownError, `An unknown error occurred while onboarding address ${address}`);
    }
  }
};

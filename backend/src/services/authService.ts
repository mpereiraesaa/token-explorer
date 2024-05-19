import { sign, verify } from 'jsonwebtoken';

import { getDataSource } from '@/common/utils/dbConfig';
import { env } from '@/common/utils/envConfig';
import { AuthError, ErrorCode, UnknownError } from '@/common/utils/errors';
import { Account } from '@/entities/account';

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRATION = env.JWT_EXPIRATION;

export const generateJwt = (address: string): string => {
  return sign({ address }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const validateUser = async (jwt: string): Promise<void> => {
  try {
    const appDataSource = await getDataSource();
    const accountRepository = appDataSource.getRepository(Account);
    const { address } = verify(jwt, JWT_SECRET) as { address: string };
    const user = await accountRepository.findOne({ where: { address: address } });
    if (!user) {
      throw new Error('Invalid JWT');
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new AuthError(ErrorCode.AuthError, `Unexpected error while validating JWT: ${err.message}`);
    } else {
      throw new UnknownError(ErrorCode.UnknownError, `An unknown error occurred while validating JWT ${jwt}`);
    }
  }
};

export const registerUser = async (address: string, chain: string): Promise<string> => {
  try {
    const appDataSource = await getDataSource();
    const accountRepository = appDataSource.getRepository(Account);
    let user = await accountRepository.findOne({ where: { address } });

    if (!user) {
      user = new Account();
      user.address = address;
      user.chain = chain;
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

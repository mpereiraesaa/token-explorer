import { ethers } from 'ethers';

import { VerifySignatureFunc } from '@/interfaces/IWeb3Provider';

export const verifySignature: VerifySignatureFunc = (address: string, message: string, signature: string) : boolean => {
  const messageHash = ethers.id(message);
  return ethers.getAddress(address) === ethers.verifyMessage(messageHash, signature);
};

export const sleep = (ms: number): Promise<undefined> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

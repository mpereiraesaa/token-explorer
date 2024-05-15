import { ethers } from 'ethers';

import { IWeb3Provider } from '@/common/interfaces/IWeb3Provider';

export class EthersLibProvider implements IWeb3Provider {
  async verifySignature(address: string, message: string, signature: string): Promise<boolean> {
    const messageHash = ethers.id(message);
    return ethers.getAddress(address) === ethers.verifyMessage(messageHash, signature);
  }
}

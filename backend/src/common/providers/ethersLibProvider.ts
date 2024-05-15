import { ethers, JsonRpcProvider } from 'ethers';

import { IWeb3Provider } from '@/common/interfaces/IWeb3Provider';
import { ERC20_ABI } from '@/common/utils/constants';

export class EthersLibProvider implements IWeb3Provider {
  private provider: JsonRpcProvider;
  constructor(rpcUrl: string) {
    this.provider = new JsonRpcProvider(rpcUrl);
  }
  async verifySignature(address: string, message: string, signature: string): Promise<boolean> {
    const messageHash = ethers.id(message);
    return ethers.getAddress(address) === ethers.verifyMessage(messageHash, signature);
  }
  async getTokenNameAndSymbol(address: string): Promise<{ name: string; symbol: string }> {
    const contract = new ethers.Contract(address, ERC20_ABI, this.provider);
    const name = await contract.name();
    const symbol = await contract.symbol();
    return { name, symbol };
  }
}

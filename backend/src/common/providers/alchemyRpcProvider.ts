import fetch from 'node-fetch';

import { ITokenBalancesProvider } from '@/common/interfaces/ITokenBalancesProvider';
import { AlchemyRpcError } from '@/common/utils/errors';

interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
}

interface TokenBalancesResult {
  address: string;
  tokenBalances: TokenBalance[];
}

interface AlchemyRpcResponse {
  jsonrpc: string;
  id: number | null;
  result: TokenBalancesResult;
}

export class AlchemyRpcProvider implements ITokenBalancesProvider {
  private rpcUrl: string;
  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }
  buildRawQuery(method: string, params: string[]) {
    return JSON.stringify({
      jsonrpc: '2.0',
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    });
  }
  async getTokenBalances(address: string): Promise<{ [token: string]: bigint }> {
    try {
      const raw = this.buildRawQuery('alchemy_getTokenBalances', [address]);
      const responseData = await fetch(this.rpcUrl, { method: 'POST', body: raw, redirect: 'follow' });
      const jsonData: AlchemyRpcResponse = await responseData.json();
      const tokenBalances: { [token: string]: bigint } = {};
      for (const balance of jsonData.result.tokenBalances) {
        tokenBalances[balance.contractAddress] = BigInt(balance.tokenBalance);
      }
      return tokenBalances;
    } catch (err) {
      if (err instanceof Error) {
        throw new AlchemyRpcError(`Unexpected error: ${err.message}`);
      } else {
        throw new AlchemyRpcError(`An unknown error occurred while fetching token balances for ${address}`);
      }
    }
  }
}

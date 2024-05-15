import fetch from 'node-fetch';

import {
  ITokenBalancesProvider,
  TokenBalances,
  TokenMetadataResponse,
} from '@/common/interfaces/ITokenBalancesProvider';
import { AlchemyRpcError } from '@/common/utils/errors';

interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
}

interface TokenBalancesResult {
  address: string;
  tokenBalances: TokenBalance[];
  pageKey?: string;
}

interface AlchemyRpcResponse<T> {
  jsonrpc: string;
  id: number | null;
  result: T;
}

export class AlchemyRpcProvider implements ITokenBalancesProvider {
  private rpcUrl: string;
  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }
  buildRawQuery(method: string, params: any) {
    return JSON.stringify({
      jsonrpc: '2.0',
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    });
  }
  async getTokenBalances(
    address: string,
    pageKey: string | null = null,
    maxCount: number = 25
  ): Promise<[TokenBalances, string]> {
    try {
      const options = { ...(pageKey && { pageKey }), maxCount };
      const raw = this.buildRawQuery('alchemy_getTokenBalances', [address, 'erc20', options]);
      const responseData = await fetch(this.rpcUrl, { method: 'POST', body: raw, redirect: 'follow' });
      const jsonData: AlchemyRpcResponse<TokenBalancesResult> = await responseData.json();
      const tokenBalances: TokenBalances = {};
      if (jsonData.result === undefined) {
        throw new AlchemyRpcError(`Invalid response: ${JSON.stringify(jsonData)}`);
      }
      for (const balance of jsonData.result.tokenBalances) {
        tokenBalances[balance.contractAddress] = BigInt(balance.tokenBalance);
      }
      return [tokenBalances, jsonData.result.pageKey || ''];
    } catch (err) {
      if (err instanceof Error) {
        throw new AlchemyRpcError(`Unexpected error: ${err.message}`);
      } else {
        throw new AlchemyRpcError(`An unknown error occurred while fetching token balances for ${address}`);
      }
    }
  }

  async getTokenMetadata(contractAddress: string): Promise<TokenMetadataResponse> {
    try {
      const raw = this.buildRawQuery('alchemy_getTokenMetadata', [contractAddress]);
      const responseData = await fetch(this.rpcUrl, { method: 'POST', body: raw, redirect: 'follow' });
      const jsonData: AlchemyRpcResponse<TokenMetadataResponse> = await responseData.json();
      return jsonData.result;
    } catch (err) {
      if (err instanceof Error) {
        throw new AlchemyRpcError(`Unexpected error: ${err.message}`);
      } else {
        throw new AlchemyRpcError(`An unknown error occurred while fetching token metadata for ${contractAddress}`);
      }
    }
  }
}

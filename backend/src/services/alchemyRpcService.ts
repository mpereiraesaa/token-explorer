import { AlchemyRpcError } from '@/common/utils/errors';
import { request } from '@/common/utils/request';
import { ITokenBalancesProvider, TokenBalances, TokenMetadataResponse } from '@/interfaces/ITokenBalancesProvider';

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

type AlchemyParams = [string] | [string, 'erc20', { pageKey?: string; maxCount?: number }];

export class AlchemyRpcService implements ITokenBalancesProvider {
  private rpcUrl: string;
  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }
  static buildRawRequest(method: string, params: AlchemyParams) {
    return JSON.stringify({
      jsonrpc: '2.0',
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    });
  }
  sendRequest<T>(method: string, params: AlchemyParams): Promise<T> {
    const raw = AlchemyRpcService.buildRawRequest(method, params);
    return request<T>(this.rpcUrl, {
      method: 'POST',
      body: raw,
    });
  }
  async getTokenBalances(
    address: string,
    pageKey: string | null = null,
    maxCount: number = 25
  ): Promise<[TokenBalances, string]> {
    try {
      const options = { ...(pageKey && { pageKey }), maxCount };
      const response = await this.sendRequest<AlchemyRpcResponse<TokenBalancesResult>>('alchemy_getTokenBalances', [
        address,
        'erc20',
        options,
      ]);
      const tokenBalances: TokenBalances = {};
      if (response.result === undefined) {
        throw new AlchemyRpcError(`Invalid response: ${JSON.stringify(response)}`);
      }
      for (const balance of response.result.tokenBalances) {
        tokenBalances[balance.contractAddress] = BigInt(balance.tokenBalance);
      }
      return [tokenBalances, response.result.pageKey || ''];
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
      const response = await this.sendRequest<AlchemyRpcResponse<TokenMetadataResponse>>('alchemy_getTokenMetadata', [
        contractAddress,
      ]);
      return response.result;
    } catch (err) {
      if (err instanceof Error) {
        throw new AlchemyRpcError(`Unexpected error: ${err.message}`);
      } else {
        throw new AlchemyRpcError(`An unknown error occurred while fetching token metadata for ${contractAddress}`);
      }
    }
  }
}

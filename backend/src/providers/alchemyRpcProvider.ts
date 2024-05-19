import { DEFAULT_MAX_COUNT } from '@/common/utils/constants';
import { ErrorCode, HTTPError, TokenBalancesError, TokenMetadataError, UnknownError } from '@/common/utils/errors';
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

export class AlchemyRpcProvider implements ITokenBalancesProvider {
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
    const raw = AlchemyRpcProvider.buildRawRequest(method, params);
    return request<T>(this.rpcUrl, {
      method: 'POST',
      body: raw,
    });
  }
  async getTokenBalances(
    address: string,
    pageKey: string | null = null,
    maxCount: number = DEFAULT_MAX_COUNT
  ): Promise<[TokenBalances[], string]> {
    try {
      const options = { ...(pageKey && { pageKey }), maxCount: Number(maxCount) };
      const response = await this.sendRequest<AlchemyRpcResponse<TokenBalancesResult>>('alchemy_getTokenBalances', [
        address,
        'erc20',
        options,
      ]);
      if (response.result === undefined) {
        throw new TokenBalancesError(ErrorCode.TokenBalancesError, `Invalid response: ${JSON.stringify(response)}`);
      }
      const processedTokenBalances = response.result.tokenBalances.map((balance) => ({
        tokenAddress: balance.contractAddress,
        balance: BigInt(balance.tokenBalance).toString(),
      }));
      return [processedTokenBalances, response.result.pageKey || ''];
    } catch (err) {
      if (err instanceof HTTPError) {
        throw new TokenBalancesError(
          ErrorCode.TokenBalancesError,
          `Failed to fetch token balances. reason: ${err.message}`
        );
      }
      if (err instanceof Error) {
        throw new TokenBalancesError(ErrorCode.TokenBalancesError, `Unexpected error: ${err.message}`);
      } else {
        throw new UnknownError(
          ErrorCode.UnknownError,
          `An unknown error occurred while fetching token balances for ${address}`
        );
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
      if (err instanceof HTTPError) {
        throw new TokenMetadataError(
          ErrorCode.TokenMetadataError,
          `Failed to fetch token metadata. reason: ${err.message}`
        );
      }
      if (err instanceof Error) {
        throw new TokenMetadataError(ErrorCode.TokenMetadataError, `Unexpected error: ${err.message}`);
      } else {
        throw new UnknownError(
          ErrorCode.UnknownError,
          `An unknown error occurred while fetching token metadata for ${contractAddress}`
        );
      }
    }
  }
}

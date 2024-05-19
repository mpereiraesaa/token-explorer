import { CHAIN_RPC_URLS, DEFAULT_BALANCES_CACHE_TTL, SupportedChain } from '@/common/utils/constants';
import { BaseError, ErrorCode, UnknownError } from '@/common/utils/errors';
import { getCachedData } from '@/common/utils/redis';
import { TokenMetadataResponse } from '@/interfaces/ITokenBalancesProvider';
import { AlchemyRpcProvider } from '@/providers/alchemyRpcProvider';

export const getTokensForAddress = async (
  chain: SupportedChain,
  address: string,
  maxCount?: number,
  pageKey?: string
) => {
  try {
    const provider = new AlchemyRpcProvider(CHAIN_RPC_URLS[chain]);

    const [tokens, newPageKey] = await getCachedData(
      `token-balances-${address}-${chain}-${maxCount}-${pageKey}`,
      DEFAULT_BALANCES_CACHE_TTL,
      provider.getTokenBalances.bind(provider),
      address,
      pageKey,
      maxCount
    );

    const tokenDataArray = await Promise.all(
      tokens.map(async (tokenData) => {
        const metadata = await getCachedData<TokenMetadataResponse>(
          `token-metadata-${tokenData.tokenAddress}`,
          -1,
          provider.getTokenMetadata.bind(provider),
          tokenData.tokenAddress
        );
        return {
          tokenAddress: tokenData.tokenAddress,
          balance: tokenData.balance,
          ...metadata,
        };
      })
    );

    return { tokens: tokenDataArray, ...(newPageKey && { pageKey: newPageKey }) };
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new UnknownError(
        ErrorCode.UnknownError,
        `An unknown error occurred while fetching tokens. ${error instanceof Error ? error.message : ''}`
      );
    }
  }
};

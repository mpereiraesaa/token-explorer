import { CHAIN_RPC_URLS, SupportedChain } from '@/common/utils/constants';
import { AlchemyRpcProvider } from '@/providers/alchemyRpcProvider';

export const getTokensForAddress = async (
  chain: SupportedChain,
  address: string,
  maxCount?: number,
  pageKey?: string
) => {
  const provider = new AlchemyRpcProvider(CHAIN_RPC_URLS[chain]);

  return [];
};

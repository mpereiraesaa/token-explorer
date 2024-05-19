import { Chain, TOKENS_ENDPOINT } from '@/constants/constants';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from "wagmi";
import { useOnboardingStore } from '@/app/stores/onboarding';

export interface TokenBalance {
  name: string;
  symbol: string;
  tokenAddress: string;
  balance: string;
  decimals: number;
}

export const useTokensBalance = (
  pageKey?: string,
  maxCount?: number
) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const chain = Chain[chainId as keyof typeof Chain];
  const { authenticated: isAuthenticated } = useOnboardingStore((state) => state);

  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens', pageKey, maxCount],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      let requestUrl = `${apiUrl}/${chain}/${TOKENS_ENDPOINT}/${address}`;
      const queryParams = new URLSearchParams();

      if (pageKey) {
        queryParams.append('pageKey', pageKey);
      }
      if (maxCount) {
        queryParams.append('maxCount', maxCount.toString());
      }
      const queryString = queryParams.toString();
      if (queryString) {
        requestUrl += `?${queryString}`;
      }

      const response = await fetch(requestUrl);
      if (!response.ok) {
        const data = await response.json();
        throw new Error('Server error: ' + data.message || "Something went wrong");
      }
      const result = await response.json();
      return result;
    },
    enabled: isAuthenticated,
  });

  return {
    tokens: data?.responseObject?.tokens as TokenBalance[] || [],
    pageKey: data?.responseObject?.pageKey,
    isLoading,
    error,
  };
};

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { ETHEREUM_ADDRESS_REGEX, SUPPORTED_CHAINS } from '@/common/utils/constants';

extendZodWithOpenApi(z);

export const TokensResponseData = z.object({
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  logo: z.string(),
  tokenAddress: z.string(),
  balance: z.string(),
});

export const TokensRequestQuery = z.object({
  maxCount: z.string().optional(),
  pageKey: z
    .string()
    .optional()
    .refine((val) => !val || ETHEREUM_ADDRESS_REGEX.test(val), {
      message: 'pageKey must be a valid Ethereum address',
    }),
});

export const TokensRequestParams = z.object({
  chain: z.enum(SUPPORTED_CHAINS),
  address: z.string(),
});

export const tokensRequestSchema = z.object({
  params: TokensRequestParams,
  query: TokensRequestQuery,
});

export const TokensResponse = z.object({
  tokens: z.array(TokensResponseData),
  pageKey: z.string().optional(),
});

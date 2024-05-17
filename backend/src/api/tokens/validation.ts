import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { ETHEREUM_ADDRESS_REGEX, SUPPORTED_CHAINS } from '@/common/utils/constants';

extendZodWithOpenApi(z);

export const TokensRequestQuery = z.object({
  maxCount: z.number().optional(),
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

export const tokensResponseSchema = z.object({
  tokens: z.array(z.any()),
});

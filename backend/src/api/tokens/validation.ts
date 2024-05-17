import { z } from 'zod';

import { ETHEREUM_ADDRESS_REGEX, SUPPORTED_CHAINS } from '@/common/utils/constants';

export const tokensRequestSchema = z.object({
  query: z.object({
    maxCount: z.number().optional(),
    pageKey: z
      .string()
      .optional()
      .refine((val) => !val || ETHEREUM_ADDRESS_REGEX.test(val), {
        message: 'pageKey must be a valid Ethereum address',
      }),
  }),
  params: z.object({
    chain: z.enum(SUPPORTED_CHAINS),
    address: z.string(),
  }),
});

export const tokensResponseSchema = z.object({
  success: z.boolean(),
  tokens: z.array(z.any()),
});

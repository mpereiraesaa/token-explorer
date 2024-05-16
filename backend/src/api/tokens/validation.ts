import { z } from 'zod';

import { SUPPORTED_CHAINS } from '@/common/utils/constants';

export const tokensRequestSchema = z.object({
  query: z.object({
    maxCount: z.number().optional(),
    pageKey: z.string().optional(),
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

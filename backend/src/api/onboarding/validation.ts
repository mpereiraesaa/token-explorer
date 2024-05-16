import { z } from 'zod';

import { SUPPORTED_CHAINS } from '@/common/utils/constants';

export const OnboardingRequestSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  chain: z.enum(SUPPORTED_CHAINS),
  signature: z.string().min(1, 'Signature is required'),
});

export const OnboardingResponseSchema = z.object({
  jwt: z.string(),
  success: z.boolean(),
});

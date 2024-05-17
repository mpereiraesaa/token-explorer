import { z } from 'zod';

import { ETHEREUM_ADDRESS_REGEX, SUPPORTED_CHAINS } from '@/common/utils/constants';

export const OnboardingRequestSchema = z.object({
  address: z.string().refine((val) => !val || ETHEREUM_ADDRESS_REGEX.test(val), {
    message: 'address must be a valid Ethereum address',
  }),
  chain: z.enum(SUPPORTED_CHAINS),
  signature: z.string().min(1, 'Signature is required'),
});

export const OnboardingRequestBodySchema = z.object({
  body: OnboardingRequestSchema,
});

export const OnboardingResponseSchema = z.object({
  jwt: z.string(),
});

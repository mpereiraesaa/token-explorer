import { z } from 'zod';

export const OnboardingRequestSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  chain_id: z.number().int().min(1, 'Chain ID must be a positive integer'),
  signature: z.string().min(1, 'Signature is required'),
});

export const OnboardingResponseSchema = z.object({
  jwt: z.string(),
  success: z.boolean(),
});

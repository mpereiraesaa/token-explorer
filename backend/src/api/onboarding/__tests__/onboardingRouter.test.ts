import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { verifySignature } from '@/common/utils/utils';
import { accountRepository } from '@/repositories';
import { app } from '@/server';

vi.mock('@/repositories');
vi.mock('@/common/utils/utils');

describe('Onboarding API endpoints', () => {
  const validAddress = '0x1234567890abcdef1234567890abcdef12345678';
  const invalidAddress = '0x12345';
  const validChain = 'ethereum';
  const invalidChain = 'myChain';
  const validSignature = 'ValidSignature';
  const invalidSignature = 'InvalidSignature';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('POST /onboarding - success', async () => {
    vi.mocked(verifySignature).mockResolvedValue(true);
    vi.mocked(accountRepository.findOne).mockResolvedValue(null);
    vi.mocked(accountRepository.save).mockResolvedValue({});

    const response = await request(app)
      .post('/api/v1/onboarding')
      .send({ address: validAddress, chain: validChain, signature: validSignature });

    expect(response.status).toBe(StatusCodes.OK);
    const result: ServiceResponse = response.body;
    expect(result.message).toBe('Onboarding successful');
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toHaveProperty('jwt');
  });

  it('POST /onboarding - invalid address', async () => {
    vi.mocked(verifySignature).mockResolvedValue(true);
    vi.mocked(accountRepository.findOne).mockResolvedValue(null);
    vi.mocked(accountRepository.save).mockResolvedValue({});

    const response = await request(app)
      .post('/api/v1/onboarding')
      .send({ address: invalidAddress, chain: validChain, signature: validSignature });

    const result: ServiceResponse = response.body;
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.message).toContain('address must be a valid Ethereum address');
    expect(result.success).toBeFalsy();
  });

  it('POST /onboarding - invalid chain', async () => {
    vi.mocked(verifySignature).mockResolvedValue(true);
    vi.mocked(accountRepository.findOne).mockResolvedValue(null);
    vi.mocked(accountRepository.save).mockResolvedValue({});

    const response = await request(app)
      .post('/api/v1/onboarding')
      .send({ address: validAddress, chain: invalidChain, signature: validSignature });

    const result: ServiceResponse = response.body;
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.message).toContain('chain: Invalid enum value');
    expect(result.success).toBeFalsy();
  });

  it('POST /onboarding - invalid signature', async () => {
    vi.mocked(verifySignature).mockResolvedValue(false);

    const response = await request(app)
      .post('/api/v1/onboarding')
      .send({ address: validAddress, chain: validChain, signature: invalidSignature });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    const result: ServiceResponse = response.body;
    expect(result.success).toBeFalsy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toBe('Invalid signature');
  });

  it('POST /onboarding - unexpected error', async () => {
    const errorMessage = 'DB fail.';
    vi.mocked(verifySignature).mockResolvedValue(true);
    vi.mocked(accountRepository.findOne).mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .post('/api/v1/onboarding')
      .send({ address: validAddress, chain: validChain, signature: validSignature });

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    const result: ServiceResponse = response.body;
    expect(result.success).toBeFalsy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toBe('Unexpected error while onboarding: ' + errorMessage);
  });
});

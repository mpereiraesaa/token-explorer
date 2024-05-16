import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as testData from '@/common/services/__tests__/fixtures/fixtures';
import { AlchemyRpcService } from '@/common/services/alchemyRpcService';
import { request } from '@/common/utils/request';

vi.mock('@/common/utils/request', () => ({
  request: vi.fn(),
}));

const rpcUrl = 'https://example.com/rpc';
const mockedRequest = vi.mocked(request);
const alchemyRpcService = new AlchemyRpcService(rpcUrl);

describe('AlchemyRpcService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(alchemyRpcService, 'sendRequest');
  });

  describe('getTokenBalances', () => {
    it('should return balances and pageKey', async () => {
      mockedRequest.mockResolvedValue(testData.ALCHEMY_TOKEN_BALANCE_RESPONSE);

      const [result, pageKey] = await alchemyRpcService.getTokenBalances(
        testData.SOME_ADDRESS,
        testData.PAGE_KEY,
        testData.MAX_COUNT
      );

      expect(alchemyRpcService.sendRequest).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        '0xtoken1': BigInt('100'),
        '0xtoken2': BigInt('200'),
      });
      expect(pageKey).toEqual(testData.PAGE_KEY);
    });

    it('should set pagination key correctly', async () => {
      mockedRequest.mockResolvedValue(testData.ALCHEMY_TOKEN_BALANCE_RESPONSE);

      await alchemyRpcService.getTokenBalances(testData.SOME_ADDRESS);
      await alchemyRpcService.getTokenBalances(testData.SOME_ADDRESS, testData.PAGE_KEY);

      const first_params = JSON.parse(mockedRequest.mock.calls[0][1]?.body as any).params[2];
      const second_params = JSON.parse(mockedRequest.mock.calls[1][1]?.body as any).params[2];

      expect(first_params.pageKey).toEqual(undefined);
      expect(second_params.pageKey).toEqual(testData.PAGE_KEY);
    });
  });

  describe('getTokenMetadata', () => {
    it('should return token metadata', async () => {
      mockedRequest.mockReturnValue(Promise.resolve(testData.ALCHEMY_TOKEN_METADATA_RESPONSE));

      const result = await alchemyRpcService.getTokenMetadata(testData.ALCHEMY_SOME_CONTRACT_ADDRESS);

      expect(alchemyRpcService.sendRequest).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        name: 'Token Name',
        symbol: 'TKN',
        decimals: 18,
        logo: 'https://example.com/logo.png',
      });
    });
  });
});

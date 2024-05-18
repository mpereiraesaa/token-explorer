import { beforeEach, describe, expect, it, vi } from 'vitest';

import { request } from '@/common/utils/request';
import * as testData from '@/providers/__tests__/fixtures/fixtures';
import { AlchemyRpcProvider } from '@/providers/alchemyRpcProvider';

vi.mock('@/common/utils/request', () => ({
  request: vi.fn(),
}));

const rpcUrl = 'https://example.com/rpc';
const mockedRequest = vi.mocked(request);
const alchemyRpcProvider = new AlchemyRpcProvider(rpcUrl);

describe('AlchemyRpcProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(alchemyRpcProvider, 'sendRequest');
  });

  describe('getTokenBalances', () => {
    it('should return balances and pageKey', async () => {
      mockedRequest.mockResolvedValue(testData.ALCHEMY_TOKEN_BALANCE_RESPONSE);

      const [result, pageKey] = await alchemyRpcProvider.getTokenBalances(
        testData.SOME_ADDRESS,
        testData.PAGE_KEY,
        testData.MAX_COUNT
      );

      expect(alchemyRpcProvider.sendRequest).toHaveBeenCalledTimes(1);
      expect(result).toEqual([
        { tokenAddress: '0xtoken1', balance: '100' },
        { tokenAddress: '0xtoken2', balance: '200' },
      ]);
      expect(pageKey).toEqual(testData.PAGE_KEY);
    });

    it('should set pagination key correctly', async () => {
      mockedRequest.mockResolvedValue(testData.ALCHEMY_TOKEN_BALANCE_RESPONSE);

      await alchemyRpcProvider.getTokenBalances(testData.SOME_ADDRESS);
      await alchemyRpcProvider.getTokenBalances(testData.SOME_ADDRESS, testData.PAGE_KEY);

      const first_params = JSON.parse(mockedRequest.mock.calls[0][1]?.body as any).params[2];
      const second_params = JSON.parse(mockedRequest.mock.calls[1][1]?.body as any).params[2];

      expect(first_params.pageKey).toEqual(undefined);
      expect(second_params.pageKey).toEqual(testData.PAGE_KEY);
    });

    it('should return balances without pageKey', async () => {
      mockedRequest.mockResolvedValue(testData.ALCHEMY_TOKEN_BALANCE_RESPONSE_NO_PAGE_KEY);

      await alchemyRpcProvider.getTokenBalances(testData.SOME_ADDRESS);

      const [, pageKey] = await alchemyRpcProvider.getTokenBalances(
        testData.SOME_ADDRESS,
        testData.PAGE_KEY,
        testData.MAX_COUNT
      );

      expect(pageKey).toEqual('');
    });
  });

  describe('getTokenMetadata', () => {
    it('should return token metadata', async () => {
      mockedRequest.mockReturnValue(Promise.resolve(testData.ALCHEMY_TOKEN_METADATA_RESPONSE));

      const result = await alchemyRpcProvider.getTokenMetadata(testData.ALCHEMY_SOME_CONTRACT_ADDRESS);

      expect(alchemyRpcProvider.sendRequest).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        name: 'Token Name',
        symbol: 'TKN',
        decimals: 18,
        logo: 'https://example.com/logo.png',
      });
    });
  });
});

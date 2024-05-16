export const SOME_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
export const PAGE_KEY = 'somePageKey';
export const MAX_COUNT = 10;

export const ALCHEMY_TOKEN_BALANCE_RESPONSE = {
  jsonrpc: '2.0',
  id: 1,
  result: {
    address: SOME_ADDRESS,
    tokenBalances: [
      { contractAddress: '0xtoken1', tokenBalance: '100' },
      { contractAddress: '0xtoken2', tokenBalance: '200' },
    ],
    pageKey: PAGE_KEY,
  },
};

export const ALCHEMY_SOME_CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
export const ALCHEMY_TOKEN_METADATA_RESPONSE = {
  jsonrpc: '2.0',
  id: 1,
  result: {
    name: 'Token Name',
    symbol: 'TKN',
    decimals: 18,
    logo: 'https://example.com/logo.png',
  },
};

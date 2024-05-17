export const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const DEFAULT_MAX_COUNT = 10;

export const DEFAULT_BALANCES_CACHE_TTL = 300; // 5 minutes

export const WELCOME_MESSAGE = 'Welcome to Jumper';

export const SUPPORTED_CHAINS = ['ethereum', 'arbitrum', 'ethereum_sepolia'] as const;

export const CHAIN_RPC_URLS = {
  ethereum: 'https://eth-mainnet.g.alchemy.com/v2/RZGrjyHN23ikZBA82XMxEpuxB5jAQS39',
  arbitrum: 'https://arb-mainnet.g.alchemy.com/v2/O788zfcV1vRjBp_2hEGdhCgSZDqo7hHb',
  ethereum_sepolia: 'https://eth-sepolia.g.alchemy.com/v2/gBNL5ZzdLEikhJC2oD5LmjApwpOWPwvN',
};

export type SupportedChain = (typeof SUPPORTED_CHAINS)[number];

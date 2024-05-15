export const ERC20_ABI = [
  // Only the necessary parts of the ERC20 ABI
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export const CHAIN_RPC_URLS = {
  ethereum: 'https://eth-mainnet.g.alchemy.com/v2/RZGrjyHN23ikZBA82XMxEpuxB5jAQS39',
  arbitrum: 'https://arb-mainnet.g.alchemy.com/v2/O788zfcV1vRjBp_2hEGdhCgSZDqo7hHb',
  ethereum_sepolia: 'https://eth-sepolia.g.alchemy.com/v2/gBNL5ZzdLEikhJC2oD5LmjApwpOWPwvN',
};

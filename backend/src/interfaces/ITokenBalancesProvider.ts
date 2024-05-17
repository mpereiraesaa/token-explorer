export interface TokenMetadataResponse {
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
}

export type TokenBalances = { tokenAddress: string; balance: string };

export interface ITokenBalancesProvider {
  getTokenBalances(address: string): Promise<[TokenBalances[], string]>;
  getTokenMetadata(address: string): Promise<TokenMetadataResponse>;
}

export interface TokenMetadataResponse {
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
}

export type TokenBalances = { [token: string]: bigint };

export interface ITokenBalancesProvider {
  getTokenBalances(address: string): Promise<[TokenBalances, string]>;
  getTokenMetadata(address: string): Promise<TokenMetadataResponse>;
}

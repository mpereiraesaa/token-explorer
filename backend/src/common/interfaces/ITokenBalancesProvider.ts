export interface ITokenBalancesProvider {
  getTokenBalances(address: string): Promise<{ [token: string]: bigint }>;
}

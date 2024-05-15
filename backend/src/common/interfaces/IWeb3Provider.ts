export interface IWeb3Provider {
  verifySignature(address: string, message: string, signature: string): Promise<boolean>;
}

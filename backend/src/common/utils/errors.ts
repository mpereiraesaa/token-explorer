export class AlchemyRpcError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AlchemyRpcError';
  }
}

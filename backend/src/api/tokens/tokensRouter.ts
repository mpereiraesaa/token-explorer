import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodSchema } from 'zod';

import { TokensRequestParams, TokensRequestQuery, tokensRequestSchema, TokensResponse } from '@/api/tokens/validation';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse, ServiceResponseObjectError } from '@/common/models/serviceResponse';
import { SupportedChain } from '@/common/utils/constants';
import { BaseError } from '@/common/utils/errors';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { getTokensForAddress } from '@/services/tokenService';

type TokensRequestParams = {
  chain: SupportedChain;
  address: string;
};

type TokensRequestQuery = {
  maxCount?: number;
  pageKey?: string;
};

export const tokensRegistry = new OpenAPIRegistry();

const TokensRequestParamsSchema = tokensRegistry.register('TokensRequestParams', TokensRequestParams);
const TokensRequestQuerySchema = tokensRegistry.register('TokensRequestQuery', TokensRequestQuery);
const TokensResponseSchema = tokensRegistry.register('TokensResponse', TokensResponse);

export const tokensRouter: Router = (() => {
  const router = Router();

  tokensRegistry.registerPath({
    method: 'get',
    path: '/api/v1/{chain}/tokens/{address}',
    tags: ['Tokens'],
    request: {
      params: TokensRequestParamsSchema,
      query: TokensRequestQuerySchema,
    },
    responses: createApiResponse(TokensResponseSchema, 'Success', StatusCodes.OK),
  });

  router.get(
    '/:chain/tokens/:address',
    validateRequest(tokensRequestSchema as ZodSchema),
    async (_req: Request, res: Response) => {
      const { chain, address } = _req.params as TokensRequestParams;
      const { maxCount, pageKey } = _req.query as TokensRequestQuery;

      try {
        const tokens = await getTokensForAddress(chain as SupportedChain, address, maxCount, pageKey);
        const serviceResponse = new ServiceResponse(
          ResponseStatus.Success,
          'Tokens fetched successfully',
          { tokens },
          StatusCodes.OK
        );
        handleServiceResponse(serviceResponse, res);
      } catch (err) {
        const serviceResponse = new ServiceResponse<ServiceResponseObjectError>(
          ResponseStatus.Failed,
          err instanceof Error ? err.message : 'Unexpected error',
          err instanceof BaseError ? { code: err.code } : null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
        return handleServiceResponse(serviceResponse, res);
      }
    }
  );

  return router;
})();

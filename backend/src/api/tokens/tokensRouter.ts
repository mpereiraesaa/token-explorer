import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodSchema } from 'zod';

import { tokensRequestSchema, tokensResponseSchema } from '@/api/tokens/validation';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const tokensRegistry = new OpenAPIRegistry();

export const tokensRouter: Router = (() => {
  const router = Router();

  tokensRegistry.registerPath({
    method: 'get',
    path: '/:chain/:address/tokens',
    tags: ['Tokens'],
    request: {
      params: tokensRequestSchema.shape.params,
      query: tokensRequestSchema.shape.query,
    },
    responses: createApiResponse(tokensResponseSchema, 'Success'),
  });

  router.get(
    '/:chain/:address/tokens',
    validateRequest(tokensRequestSchema as ZodSchema),
    (_req: Request, res: Response) => {
      const { chain, address } = _req.params;
      const { maxCount, pageKey } = _req.query;

      const tokens: any[] = [];

      const serviceResponse = new ServiceResponse(
        ResponseStatus.Success,
        'Tokens fetched successfully',
        { success: true, tokens },
        StatusCodes.OK
      );
      handleServiceResponse(serviceResponse, res);
    }
  );

  return router;
})();

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { OnboardingRequestSchema, OnboardingResponseSchema } from '@/api/onboarding/validation';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { WELCOME_MESSAGE } from '@/common/utils/constants';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { verifySignature } from '@/common/utils/utils';

export const onboardingRegistry = new OpenAPIRegistry();

export const onboardingRouter: Router = (() => {
  const router = Router();

  onboardingRegistry.registerPath({
    method: 'post',
    path: '/onboarding',
    tags: ['Onboarding'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: OnboardingRequestSchema,
          },
        },
      },
    },
    responses: createApiResponse(OnboardingResponseSchema, 'Onboarding successful', StatusCodes.OK),
  });

  router.post('/onboarding', validateRequest(OnboardingRequestSchema), async (req: Request, res: Response) => {
    const { address, chain_id, signature } = req.body;
    const isValidSignature = await verifySignature(address, WELCOME_MESSAGE, signature);

    if (!isValidSignature) {
      const serviceResponse = new ServiceResponse<null>(
        ResponseStatus.Failed,
        'Invalid signature',
        null,
        StatusCodes.UNAUTHORIZED
      );
      return handleServiceResponse(serviceResponse, res);
    }

    const jwt = 'mocked-jwt-token';

    const serviceResponse = new ServiceResponse<{ jwt: string }>(
      ResponseStatus.Success,
      'Onboarding successful',
      { jwt },
      StatusCodes.OK
    );
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();

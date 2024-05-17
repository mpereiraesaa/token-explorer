import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { OnboardingRequestSchema, OnboardingResponseSchema } from '@/api/onboarding/validation';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse, ServiceResponseObjectError } from '@/common/models/serviceResponse';
import { WELCOME_MESSAGE } from '@/common/utils/constants';
import { AuthError } from '@/common/utils/errors';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { verifySignature } from '@/common/utils/utils';
import { registerUser } from '@/services/authService';

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
    try {
      const { address, chain, signature } = req.body;
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

      const jwt = await registerUser(address, chain);

      const serviceResponse = new ServiceResponse<{ jwt: string }>(
        ResponseStatus.Success,
        'Onboarding successful',
        { jwt },
        StatusCodes.OK
      );
      handleServiceResponse(serviceResponse, res);
    } catch (err) {
      if (err instanceof AuthError) {
        const serviceResponse = new ServiceResponse<ServiceResponseObjectError>(
          ResponseStatus.Failed,
          err.message,
          { code: err.code },
          StatusCodes.UNAUTHORIZED
        );
        return handleServiceResponse(serviceResponse, res);
      } else {
        const serviceResponse = new ServiceResponse<null>(
          ResponseStatus.Failed,
          err instanceof Error ? err.message : 'Unexpected error',
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
        return handleServiceResponse(serviceResponse, res);
      }
    }
  });

  return router;
})();

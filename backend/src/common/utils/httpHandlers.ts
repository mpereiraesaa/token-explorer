import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue, ZodSchema } from 'zod';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errorMessages = (err as ZodError).errors.map((e: ZodIssue) => {
      return `${e.path[e.path.length - 1]}: ${e.message} ${'expected' in e ? `, expected ${e.expected}` : ''}`;
    });
    const statusCode = StatusCodes.BAD_REQUEST;
    res
      .status(statusCode)
      .send(
        new ServiceResponse<null>(
          ResponseStatus.Failed,
          `Invalid input detected: ${errorMessages.join(', ')}`,
          null,
          statusCode
        )
      );
  }
};

import { Request, Response } from '@libs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { get, omit } from 'lodash';

import { StatusCodes } from 'http-status-codes';
interface ResponseType {
  success: boolean;
  code: StatusCodes;
  data: any;
  message?: string;
  errors?: any;
  meta?: any;
}
@Injectable()
export class RequestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.bindRequestHelpers(context.switchToHttp().getRequest());
    this.bindResponseHelpers(context.switchToHttp().getResponse());

    return true;
  }
  /**
   * Bind Response Helpers
   * This helper is responsible for handling Response of nest app.
   *
   * @param response
   */
  bindResponseHelpers(response: Response): Response {
    const success = (data: Record<string, any> | Array<any> | string, status = StatusCodes.OK) => {
      const result: ResponseType = {
        success: true,
        code: status,
        data: data,
      };
      return response.status(status).json(result);
    };

    const error = (errorObject: any, status = StatusCodes.UNAUTHORIZED) => {
      let errorMsg;
      let errors = null;
      if (errorObject instanceof Object) {
        errorMsg = errorObject?.message;
        errors = errorObject?.errors;
      } else {
        errorMsg = errorObject;
      }
      const result: ResponseType = {
        success: false,
        code: status,
        message: errorMsg,
        errors: errors,
        data: null,
      };
      return response.status(status).json(result);
    };

    const noContent = () => {
      return response.status(StatusCodes.NO_CONTENT).end();
    };

    const withMeta = (data: Record<string, any>, status = StatusCodes.OK) => {
      const result: ResponseType = {
        success: true,
        code: status,
        data: get(data, 'data'),
        meta: omit(data, ['data']),
      };
      return response.status(status).json(result);
    };
    response.success = success;
    response.error = error;
    response.noContent = noContent;
    response.withMeta = withMeta;

    return response;
  }

  /**
   * Bind Request Helpers
   *
   * @param request
   */
  bindRequestHelpers(request: Request): Request {
    const all = (): Record<string, any> => {
      const inputs = { ...request.query, ...request.body, ...request.params };

      for (const key in inputs) {
        const value = inputs[key];
        if (typeof value === 'string' || value instanceof String) {
          inputs[key] = value.trim();
        }
      }

      return inputs;
    };

    request.all = all;
    return request;
  }
}

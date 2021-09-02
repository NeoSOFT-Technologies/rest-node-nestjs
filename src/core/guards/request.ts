import { Request, Response } from '@app/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { get, omit } from 'lodash';

import { StatusCodes } from 'http-status-codes';
import { encrypt } from '../crypto/crypto';
import { ConfigService } from '@nestjs/config';

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
  constructor(private readonly config: ConfigService) {}
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
    const APPLY_ENCRYPTION = this.config.get('app.applyEncription');
    const success = (data: Record<string, any> | Array<any> | string, status = StatusCodes.OK) => {
      let result: ResponseType | any = {
        success: true,
        code: status,
        data: data,
      };

      if (APPLY_ENCRYPTION) {
        result = encrypt(result);
      }

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
      let result: ResponseType | any = {
        success: false,
        code: status,
        message: errorMsg,
        errors: errors,
        data: null,
      };

      if (APPLY_ENCRYPTION) {
        result = encrypt(result);
      }
      return response.status(status).json(result);
    };

    const noContent = () => {
      return response.status(StatusCodes.NO_CONTENT).end();
    };

    const withMeta = (data: Record<string, any>, status = StatusCodes.OK) => {
      let result: ResponseType | any = {
        success: true,
        code: status,
        data: get(data, 'data'),
        meta: omit(data, ['data']),
      };

      if (APPLY_ENCRYPTION) {
        result = encrypt(result);
      }
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

import { Response as BaseResponse } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface Response extends BaseResponse {
  success(data: Record<string, any> | Array<any> | string, status?: StatusCodes): any;

  error(error: Record<string, any> | string, status?: StatusCodes): any;

  noContent(): any;

  withMeta(data: Record<string, any>, status?: StatusCodes): any;
}

import { Response } from '@app/core';

export class mockResponse implements Partial<Response> {
  success(): any {
    return 'mock_success';
  }
  error(): any {
    return 'mock_error';
  }
  noContent(): any {
    return 'mock_noContent';
  }
  withMeta(): any {
    return 'mock_withMeta';
  }
}

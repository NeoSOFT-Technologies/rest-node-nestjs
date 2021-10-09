import { Request } from '@app/core';

export class mockRequest implements Partial<Request> {
  all(): Record<string, any> {
    return { key: 'value' };
  }
}

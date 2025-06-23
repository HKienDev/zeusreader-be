import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: IUser }>();
    return request.user;
  },
);

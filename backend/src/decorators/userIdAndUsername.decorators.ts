import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const UserIdAndUsername = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.user?.userId;
    const username = request.user?.username;

    if (!userId || !username) {
      throw new NotFoundException('User not found');
    }

    return { userId, username };
  },
);

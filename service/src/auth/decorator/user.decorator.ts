import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// 获取用户装饰器
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

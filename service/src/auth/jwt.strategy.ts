import { PrismaService } from './../prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

// 验证策略是否有token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    super({
      //解析用户提交的header中的Bearer Token数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //加密码的 secret
      secretOrKey: configService.get('TOKEN_SECRET'),
    })
  }

  //验证通过后获取用户资料
  async validate({ sub: id }) {
    return this.prisma.user.findFirst({
      where: { id },
    })
  }
}

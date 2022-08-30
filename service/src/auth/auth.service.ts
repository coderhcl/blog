import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { user } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
  // 注册用户
  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    })
    if (user) {
      throw new BadRequestException('用户已存在，请登录')
    }
    const createUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: await hash(dto.password),
      },
    })
    if (!createUser) {
      throw new BadRequestException('用户创建失败')
    }
    return {
      message: '用户创建成功',
    }
  }

  async token({ username, id }: user) {
    return await this.jwt.signAsync({
      username,
      id,
    })
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    })

    if (!user) {
      throw new BadRequestException('用户不存在')
    }
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException('密码错误')
    }
    const token = await this.token(user)
    delete user.password
    return { token, user }
  }
}

import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number) {
    return await this.prismaService.user.findFirst({
      where: { id },
    })
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto)
    updateUserDto.password = await hash(updateUserDto.password)
    console.log('updateUserDto', updateUserDto)

    const data: any = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    })
    return {
      message: '修改密码成功',
    }
  }
}

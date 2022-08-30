/*
 * @Author: hcl
 * @Date: 2022-08-21 12:57:48
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-21 15:52:47
 * @FilePath: \HCLBlog\service\src\link\link.service.ts
 * @Description:友链增删改查
 *
 */
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateLinkDto } from './dto/create-link.dto'
import { UpdateLinkDto } from './dto/update-link.dto'

@Injectable()
export class LinkService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createLinkDto: CreateLinkDto) {
    const createResult = await this.prismaService.link.create({
      data: {
        name: createLinkDto.name,
        avatar: createLinkDto.avatar,
        url: createLinkDto.url,
        outline: createLinkDto.outline,
      },
    })
    return {
      message: '友链创建成功',
      createResult,
    }
  }

  async findAllAndSelect(name?: string, page?: number, size?: number) {
    let data, total
    if (!name) {
      data = await this.prismaService.link.findMany({
        skip: Number((page - 1) * size) || 0,
        take: size || 99,
      })
      total = (await this.prismaService.link.findMany()).length
    } else {
      data = await this.prismaService.link.findMany({
        where: {
          name: { contains: name },
        },
        skip: Number((page - 1) * size) || 0,
        take: size || 99,
      })
      total = (
        await this.prismaService.link.findMany({
          where: {
            name: { contains: name },
          },
        })
      ).length
    }

    return {
      message: '获取成功',
      data,
      total,
    }
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    const isExistLink = await this.prismaService.link.findFirst({
      where: { id },
    })
    if (!isExistLink) {
      throw new BadRequestException('未查询到相关数据!')
    }
    const updateData = await this.prismaService.link.update({
      where: { id },
      data: {
        name: updateLinkDto.name,
        avatar: updateLinkDto.avatar,
        outline: updateLinkDto.outline,
        url: updateLinkDto.url,
        isValid: updateLinkDto.isValid,
      },
    })
    return {
      message: `${updateData.name}友链更新成功`,
      updateData,
    }
  }

  async remove(id: number) {
    const isExistLink = await this.prismaService.link.findFirst({
      where: { id },
    })
    if (!isExistLink) {
      throw new BadRequestException('未查询到相关数据!')
    }
    const deleteData = await this.prismaService.link.delete({
      where: { id },
    })
    return {
      message: `${deleteData.avatar}友链删除成功`,
      deleteData,
    }
  }
}

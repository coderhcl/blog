/*
 * @Author: hcl
 * @Date: 2022-08-20 22:21:33
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-20 23:15:29
 * @FilePath: \HCLBlog\service\src\tag\tag.service.ts
 * @Description:分类子标签CRUD实现
 *
 */
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const isExistTag = await this.prismaService.tag.findFirst({
      where: { tagname: createTagDto.tagname },
    })
    if (isExistTag) {
      throw new BadRequestException('标签已存在')
    }

    const createResult = await this.prismaService.tag.create({
      data: {
        tagname: createTagDto.tagname,
      },
    })
    return {
      message: `${createTagDto.tagname}创建成功`,
      createResult,
    }
  }

  async findAll() {
    return await this.prismaService.tag.findMany({
      // include: { article: true },
    })
  }

  async findOne(id: number) {
    const tag = await this.prismaService.tag.findUnique({
      where: { id: id },
    })
    if (!tag) {
      throw new BadRequestException('查询数据为空，请检查查询内容')
    }
    return tag
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const isExistTag = await this.prismaService.tag.findFirst({
      where: { tagname: updateTagDto.tagname },
    })
    if (isExistTag) {
      throw new BadRequestException('标签名称已存在')
    }
    const updateResult = await this.prismaService.tag.update({
      where: { id: id },
      data: {
        tagname: updateTagDto.tagname,
      },
    })
    return {
      message: `'${updateResult.tagname}'标签修改成功`,
      updateResult,
    }
  }

  async remove(id: number) {
    const isExistTag = await this.prismaService.tag.findFirst({
      where: { id },
    })
    if (!isExistTag) {
      throw new BadRequestException('标签不存在，请选择正确的标签')
    }
    const deleteResult = await this.prismaService.tag.delete({
      where: { id },
    })
    return {
      message: `'${deleteResult.tagname}'标签删除成功`,
      deleteResult,
    }
  }
}

/*
 * @Author: hcl
 * @Date: 2022-08-20 16:46:46
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-20 17:50:32
 * @FilePath: \HCLBlog\service\src\category\category.service.ts
 * @Description:分类增删改查
 *
 */

import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prismaService.category.findFirst({
      where: { categoryname: createCategoryDto.categoryname },
    })
    if (category) {
      throw new BadRequestException('分类已存在')
    }
    const createCategory = await this.prismaService.category.create({
      data: {
        categoryname: createCategoryDto.categoryname,
      },
    })
    return {
      message: `${createCategory.categoryname}分类创建成功`,
    }
  }

  async findAll() {
    return await this.prismaService.category.findMany()
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findFirst({
      where: { id },
    })
    if (!category) {
      throw new BadRequestException('查询数据为空，请检查查询内容')
    }
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const isExit = await this.prismaService.category.findFirst({
      where: { categoryname: updateCategoryDto.categoryname },
    })
    if (isExit) {
      throw new BadRequestException(`${updateCategoryDto.categoryname}分类已存在，请勿重复创建`)
    }
    const updateResult = await this.prismaService.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    })
    return {
      message: `${updateResult.categoryname}更新成功`,
    }
  }

  async remove(id: number) {
    const isExit = await this.prismaService.category.findFirst({
      where: { id },
    })
    if (!isExit) {
      throw new BadRequestException('所删除分类不存在')
    }
    const deleteResult = await this.prismaService.category.delete({
      where: { id },
    })
    return {
      message: `${deleteResult.categoryname}删除成功`,
    }
  }
}

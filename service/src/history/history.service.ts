/*
 * @Author: hcl
 * @Date: 2022-08-21 12:08:11
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-21 12:42:30
 * @FilePath: \HCLBlog\service\src\history\history.service.ts
 * @Description:建站日志crud
 *
 */
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateHistoryDto } from './dto/create-history.dto'
import { UpdateHistoryDto } from './dto/update-history.dto'

@Injectable()
export class HistoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createHistoryDto: CreateHistoryDto) {
    const createResult = await this.prismaService.history.create({
      data: {
        date: createHistoryDto.date,
        describe: createHistoryDto.describe,
      },
    })
    return {
      message: '建站日志创建成功',
      createResult,
    }
  }

  async findAll() {
    return await this.prismaService.history.findMany({ orderBy: [{ date: 'desc' }] })
  }

  async findOne(id: number) {
    const history = await this.prismaService.history.findUnique({
      where: { id },
    })
    if (!history) {
      throw new BadRequestException('未查询到相关数据，请重新输入查询关键词')
    }
    return history
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const isExistHistory = await this.prismaService.history.findFirst({
      where: { id },
    })
    if (!isExistHistory) {
      throw new BadRequestException('未查询到相关数据，请重新输入查询关键词')
    }
    const updataHistory = await this.prismaService.history.update({
      where: { id },
      data: {
        date: updateHistoryDto.date,
        describe: updateHistoryDto.describe,
      },
    })
    return {
      message: '日志更新成功',
      updataHistory,
    }
  }

  async remove(id: number) {
    const deleteResult = await this.prismaService.history.delete({
      where: { id },
    })
    if (!deleteResult) {
      throw new BadRequestException('未查询到相关日志信息，删除失败')
    }
    return {
      message: '日志删除成功',
      deleteResult,
    }
  }
}

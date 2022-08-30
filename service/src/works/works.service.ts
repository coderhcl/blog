import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateWorkDto } from './dto/create-work.dto'
import { UpdateWorkDto } from './dto/update-work.dto'

@Injectable()
export class WorksService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createWorkDto: CreateWorkDto) {
    const worksData = await this.prismaService.project.create({
      data: createWorkDto,
    })
    return {
      message: '创建成功',
      data: worksData,
    }
  }

  async findAll() {
    const worksData = await this.prismaService.project.findMany()
    return {
      message: '查询成功',
      data: worksData,
      total: worksData.length,
    }
  }

  async findOne(id: number) {
    const worksData = await this.prismaService.project.findFirst({
      where: { id },
    })
    return {
      message: '查询成功',
      data: worksData,
    }
  }

  async update(id: number, updateWorkDto: UpdateWorkDto) {
    const worksData = await this.prismaService.project.update({
      where: { id },
      data: updateWorkDto,
    })
    return {
      message: '更新成功',
      data: worksData,
    }
  }

  async remove(id: number) {
    const worksData = await this.prismaService.project.delete({
      where: { id },
    })
    return {
      message: '删除成功',
      data: worksData,
    }
  }
}

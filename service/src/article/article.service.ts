/*
 * @Author: hcl
 * @Date: 2022-08-20 23:19:23
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-20 23:58:48
 * @FilePath: \HCLBlog\service\src\article\article.service.ts
 * @Description:文章增删改查
 *
 */
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    const isExistTitle = await this.prismaService.article.findFirst({
      where: { title: createArticleDto.title },
    })
    if (isExistTitle) {
      throw new BadGatewayException('文章标题重复')
    }
    const article = await this.prismaService.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        contentOutline: createArticleDto.contentOutline,
        firstPicture: createArticleDto.firstPicture || '',
        category: createArticleDto.category,
        tags: createArticleDto.tags || '暂无标签',
        isTop: createArticleDto.isTop,
        status: createArticleDto.status,
        htmlContent: createArticleDto.htmlContent,
      },
    })
    return {
      message: `'${article.title}'文章创建成功`,
      article,
    }
  }

  async findOneById(id: number) {
    const data = await this.prismaService.article.findFirst({
      where: { id },
    })
    return {
      message: '获取成功',
      data,
    }
  }

  async findAllAndSelectByTitle(title: string, status: string, page: number, size: number) {
    let article, total
    console.log('title', title)
    console.log('status', status)
    console.log('page', page)
    console.log('size', size)
    // console.log('title', title)
    if (!title && status == undefined) {
      article = await this.prismaService.article.findMany({
        orderBy: [{ created_at: 'desc' }],
        skip: Number((page - 1) * size) || 0,
        take: size || 99,
      })
      total = (await this.prismaService.article.findMany()).length
    }
    if (!status && title) {
      article = await this.prismaService.article.findMany({
        where: {
          title: { contains: title },
        },
        orderBy: [{ created_at: 'desc' }],
        skip: Number((page - 1) * size) || 0,
        take: size || 99,
      })
      total = (
        await this.prismaService.article.findMany({
          where: {
            title: { contains: title },
          },
        })
      ).length
    } else if (!title && status) {
      article = await this.prismaService.article.findMany({
        where: {
          status: status,
        },
        orderBy: [{ created_at: 'desc' }],
        skip: Number((page - 1) * size) || 0,
        take: size || 99,
      })
      total = (
        await this.prismaService.article.findMany({
          where: {
            status: status,
          },
        })
      ).length
    } else {
      article = await this.prismaService.article.findMany({
        where: {
          title: { contains: title },
          status: status,
        },
        orderBy: [{ created_at: 'desc' }],
        skip: Number((page - 1) * size) || 0,
        take: size || 99,
      })
      total = (
        await this.prismaService.article.findMany({
          where: {
            title: { contains: title },
            status: status,
          },
        })
      ).length
    }
    if (!article) {
      throw new BadRequestException('查询数据为空，请检查查询内容')
    }
    console.log('article', article)
    return {
      message: '获取成功',
      data: article,
      total,
    }
  }

  async findManyByTagName(name: string) {
    const data = await this.prismaService.article.findMany({
      where: {
        tags: {
          contains: name,
        },
      },
    })
    return {
      message: '获取成功',
      data,
      total: data.length,
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prismaService.article.update({
      where: { id },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        contentOutline: updateArticleDto.contentOutline,
        firstPicture: updateArticleDto.firstPicture,
        status: updateArticleDto.status,
        isTop: updateArticleDto.isTop,
        tags: updateArticleDto.tags,
        category: updateArticleDto.category,
        htmlContent: updateArticleDto.htmlContent,
      },
    })
    return {
      message: `'${article.title}'文章更新成功`,
      article,
    }
  }

  async remove(id: number) {
    const isExistArticle = await this.prismaService.article.findUnique({
      where: { id },
    })
    if (!isExistArticle) {
      throw new BadRequestException('文章不存在，删除失败')
    }
    const deleteResult = await this.prismaService.article.delete({
      where: { id },
    })
    return {
      message: `'${deleteResult.title}'文章删除成功`,
      deleteResult,
    }
  }
}

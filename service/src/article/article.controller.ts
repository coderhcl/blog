/*
 * @Author: hcl
 * @Date: 2022-08-20 23:19:23
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-20 23:38:14
 * @FilePath: \HCLBlog\service\src\article\article.controller.ts
 * @Description:
 *
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  // @Post('all')
  // findAll(@Body('page') page: number, @Body('size') size: number) {
  //   return this.articleService.findAll(page, size)
  // }

  @Post('find')
  findAndSelect(
    @Body('title') title: string,
    @Body('status') status: string,
    @Body('page') page: number,
    @Body('size') size: number,
  ) {
    return this.articleService.findAllAndSelectByTitle(title, status, page, size)
  }
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }

  @Get('findbyid/:id')
  findById(@Param('id') id: string) {
    return this.articleService.findOneById(+id)
  }

  @Get('findbyTag/:name')
  findByTagName(@Param('name') name: string) {
    return this.articleService.findManyByTagName(name)
  }
}

/*
 * @Author: hcl
 * @Date: 2022-08-21 12:57:48
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-21 15:44:22
 * @FilePath: \HCLBlog\service\src\link\link.controller.ts
 * @Description:
 *
 */
import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { LinkService } from './link.service'
import { CreateLinkDto } from './dto/create-link.dto'
import { UpdateLinkDto } from './dto/update-link.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Auth()
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto)
  }

  @Post('find')
  findAllAndSelect(@Body('name') name?: string, @Body('page') page?: number, @Body('size') size?: number) {
    return this.linkService.findAllAndSelect(name, page, size)
  }
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(+id, updateLinkDto)
  }
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id)
  }
}

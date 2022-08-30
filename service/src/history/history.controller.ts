/*
 * @Author: hcl
 * @Date: 2022-08-21 12:08:11
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-21 12:18:05
 * @FilePath: \HCLBlog\service\src\history\history.controller.ts
 * @Description:
 *
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { HistoryService } from './history.service'
import { CreateHistoryDto } from './dto/create-history.dto'
import { UpdateHistoryDto } from './dto/update-history.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @Auth()
  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto)
  }

  @Get()
  findAll() {
    return this.historyService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id)
  }
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(+id, updateHistoryDto)
  }
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id)
  }
}

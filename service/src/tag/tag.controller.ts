import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Auth()
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto)
  }

  @Get()
  findAll() {
    return this.tagService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id)
  }
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto)
  }
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id)
  }
}

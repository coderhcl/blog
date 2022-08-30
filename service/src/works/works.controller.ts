import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { WorksService } from './works.service'
import { CreateWorkDto } from './dto/create-work.dto'
import { UpdateWorkDto } from './dto/update-work.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}
  @Auth()
  @Post()
  create(@Body() createWorkDto: CreateWorkDto) {
    return this.worksService.create(createWorkDto)
  }

  @Get()
  findAll() {
    return this.worksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worksService.findOne(+id)
  }
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto) {
    return this.worksService.update(+id, updateWorkDto)
  }
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worksService.remove(+id)
  }
}

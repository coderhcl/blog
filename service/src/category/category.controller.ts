import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Auth()
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id)
  }
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto)
  }
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id)
  }
}

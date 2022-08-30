import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Auth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}

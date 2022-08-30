import { IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(5, 20, { message: '用户名长度为6-20个字符' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(5, 20, { message: '密码长度为5-20个字符' })
  password: string

  // @IsNotEmpty()
  // @MaxLength(20)
  // @MinLength(5)
  // confirmPwd: string
}

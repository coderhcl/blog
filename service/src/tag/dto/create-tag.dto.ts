import { IsNotEmpty } from 'class-validator'

export class CreateTagDto {
  @IsNotEmpty({ message: '标签不能为空' })
  tagname: string
}

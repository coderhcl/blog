import { IsNotEmpty, Length } from 'class-validator'

export class CreateArticleDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(2, 100, { message: '标题长度为2-50个字符' })
  title: string
  @IsNotEmpty({ message: '内容不能为空' })
  content: string
  @IsNotEmpty({ message: '内容概要不能为空' })
  contentOutline: string

  firstPicture: string

  @IsNotEmpty({ message: '需要转html操作' })
  htmlContent: string

  category: string

  tags: string

  status?: string

  isTop?: boolean
}

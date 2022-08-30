import { IsNotEmpty } from 'class-validator'

export class CreateWorkDto {
  // imgUrl    String
  // name      String
  // desc      String
  // sourceUrl String? //源码链接
  @IsNotEmpty({ message: '图片链接不能为空' })
  imgUrl: string
  @IsNotEmpty({ message: '作品名称不能为空' })
  name: string
  @IsNotEmpty({ message: '作品描述不能为空' })
  desc: string
  @IsNotEmpty({ message: '作品链接不能为空' })
  sourceUrl: string
}

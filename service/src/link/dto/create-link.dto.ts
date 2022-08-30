/*
 * @Author: hcl
 * @Date: 2022-08-21 12:57:48
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-21 13:03:33
 * @FilePath: \HCLBlog\service\src\link\dto\create-link.dto.ts
 * @Description:
 *
 */
import { IsNotEmpty } from 'class-validator'

export class CreateLinkDto {
  @IsNotEmpty({ message: '友链名称不能为空' })
  name: string
  @IsNotEmpty({ message: '网站logo不能为空' })
  avatar: string
  @IsNotEmpty({ message: '友链链接不能为空' })
  url: string

  outline: string

  isValid: boolean
}

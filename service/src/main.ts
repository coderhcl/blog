/*
 * @Author: hcl
 * @Date: 2022-08-19 16:05:20
 * @LastEditors: hcl
 * @LastEditTime: 2022-08-21 16:04:26
 * @FilePath: \HCLBlog\service\src\main.ts
 * @Description:
 *
 */
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { json, urlencoded } from 'express'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  // 文件上传大小
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  await app.listen(8008)
}
bootstrap()

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { CategoryModule } from './category/category.module'
import { TagModule } from './tag/tag.module'
import { ArticleModule } from './article/article.module'
import { HistoryModule } from './history/history.module'
import { LinkModule } from './link/link.module'

import { MulterModule } from '@nestjs/platform-express'
import { WorksModule } from './works/works.module'
const MAO = require('multer-aliyun-oss')
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局导入
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    TagModule,
    ArticleModule,
    HistoryModule,
    LinkModule,
    MulterModule.register({
      storage: MAO({
        config: {
          region: process.env.REGION,
          accessKeyId: process.env.ACCESS_KEY_ID,
          accessKeySecret: process.env.ACCESS_KEY_SECRET,
          bucket: process.env.BUCKET,
        },
      }),
    }),
    WorksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
